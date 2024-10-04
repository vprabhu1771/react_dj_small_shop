import { useState } from 'react';
import { apiRequest } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {

  const { login } = useAuth();
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');
  const [deviceName, setdeviceName] = useState('Web');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email, 
            password,
            device_name: deviceName }),
    });
    const token = await response.text();
    console.log(token);
    
    if (token) {
        await  login(token);     
      // Navigate to the home route after successful login
      navigate('/'); // Redirects to the home page 
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;