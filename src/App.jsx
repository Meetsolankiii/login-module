import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav style={{ background: "#0f172a", padding: "15px 30px", display: "flex", gap: "20px", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: "#ffffff", fontWeight: "700", fontSize: "1.2rem" }}>🛡️ Meet.Dev 2FA Module</div>
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: "500" }}>Home</Link>
            <Link to="/login" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: "500" }}>Login</Link>
            <Link to="/register" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: "500" }}>Register</Link>
          </div>
        </nav>

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Simple internal landing view component block
function HomeView() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#1e293b", fontSize: "2.5rem" }}>Welcome to the Secure Identity Gateway</h1>
      <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "600px", margin: "20px auto" }}>
        This isolated module demonstrates a robust 2FA authentication pattern. Click on the <strong>Login</strong> option above to request and verify a single-use passcode token delivered to your inbox.
      </p>
      <div style={{ marginTop: "30px" }}>
        <Link to="/login" style={{ background: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "600", marginRight: "10px" }}>Test 2FA Login</Link>
        <Link to="/register" style={{ background: "#16a34a", color: "#fff", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "600" }}>Create Test User</Link>
      </div>
    </div>
  );
}

export default App;