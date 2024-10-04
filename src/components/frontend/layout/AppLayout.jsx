import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
      const token = localStorage.getItem('token'); // Check if the token exists
      if (token) {
          setIsAuthenticated(true);
          // Fetch user details or decode token if needed
          setUser({ name: 'John Doe' }); // Replace with actual user data
      }
  }, []);

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