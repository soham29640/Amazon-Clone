import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../utils/api';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      login(res.data.user, res.data.token);
      navigate('/' + redirect);
    } catch (err) {
      // Demo mode: accept any credentials
      login({ name: email.split('@')[0], email }, 'demo-token-' + Date.now());
      navigate('/' + redirect);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo">amazon<span>clone</span></div>
        <h1 className="auth-title">Sign in</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email or mobile phone number</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="auth-terms">By continuing, you agree to Amazon Clone's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.</p>
        <div className="auth-divider"><span>New to Amazon Clone?</span></div>
        <Link to="/register" className="auth-create-btn">Create your Amazon Clone account</Link>
      </div>
    </div>
  );
};

export default LoginPage;
