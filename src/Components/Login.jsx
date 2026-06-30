import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { request2FaToken, confirm2FaToken } from '../utils/api';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [is2FaStep, setIs2FaStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!is2FaStep) {
      // Step 1: Send login request and dispatch OTP to user's mail
      try {
        const res = await request2FaToken(email.trim());
        
        if (res.error) {
          Swal.fire({ title: 'Login Failed', text: res.error, icon: 'error', confirmButtonColor: '#2563eb' });
          return;
        }

        setIs2FaStep(true);
        Swal.fire({
          title: '2FA OTP Sent!',
          text: '🔒 A 6-digit security code has been sent to your email address.',
          icon: 'info',
          confirmButtonColor: '#2563eb'
        });
      } catch (err) {
        Swal.fire({ title: 'Connection Error', text: 'Backend server is not responding.', icon: 'error', confirmButtonColor: '#dc2626' });
      } finally {
        setLoading(false);
      }
    } else {
      // Step 2: Verify the 6-digit OTP code input
      try {
        const res = await confirm2FaToken(email.trim(), otp.trim());

        if (res.error) {
          Swal.fire({ title: 'Invalid Code', text: res.error, icon: 'error', confirmButtonColor: '#dc2626' });
          return;
        }

        Swal.fire({ title: 'Success!', text: 'Logged in successfully with 2FA!', icon: 'success', confirmButtonColor: '#16a34a' });
        navigate("/");
      } catch (err) {
        Swal.fire({ title: 'Verification Error', text: 'Failed to verify OTP.', icon: 'error', confirmButtonColor: '#dc2626' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-panel" style={{ padding: "30px", maxWidth: "400px", margin: "50px auto", border: "1px solid #e9ecef", borderRadius: "8px", background: "#ffffff", boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "20px", textAlign: "center", color: "#0f172a" }}>
        {is2FaStep ? "🔒 Enter 2FA OTP Code" : "Sign In to Your Account"}
      </h2>
      
      <form onSubmit={handleLoginSubmit}>
        {!is2FaStep ? (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.875rem", fontWeight: "600", color: "#334155" }}>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #e9ecef" }} 
                required 
              />
            </div>
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.875rem", fontWeight: "600", color: "#334155" }}>Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                style={{ width: "100%", padding: "10px 40px 10px 12px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #e9ecef" }} 
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "12px", top: "35px", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </>
        ) : (
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "10px", textAlign: "center" }}>Type the 6-digit code sent to your email:</p>
            <input 
              type="text" 
              placeholder="000000" 
              maxLength="6"
              value={otp} 
              onChange={e => setOtp(e.target.value)} 
              style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #e9ecef", textAlign: "center", fontSize: "18px", fontWeight: "700", letterSpacing: "4px" }} 
              required 
            />
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: "100%", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "600" }}
        >
          {loading ? "Processing..." : is2FaStep ? "Verify OTP Code" : "Get Verification Code"}
        </button>
      </form>

      {!is2FaStep && (
        <p style={{ marginTop: "24px", textAlign: "center", fontSize: "0.875rem", color: "#475569" }}>
          Don't have an account yet? <Link to="/register" style={{ color: "#16a34a", fontWeight: "600", textDecoration: "none" }}>Register Here</Link>
        </p>
      )}
    </div>
  );
}

export default Login;