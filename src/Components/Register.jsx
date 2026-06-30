import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simple, solid check logic rule matrix for secure passwords
  const checks = {
    length: password.length >= 5,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password)
  };

  const isValid = Object.values(checks).every(Boolean);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    try {
      // In a full application, save this straight to your Firebase Firestore database!
      Swal.fire({
        title: 'Account Created!',
        text: 'User setup completed successfully. Moving to Sign-In page.',
        icon: 'success',
        confirmButtonColor: '#16a34a',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Registration processing failure.', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-panel" style={{ padding: "30px", maxWidth: "440px", margin: "50px auto", border: "1px solid #e9ecef", borderRadius: "8px", backgroundColor: "#ffffff", boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "20px", textAlign: "center", color: "#0f172a" }}>Create Your Account</h2>
      
      <form onSubmit={handleRegisterSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.875rem", fontWeight: "600", color: "#334155" }}>Username</label>
          <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #e9ecef" }} required />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.875rem", fontWeight: "600", color: "#334155" }}>Email Address</label>
          <input type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #e9ecef" }} required />
        </div>

        <div style={{ marginBottom: "15px", position: "relative" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.875rem", fontWeight: "600", color: "#334155" }}>Password</label>
          <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "10px 40px 10px 12px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #e9ecef" }} required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "35px", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }}>
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>

        {/* Dynamic visual indicator stack */}
        <div style={{ background: "#f8fafc", padding: "15px", borderRadius: "6px", border: "1px solid #e2e8f0", marginBottom: "20px", fontSize: "0.85rem" }}>
          <p style={{ margin: "0 0 8px 0", fontWeight: "700", color: "#b91c1c" }}>Password security guidelines:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: checks.length ? "#16a34a" : "#64748b" }}>{checks.length ? "✅" : "⚪"} Minimum 5 characters</span>
            <span style={{ color: checks.upper ? "#16a34a" : "#64748b" }}>{checks.upper ? "✅" : "⚪"} Contains Uppercase (A-Z)</span>
            <span style={{ color: checks.lower ? "#16a34a" : "#64748b" }}>{checks.lower ? "✅" : "⚪"} Contains Lowercase (a-z)</span>
            <span style={{ color: checks.number ? "#16a34a" : "#64748b" }}>{checks.number ? "✅" : "⚪"} Contains Number (0-9)</span>
          </div>
        </div>

        <button type="submit" disabled={loading || !isValid} style={{ width: "100%", padding: "12px", background: loading || !isValid ? "#cbd5e1" : "#16a34a", color: "#fff", border: "none", borderRadius: "4px", cursor: loading || !isValid ? "not-allowed" : "pointer", fontWeight: "600" }}>
          {loading ? "Creating Account..." : "Sign Up Securely"}
        </button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.875rem", color: "#475569" }}>
        Already have an account? <Link to="/login" style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>Login here</Link>
      </p>
    </div>
  );
}

export default Register;