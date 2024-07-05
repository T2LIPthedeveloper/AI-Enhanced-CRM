import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField, Grid } from '@mui/material';
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadContact, setNewLeadContact] = useState('');

  const fetchLeads = async () => {
    try {
      const leadsCollection = await getDocs(collection(db, 'leads'));
      setLeads(leadsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = async () => {
    if (!newLeadName.trim() || !newLeadContact.trim()) return;

    try {
      await addDoc(collection(db, 'leads'), {
        name: newLeadName.trim(),
        contact: newLeadContact.trim(),
      });
      setNewLeadName('');
      setNewLeadContact('');
      fetchLeads(); // Call the fetchLeads function here after adding a lead
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      await deleteDoc(doc(db, 'leads', id));
      fetchLeads(); // Call the fetchLeads function here after deleting a lead
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.contact}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteLead(lead.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={newLeadName}
            onChange={(e) => setNewLeadName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Contact"
            variant="outlined"
            value={newLeadContact}
            onChange={(e) => setNewLeadContact(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={handleAddLead}>Add Lead</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LeadsTable;
