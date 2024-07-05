import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const Home = () => {
  // Replace with actual summary statistics and quick links as needed
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6">Summary Statistics</Typography>
          <Typography variant="body1">Total Leads: 50</Typography>
          <Typography variant="body1">Total Conversations: 20</Typography>
          <Typography variant="body1">Total Posts: 30</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6">Quick Links</Typography>
          <ul>
            <li>View Leads</li>
            <li>Discuss with Team</li>
            <li>View Forum</li>
          </ul>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
