import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/Home';
import ForumPostList from './components/Forum/ForumPostList';
import ForumPostForm from './components/Forum/ForumPostForm';
import ChatSection from './components/Communication/ChatSection';
import ConversationForm from './components/Communication/ConversationForm';
import Communication from './components/Communication/Communication';
import LeadsTable from './components/Leads/LeadsTable';
import LeadForm from './components/Leads/LeadForm';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CRM App
            </Typography>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/forum" color="inherit">Forum</Button>
            <Button component={Link} to="/communication" color="inherit">Communication</Button>
            <Button component={Link} to="/leads" color="inherit">Leads</Button>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/register" color="inherit">Register</Button>
          </Toolbar>
        </AppBar>
        <Grid container justifyContent="center" mt={3}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forum" element={<ForumPostList />} />
            <Route path="/forum/new" element={<ForumPostForm />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/communication/chat" element={<ChatSection />} />
            <Route path="/communication/new" element={<ConversationForm />} />
            <Route path="/leads" element={<LeadsTable />} />
            <Route path="/leads/new" element={<LeadForm />} />
          </Routes>
        </Grid>
      </div>
    </Router>
  );
};

export default AppRoutes;
