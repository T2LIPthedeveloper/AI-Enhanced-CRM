import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ChatSection = ({ currentUser, selectedMember }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, 'messages'),
          where('sender', 'in', [currentUser.uid, selectedMember.uid]),
          orderBy('timestamp', 'asc')
        );
        const messagesSnapshot = await getDocs(q);
        const messagesData = messagesSnapshot.docs.map(doc => doc.data());
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [currentUser, selectedMember]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{selectedMember.displayName}</Typography>
      </Grid>
      <Grid item xs={12}>
        {messages.map((message, index) => (
          <div key={index}>
            <Typography variant="body1">{message.message}</Typography>
            <Typography variant="caption">
              {new Date(message.timestamp?.seconds * 1000).toLocaleString()}
            </Typography>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChatSection;
