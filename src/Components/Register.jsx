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
      Swal.fire({
        title: 'Account Created!',
        text: 'User setup completed successfully. Moving to Sign-In page.',
        icon: 'success',
        confirmButtonColor: '#198754',
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
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-4 px-3">
      <div className="card shadow-lg border-0 w-100" style={{ maxWidth: "450px", borderRadius: "1rem" }}>
        <div className="card-body p-4 p-sm-5">
          <div className="text-center mb-4">
            <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
              <i className="bi bi-person-plus-fill fs-2"></i>
            </div>
            <h4 className="fw-bold text-dark m-0">Create Account</h4>
            <p className="text-muted small mt-1">Sign up to get started</p>
          </div>

          <form onSubmit={handleRegisterSubmit} autoComplete="off">
            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted border-end-0">
                  <i className="bi bi-person"></i>
                </span>
                <input 
                  type="text" 
                  name="reg_username"
                  className="form-control bg-light border-start-0 py-2" 
                  placeholder="Enter username" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  autoComplete="off"
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted border-end-0">
                  <i className="bi bi-envelope"></i>
                </span>
                <input 
                  type="email" 
                  name="reg_email"
                  className="form-control bg-light border-start-0 py-2" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  autoComplete="off"
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted border-end-0">
                  <i className="bi bi-lock"></i>
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="reg_password"
                  className="form-control bg-light border-start-0 border-end-0 py-2" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  autoComplete="new-password"
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

            <div className="card bg-light border-0 mb-4 p-3 rounded-3">
              <span className="fw-semibold small text-muted mb-2 d-block">Password Requirements:</span>
              <div className="d-flex flex-column gap-1 small">
                <div className={`d-flex align-items-center ${checks.length ? "text-success fw-medium" : "text-muted"}`}>
                  <i className={`bi ${checks.length ? "bi-check-circle-fill me-2" : "bi-circle me-2"}`}></i>
                  Minimum 5 characters
                </div>
                <div className={`d-flex align-items-center ${checks.upper ? "text-success fw-medium" : "text-muted"}`}>
                  <i className={`bi ${checks.upper ? "bi-check-circle-fill me-2" : "bi-circle me-2"}`}></i>
                  At least 1 uppercase letter (A-Z)
                </div>
                <div className={`d-flex align-items-center ${checks.lower ? "text-success fw-medium" : "text-muted"}`}>
                  <i className={`bi ${checks.lower ? "bi-check-circle-fill me-2" : "bi-circle me-2"}`}></i>
                  At least 1 lowercase letter (a-z)
                </div>
                <div className={`d-flex align-items-center ${checks.number ? "text-success fw-medium" : "text-muted"}`}>
                  <i className={`bi ${checks.number ? "bi-check-circle-fill me-2" : "bi-circle me-2"}`}></i>
                  At least 1 number (0-9)
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-success w-100 py-2 fw-semibold shadow-sm"
              disabled={loading || !isValid}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </>
              ) : "Sign Up Securely"}
            </button>
          </form>

          <p className="text-center small text-muted mt-4 mb-0">
            Already have an account? <Link to="/login" className="text-decoration-none fw-semibold text-primary">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;