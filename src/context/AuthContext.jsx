import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null); // User state

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Fetch user information using the token
      const fetchUser = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const userInfo = await response.json();
            setUser(userInfo);        
          } else {
            console.error('Failed to fetch user information');
          }
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      };
      fetchUser();
    }
  }, []);

  const login = async (token) => {
    try {
      // Save the token to localStorage
      localStorage.setItem('token', token);
  
      // Fetch user information from the server using the token
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // If the response is OK, set the user info in the state
      if (response.ok) {
        const userInfo = await response.json();
        setUser(userInfo);        
      } else {
        console.error('Failed to fetch user information');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
    try {
      // Send request to backend to revoke the token
      const token = localStorage.getItem('token');
      
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Remove the token from localStorage and clear user state
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);