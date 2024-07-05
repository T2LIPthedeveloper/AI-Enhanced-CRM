import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ConversationForm = ({ currentUser }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, 'messages'), {
        sender: currentUser.uid,
        message: message.trim(),
        timestamp: serverTimestamp(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConversationForm;
