import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="container text-center py-5">
      <h1 className="fw-bold display-5 mb-3">Welcome to the Secure Identity Gateway</h1>
      <p className="lead text-muted max-w-2xl mx-auto mb-4" style={{ maxWidth: "600px" }}>
        This isolated module demonstrates a robust 2FA authentication pattern. Click below to test the workflow.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <a href="/login" className="btn btn-primary btn-lg px-4 shadow-sm">Test 2FA Login</a>
        <a href="/register" className="btn btn-success btn-lg px-4 shadow-sm">Create Test User</a>
      </div>
    </div>
  );
}

export default App;