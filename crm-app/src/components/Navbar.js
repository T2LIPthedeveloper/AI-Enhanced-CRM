// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase_config';
import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
    const { currentUser } = useAuth();

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">CRM</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/leads">Leads</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/chat">Chat</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/analytics">Analytics</Link>
                    </li>
                    {currentUser?.email === 'admin@crm.com' && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {currentUser ? (
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-light" onClick={handleSignOut}>Sign Out</button>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">Sign In</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
