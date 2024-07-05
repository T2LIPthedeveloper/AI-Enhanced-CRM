// SignUp.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase_config';
import { collection, doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName, // Ensure displayName is set correctly
        role: 'user'
      });
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Display Name</label>
          <input
            type="text"
            className="form-control"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
