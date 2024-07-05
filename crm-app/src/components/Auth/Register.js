import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig'; // Assuming you have auth imported from Firebase config

const Register = ({ history }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!displayName.trim() || !email.trim() || !password.trim()) return;

    try {
      const authUser = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      const userRef = await addDoc(collection(db, 'users'), {
        displayName: displayName.trim(),
        email: email.trim(),
        uid: authUser.user.uid, // Ensure to save the user's UID from authentication
      });
      console.log('User registered successfully:', userRef.id);
      history.push('/'); // Redirect to home page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Register</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Display Name"
          variant="outlined"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
      </Grid>
    </Grid>
  );
};

export default Register;
