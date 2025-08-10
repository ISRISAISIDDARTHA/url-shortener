import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    originalUrl: '',
    title: '',
    description: ''
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('/api/urls/user');
      setUrls(response.data);
    } catch (error) {
      setError('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/urls', formData);
      setUrls([response.data, ...urls]);
      setFormData({ originalUrl: '', title: '', description: '' });
      setSuccess('URL shortened successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create short URL');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await axios.delete(`/api/urls/${id}`);
        setUrls(urls.filter(url => url._id !== id && url.id !== id));
        setSuccess('URL deleted successfully!');
      } catch (error) {
        setError('Failed to delete URL');
      }
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🔗 URL Shortener
          </Link>
          <ul className="navbar-nav">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={logout} className="btn btn-secondary">Logout</button></li>
          </ul>
        </div>
      </nav>

      <div className="main-content">
        <div className="container">
          <div className="card">
            <h2>Welcome, {user?.name}!</h2>
            <p>Create and manage your shortened URLs</p>
          </div>

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

          <div className="card">
            <h3>Create New Short URL</h3>
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
                disabled={creating}
              >
                {creating ? 'Creating...' : 'Create Short URL'}
              </button>
            </form>
          </div>

          <div className="card">
            <h3>Your URLs</h3>
            {loading ? (
              <p>Loading...</p>
            ) : urls.length === 0 ? (
              <p>No URLs created yet. Create your first short URL above!</p>
            ) : (
              urls.map((url) => (
                <div key={url._id || url.id} className="url-card">
                  <h4>{url.title || 'Untitled'}</h4>
                  <p><strong>Original:</strong> {url.originalUrl}</p>
                  <p><strong>Short:</strong> {url.shortUrl}</p>
                  {url.description && (
                    <p><strong>Description:</strong> {url.description}</p>
                  )}
                  
                  <div className="url-stats">
                    <span>📊 {url.clicks} clicks</span>
                    <span>📅 {new Date(url.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="url-actions">
                    <button
                      onClick={() => copyToClipboard(url.shortUrl)}
                      className="copy-button"
                    >
                      📋 Copy
                    </button>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      🔗 Visit
                    </a>
                    <button
                      onClick={() => handleDelete(url._id || url.id)}
                      className="btn btn-danger"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 