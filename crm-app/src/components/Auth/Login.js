import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig'; // Assuming you have auth imported from Firebase config

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;

    try {
      const authUser = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      const usersCollection = await getDocs(collection(db, 'users')); // Fetch users collection from Firestore

      let userExists = false;
      usersCollection.forEach(user => {
        const userData = user.data();
        if (userData.email === email.trim()) {
          userExists = true;
          console.log('Login successful');
          history.push('/'); // Redirect to home page after successful login
        }
      });

      if (!userExists) {
        console.error('User not found');
      }

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Login</Typography>
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
        <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
      </Grid>
    </Grid>
  );
};

export default Login;
