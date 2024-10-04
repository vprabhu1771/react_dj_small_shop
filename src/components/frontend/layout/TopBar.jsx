import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/cart">Cart</Link>
      <button>Logout</button>
    </nav>
  );
};

export default TopBar;