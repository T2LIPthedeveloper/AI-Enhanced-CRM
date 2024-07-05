// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatComponent from './components/ChatComponent';
import LeadsComponent from './components/LeadsComponent';
import LeadAnalytics from './components/LeadAnalytics';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import SplashPage from './SplashPage';
import Navbar from './components/Navbar';
import Admin from './auth/Admin';
import { AuthProvider } from './auth/AuthProvider';
import PrivateRoute from './auth/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/leads"
              element={
                <PrivateRoute>
                  <LeadsComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <LeadAnalytics />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <ChatComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
