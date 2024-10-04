import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/frontend/layout/AppLayout';
import Home from './components/frontend/Home';

import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Cart from './components/frontend/Cart';

function App() {

  return (
    <>
      <Router>

        <AppLayout>

          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/login' element={<Login />} />
            
            <Route path='/register' element={<Register />} />

            <Route path='/cart' element={<Cart />} />

          </Routes>

        </AppLayout>

      </Router>
    </>
  )
}

export default App
