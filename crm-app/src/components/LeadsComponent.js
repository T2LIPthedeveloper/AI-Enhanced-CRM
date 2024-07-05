// LeadsComponent.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase_config';
import { Link } from 'react-router-dom';

const LeadsComponent = () => {
    const [leads, setLeads] = useState([]);
    const [editLead, setEditLead] = useState(null);
    const [newLead, setNewLead] = useState({ name: '', email: '' });
    const [newTask, setNewTask] = useState('');
    const [selectedLeadId, setSelectedLeadId] = useState(null);

    useEffect(() => {
        const fetchLeads = async () => {
            const querySnapshot = await getDocs(collection(db, 'leads'));
            setLeads(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), showDetails: false })));
        };
        fetchLeads();
    }, []);

    const handleEdit = (lead) => {
        setEditLead(lead);
    };

    const handleSave = async () => {
        const leadDoc = doc(db, 'leads', editLead.id);
        await updateDoc(leadDoc, { name: editLead.name, email: editLead.email });
        setEditLead(null);
        setLeads(leads.map(lead => (lead.id === editLead.id ? editLead : lead)));
    };

    const handleDelete = async (leadId) => {
        await deleteDoc(doc(db, 'leads', leadId));
        setLeads(leads.filter(lead => lead.id !== leadId));
    };

    const handleAdd = async () => {
        const docRef = await addDoc(collection(db, 'leads'), newLead);
        setLeads([...leads, { id: docRef.id, ...newLead }]);
        setNewLead({ name: '', email: '' });
    };

    const toggleDetails = (leadId) => {
        setLeads(leads.map(lead => ({
            ...lead,
            showDetails: lead.id === leadId ? !lead.showDetails : lead.showDetails
        })));
        setSelectedLeadId(leadId);
    };

    const handleAddTask = async (task) => {
        const leadToUpdate = leads.find(lead => lead.id === selectedLeadId);
        const updatedTasks = leadToUpdate.tasks ? [...leadToUpdate.tasks, task] : [task];
        const leadDoc = doc(db, 'leads', selectedLeadId);
        await updateDoc(leadDoc, { tasks: updatedTasks });
        setLeads(leads.map(lead => ({
            ...lead,
            tasks: lead.id === selectedLeadId ? updatedTasks : lead.tasks
        })));
    };

    const handleRemoveTask = async (task) => {
        const updatedTasks = leads.find(lead => lead.id === selectedLeadId).tasks.filter(t => t !== task);
        const leadDoc = doc(db, 'leads', selectedLeadId);
        await updateDoc(leadDoc, { tasks: updatedTasks });
        setLeads(leads.map(lead => ({
            ...lead,
            tasks: lead.id === selectedLeadId ? updatedTasks : lead.tasks
        })));
    };

    return (
        <div className="container mt-4">
            <h2>Leads</h2>
            <table className="table table-bordered mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map(lead => (
                        <React.Fragment key={lead.id}>
                            <tr style={{ cursor: 'pointer' }} onClick={() => toggleDetails(lead.id)}>
                                <td>
                                    {editLead?.id === lead.id ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editLead.name}
                                            onChange={(e) => setEditLead({ ...editLead, name: e.target.value })}
                                        />
                                    ) : (
                                        lead.name
                                    )}
                                </td>
                                <td>
                                    {editLead?.id === lead.id ? (
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={editLead.email}
                                            onChange={(e) => setEditLead({ ...editLead, email: e.target.value })}
                                        />
                                    ) : (
                                        lead.email
                                    )}
                                </td>
                                <td>
                                    {editLead?.id === lead.id ? (
                                        <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
                                    ) : (
                                        <>
                                            <button className="btn btn-warning mr-2" onClick={() => handleEdit(lead)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(lead.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                            {lead.showDetails && (
                                <tr>
                                    <td colSpan="3">
                                        <div className="mt-3">
                                            <h5>Todo List:</h5>
                                            <ul className="list-group">
                                                {lead.tasks && lead.tasks.map((task, index) => (
                                                    <li key={index} className="list-group-item">
                                                        {task} <button className="btn btn-sm btn-danger ml-2" onClick={() => handleRemoveTask(task)}>Remove</button>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="New Task"
                                                    value={newTask}
                                                    onChange={(e) => setNewTask(e.target.value)}
                                                />
                                                <button className="btn btn-success mt-2" onClick={() => handleAddTask(newTask)}>Add Task</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 mb-4">
                <h4>Add New Lead</h4>
                <div className="form-row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={newLead.name}
                            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={newLead.email}
                            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                        />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success" onClick={handleAdd}>Add Lead</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsComponent;
