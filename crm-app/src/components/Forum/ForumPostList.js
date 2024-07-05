import React, { useState, useEffect } from 'react';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ForumPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'forum'), orderBy('timestamp', 'desc'));
        const postsSnapshot = await getDocs(q);
        const fetchedPosts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching forum posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Forum Posts</Typography>
        <List>
          {posts.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={post.title} secondary={post.content} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ForumPostList;
