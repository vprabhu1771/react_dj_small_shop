import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/frontend/layout/AppLayout';
import Home from './components/frontend/Home';

function App() {

  return (
    <>
      <Router>

        <AppLayout>

          <Routes>

            <Route path='/' element={<Home />} />
            
          </Routes>

        </AppLayout>

      </Router>
    </>
  )
}

export default App
