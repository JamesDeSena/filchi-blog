import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WithoutAuth from '../../auth/WithoutAuth';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        userName,
        passWord,
      });
      if (response.status === 200) {
        const { message, token } = response.data;
        localStorage.setItem('token', token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4">
        <div className="card-body">
          <h4 className="text-center mb-4">Admin Login</h4>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" id="username" className="form-control" value={userName} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" value={passWord} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithoutAuth(LoginPage);
