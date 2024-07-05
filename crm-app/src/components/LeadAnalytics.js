// LeadAnalytics.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase_config';

const LeadAnalytics = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      const querySnapshot = await getDocs(collection(db, 'leads'));
      const leadsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTotalLeads(leadsData.length);
      setPendingTasks(leadsData.reduce((acc, lead) => acc + (lead.tasks ? lead.tasks.length : 0), 0));
    };
    fetchLeads();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="my-4">Lead Analytics</h2>
      <div className="card">
        <div className="card-body">
          <p className="lead">Total Leads: {totalLeads}</p>
          <p className="lead">Pending Tasks: {pendingTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default LeadAnalytics;
