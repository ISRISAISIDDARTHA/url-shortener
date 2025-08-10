import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

const LandingPage = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    originalUrl: '',
    title: '',
    description: ''
  });
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/urls/public', formData);
      setShortUrl(response.data.shortUrl);
      setSuccess('URL shortened successfully!');
      setFormData({ originalUrl: '', title: '', description: '' });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('URL copied to clipboard!');
    } catch (error) {
      setError('Failed to copy URL');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🔗 URL Shortener
          </Link>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={logout} className="btn btn-secondary">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup" className="btn btn-primary">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="main-content">
        <div className="container">
          <div className="hero">
            <h1>Shorten Your URLs</h1>
            <p>Create short, memorable links that are easy to share and track with our futuristic URL shortener</p>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
            )}
          </div>

          {/* Public URL Shortening Form */}
          <div className="card">
            <h2 className="text-center mb-4">Shorten URL Instantly</h2>
            <p className="text-center mb-4">No registration required - create short URLs immediately!</p>
            
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="originalUrl">Original URL *</label>
                <input
                  type="url"
                  id="originalUrl"
                  name="originalUrl"
                  className="form-control"
                  value={formData.originalUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/very-long-url"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title (Optional)</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My awesome link"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the link"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Short URL'}
              </button>
            </form>

            {shortUrl && (
              <div className="url-display">
                <h3>Your Shortened URL:</h3>
                <p><strong>Short URL:</strong> {shortUrl}</p>
                <div className="url-actions">
                  <button
                    onClick={() => copyToClipboard(shortUrl)}
                    className="copy-button"
                  >
                    📋 Copy URL
                  </button>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    🔗 Test Link
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="text-center mb-4">Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>🚀 Fast & Simple</h3>
                <p>Create short URLs instantly with our easy-to-use interface</p>
              </div>
              <div className="feature-item">
                <h3>📊 Track Clicks</h3>
                <p>Monitor how many times your links are clicked</p>
              </div>
              <div className="feature-item">
                <h3>🔒 Secure</h3>
                <p>Your data is protected with industry-standard security</p>
              </div>
              <div className="feature-item">
                <h3>📱 Mobile Friendly</h3>
                <p>Works perfectly on all devices and screen sizes</p>
              </div>
            </div>
          </div>

          {!user && (
            <div className="card">
              <h2 className="text-center mb-4">Want More Features?</h2>
              <p className="text-center mb-4">Sign up for a free account to:</p>
              <div className="features-grid">
                <div className="feature-item">
                  <h3>✅ Save & Manage</h3>
                  <p>Save and manage all your shortened URLs</p>
                </div>
                <div className="feature-item">
                  <h3>📈 Analytics</h3>
                  <p>Track detailed analytics for each link</p>
                </div>
                <div className="feature-item">
                  <h3>🎨 Custom Titles</h3>
                  <p>Create custom titles and descriptions</p>
                </div>
                <div className="feature-item">
                  <h3>🗑️ Full Control</h3>
                  <p>Delete or edit your URLs anytime</p>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link to="/signup" className="btn btn-primary">
                  Create Free Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 