import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Friends from './pages/Friends';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/messages" element={<Messages />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
