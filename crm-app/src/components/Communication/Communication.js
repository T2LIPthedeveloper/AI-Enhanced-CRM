import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ConversationForm from './ConversationForm';
import ChatSection from './ChatSection';

const Communication = ({ currentUser }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const teamMembersCollection = await getDocs(collection(db, 'users'));
      setTeamMembers(teamMembersCollection.docs.map(doc => doc.data()));
    };
    fetchTeamMembers();
  }, []);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Typography variant="h6">Team Members</Typography>
        <List>
          {teamMembers.map((member, index) => (
            <ListItem key={index} button onClick={() => handleMemberClick(member)}>
              <ListItemText primary={member.displayName} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">Chat Section</Typography>
        {selectedMember && <ChatSection currentUser={currentUser} selectedMember={selectedMember} />}
        {!selectedMember && <Typography>Select a team member to start chatting</Typography>}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Add New Conversation</Typography>
        <ConversationForm currentUser={currentUser} />
      </Grid>
    </Grid>
  );
};

export default Communication;
