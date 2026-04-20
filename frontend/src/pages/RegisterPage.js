import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../utils/api';
import './AuthPages.css';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = await registerUser({ name: form.name, email: form.email, password: form.password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch {
      // Demo: auto-login
      login({ name: form.name, email: form.email }, 'demo-token-' + Date.now());
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo">amazon<span>clone</span></div>
        <h1 className="auth-title">Create account</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          {[
            { label: 'Your name', key: 'name', type: 'text', placeholder: 'First and last name' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'email@example.com' },
            { label: 'Password', key: 'password', type: 'password', placeholder: 'At least 6 characters' },
            { label: 'Re-enter password', key: 'confirm', type: 'password', placeholder: 'Confirm password' },
          ].map(f => (
            <div className="form-group" key={f.key}>
              <label>{f.label}</label>
              <input type={f.type} required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} />
            </div>
          ))}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create your Amazon Clone account'}
          </button>
        </form>
        <p className="auth-terms">By creating an account, you agree to Amazon Clone's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.</p>
        <div className="auth-divider"><span>Already have an account?</span></div>
        <Link to="/login" className="auth-create-btn">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
