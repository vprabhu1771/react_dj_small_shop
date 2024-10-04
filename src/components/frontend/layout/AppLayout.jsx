import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';

import { useAuth } from '../../../context/AuthContext'; // Import the useAuth hook

const AppLayout = ({ children }) => {

  // Get the user and authentication state from AuthContext
  const { user } = useAuth();
    
  // Local state for authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  // useEffect hook to update the authentication state when the user changes
  useEffect(() => {
    console.log("use effect working");
    console.log(!!user);
    
    // Check if user exists and update the isAuthenticated state
    setIsAuthenticated(!!user); // Convert user to boolean, true if exists, false otherwise
  }, [user]); // This hook will run whenever the `user` value changes

  return (
    <div>
      <TopBar isAuthenticated={isAuthenticated} user={user}/>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default AppLayout;