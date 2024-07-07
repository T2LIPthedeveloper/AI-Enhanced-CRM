// SplashPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import LeadAnalytics from './components/LeadAnalytics';

const SplashPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="card p-4 text-center shadow">
      <h1 className="my-4">Welcome to the CRM.</h1>
      {currentUser ? (
        <div>
          <Link to="/leads" className="btn btn-outline-primary mx-2">Leads</Link>
          <Link to="/chat" className="btn btn-outline-primary mx-2">Chat</Link>
          <LeadAnalytics />
        </div>
      ) : (
        <p><Link to="/signin">Sign in</Link> to access your account.</p>
      )}
    </div>
  );
};

export default SplashPage;
