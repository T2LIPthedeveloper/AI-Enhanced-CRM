import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LeadsTable from './Leads/LeadsTable';
import Communication from './Communication/Communication';
import ForumPostList from './Forum/ForumPostList';
import PrivateRoute from './Auth/PrivateRoute';

const Dashboard = () => {
  return (
    <Routes>
      <PrivateRoute path="/" element={<Home />} authenticated={true} />
      <PrivateRoute path="/leads" element={<LeadsTable />} authenticated={true} />
      <PrivateRoute path="/communication" element={<Communication />} authenticated={true} />
      <PrivateRoute path="/forum" element={<ForumPostList />} authenticated={true} />
    </Routes>
  );
};

export default Dashboard;
