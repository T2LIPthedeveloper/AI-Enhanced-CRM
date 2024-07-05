import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const LeadForm = ({ lead, onClose }) => {
  const [name, setName] = useState(lead ? lead.name : '');
  const [contact, setContact] = useState(lead ? lead.contact : '');

  const handleSaveLead = async () => {
    if (!name.trim() || !contact.trim()) return;

    try {
      if (lead) {
        const leadRef = doc(db, 'leads', lead.id);
        await updateDoc(leadRef, { name: name.trim(), contact: contact.trim() });
      } else {
        const newLeadRef = await addDoc(collection(db, 'leads'), {
          name: name.trim(),
          contact: contact.trim(),
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="Contact"
          variant="outlined"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={handleSaveLead}>Save</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" onClick={onClose}>Cancel</Button>
      </Grid>
    </Grid>
  );
};

export default LeadForm;
