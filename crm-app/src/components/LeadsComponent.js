import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase_config';
import 'bootstrap/dist/css/bootstrap.min.css';
import CSVHandler from './CSVHandler'; // Assuming CSVHandler is in the same directory

const LeadsComponent = () => {
    const [leads, setLeads] = useState([]);
    const [editLead, setEditLead] = useState(null);
    const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', zoom: '', teams: '' });
    const [newTask, setNewTask] = useState('');
    const [selectedLeadId, setSelectedLeadId] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
        await updateDoc(leadDoc, { name: editLead.name, email: editLead.email, phone: editLead.phone, zoom: editLead.zoom, teams: editLead.teams });
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
        setNewLead({ name: '', email: '', phone: '', zoom: '', teams: '' });
        setShowModal(false);
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

    const handleCSVUpload = (data) => {
        // Process the CSV data and add to leads
        const batch = data.map(entry => addDoc(collection(db, 'leads'), entry));
        Promise.all(batch)
            .then(() => {
                // Refresh leads list after adding from CSV
                return getDocs(collection(db, 'leads'));
            })
            .then(querySnapshot => {
                setLeads(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), showDetails: false })));
            })
            .catch(error => {
                console.error('Error uploading leads from CSV:', error);
            });
    };

    return (
        <div className="container mt-4 card p-4 shadow-lg">
            <h2>Leads</h2>
            <div className="d-flex mb-4">
                <button className="btn btn-primary mr-2 mt-1 mb-1" onClick={() => setShowModal(true)}>Add New Lead</button>
                <CSVHandler onUpload={handleCSVUpload} />
            </div>
            <table className="table table-bordered mt-4 shadow-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Zoom</th>
                        <th>Teams</th>
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
                                        <a href={`mailto:${lead.email}`}>{lead.email}</a>
                                    )}
                                </td>
                                <td>
                                    {editLead?.id === lead.id ? (
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={editLead.phone}
                                            onChange={(e) => setEditLead({ ...editLead, phone: e.target.value })}
                                        />
                                    ) : (
                                        <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                                    )}
                                </td>
                                <td>
                                    {editLead?.id === lead.id ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editLead.zoom}
                                            onChange={(e) => setEditLead({ ...editLead, zoom: e.target.value })}
                                        />
                                    ) : (
                                        <a href={`https://${lead.zoom}`}>{lead.zoom}</a>
                                    )}
                                </td>
                                <td>
                                    {editLead?.id === lead.id ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editLead.teams}
                                            onChange={(e) => setEditLead({ ...editLead, teams: e.target.value })}
                                        />
                                    ) : (
                                        <a href={`https://${lead.teams}`}>{lead.teams}</a>
                                    )}
                                </td>
                                <td>
                                    {editLead?.id === lead.id ? (
                                        <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
                                    ) : (
                                        <>
                                            <button className="btn btn-warning ms-2" onClick={() => handleEdit(lead)}>Edit</button>
                                            <button className="btn btn-outline-danger ms-2" onClick={() => handleDelete(lead.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                            {lead.showDetails && (
                                <tr>
                                    <td colSpan="6">
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

            {/* Modal for adding a new lead */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'rounded-block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content shadow-lg">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Lead</h5>
                        </div>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="col p-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={newLead.name}
                                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                    />
                                </div>
                                <div className="col p-1">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={newLead.email}
                                        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                    />
                                </div>
                                <div className="col p-1">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Phone"
                                        value={newLead.phone}
                                        onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                                    />
                                </div>
                                <div className="col p-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Zoom URL"
                                        value={newLead.zoom}
                                        onChange={(e) => setNewLead({ ...newLead, zoom: e.target.value })}
                                    />
                                </div>
                                <div className="col p-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Teams URL"
                                        value={newLead.teams}
                                        onChange={(e) => setNewLead({ ...newLead, teams: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>Add Lead</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsComponent;
