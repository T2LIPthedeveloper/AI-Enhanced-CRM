import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ForumPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      await addDoc(collection(db, 'forum'), {
        title: title.trim(),
        content: content.trim(),
        timestamp: new Date(),
      });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddPost}>
          Add Post
        </Button>
      </Grid>
    </Grid>
  );
};

export default ForumPostForm;
