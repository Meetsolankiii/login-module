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
    if (e) e.preventDefault();
    setLoading(true);

    if (!is2FaStep) {
      // Step 1: Send login request and dispatch OTP to user's mail
      try {
        const res = await request2FaToken(email.trim());
        
        if (res.error) {
          Swal.fire({ title: 'Login Failed', text: res.error, icon: 'error', confirmButtonColor: '#0d6efd' });
          return;
        }

        setIs2FaStep(true);
        Swal.fire({
          title: '2FA OTP Sent!',
          text: '🔒 A 6-digit security code has been sent to your email address.',
          icon: 'info',
          confirmButtonColor: '#0d6efd'
        });
      } catch (err) {
        Swal.fire({ title: 'Connection Error', text: 'Backend server is not responding.', icon: 'error', confirmButtonColor: '#dc3545' });
      } finally {
        setLoading(false);
      }
    } else {
      // Step 2: Verify the 6-digit OTP code input
      try {
        const res = await confirm2FaToken(email.trim(), otp.trim());

        if (res.error) {
          Swal.fire({ title: 'Invalid Code', text: res.error, icon: 'error', confirmButtonColor: '#dc3545' });
          return;
        }

        Swal.fire({ title: 'Success!', text: 'Logged in successfully with 2FA!', icon: 'success', confirmButtonColor: '#198754' });
        navigate("/");
      } catch (err) {
        Swal.fire({ title: 'Verification Error', text: 'Failed to verify OTP.', icon: 'error', confirmButtonColor: '#dc3545' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-4 px-3">
      <div className="card shadow-lg border-0 w-100" style={{ maxWidth: "420px", borderRadius: "1rem" }}>
        <div className="card-body p-4 p-sm-5">
          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
              <i className={`bi ${is2FaStep ? "bi-shield-lock-fill" : "bi-person-fill"} fs-2`}></i>
            </div>
            <h4 className="fw-bold text-dark m-0">
              {is2FaStep ? "2FA Verification" : "Welcome Back"}
            </h4>
            <p className="text-muted small mt-1">
              {is2FaStep ? "Enter the OTP code sent to your email" : "Sign in to access your account"}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} autoComplete="off">
            {!is2FaStep ? (
              <>
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-secondary">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input 
                      type="email" 
                      name="login_email"
                      className="form-control bg-light border-start-0 py-2" 
                      placeholder="name@example.com" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      autoComplete="off"
                      required 
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold small text-secondary">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="login_password"
                      className="form-control bg-light border-start-0 border-end-0 py-2" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      autoComplete="current-password"
                      required 
                    />
                    <button
                      type="button"
                      className="btn btn-light border border-start-0 text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-4 text-center">
                <input 
                  type="text" 
                  name="otp_code"
                  className="form-control form-control-lg text-center fw-bold fs-3 tracking-widest bg-light" 
                  placeholder="000000" 
                  maxLength="6"
                  value={otp} 
                  onChange={e => setOtp(e.target.value)} 
                  autoComplete="off"
                  required 
                  autoFocus
                />
              </div>
            )}

            <button 
              type={is2FaStep ? "submit" : "button"} 
              onClick={!is2FaStep ? handleLoginSubmit : undefined}
              className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : is2FaStep ? "Verify OTP Code" : "Get Verification Code"}
            </button>
          </form>

          {!is2FaStep && (
            <p className="text-center small text-muted mt-4 mb-0">
              Don't have an account? <Link to="/register" className="text-decoration-none fw-semibold text-primary">Register Here</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;