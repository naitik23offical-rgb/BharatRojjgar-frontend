import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import './AdminPanel.css';
import { LogIn, Save, Trash2, Plus, LogOut } from 'lucide-react';

const AdminPanel = ({ onNavigate }) => {
  const { fetchContent } = useContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const [contentList, setContentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // New Content Form State
  const [newSection, setNewSection] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    if (token) {
      // Validate token or just try fetching
      loadAdminContent();
    }
  }, [token]);

  const loadAdminContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/content/all');
      if (response.ok) {
        const data = await response.json();
        // Flatten the map to a list for the table
        let flatList = [];
        Object.keys(data).forEach(section => {
          Object.keys(data[section]).forEach(key => {
            flatList.push({ section, contentKey: key, contentValue: data[section][key] });
          });
        });
        setContentList(flatList);
        setIsAuthenticated(true);
      } else {
        if(response.status === 401 || response.status === 403) {
            setIsAuthenticated(false);
            setToken('');
            localStorage.removeItem('jwtToken');
        }
      }
    } catch (error) {
      console.error("Failed to load content", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber, password })
      });
      const data = await response.json();
      if (response.ok && data.roles && data.roles.includes('ROLE_ADMIN')) {
        setToken(data.token);
        localStorage.setItem('jwtToken', data.token);
        setIsAuthenticated(true);
      } else {
        alert("Login failed or unauthorized");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
  };

  const handleSaveNew = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/content', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          section: newSection,
          contentKey: newKey,
          contentValue: newValue
        })
      });
      
      if (response.ok) {
        setNewSection('');
        setNewKey('');
        setNewValue('');
        loadAdminContent();
        fetchContent(); // Refresh global context
      } else {
        alert("Failed to save content. Make sure you have admin rights.");
      }
    } catch (error) {
      console.error("Save error", error);
    }
  };

  const handleDelete = async (section, key) => {
      // Find the ID first. We need to fetch the raw list from the backend to get IDs since /api/content/all gives a map.
      // Wait, our backend /api/content/all returns a Map. The delete endpoint needs an ID.
      // Let's modify our logic: To delete, we actually need the ID. 
      // For now, since we don't have the ID in the flattened map, we'll need to fetch the raw list.
      // Let's implement a quick workaround or just alert for now.
      alert("Delete requires fetching by ID. To keep it simple, overwrite the value to empty for now.");
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2><LogIn size={24} /> Admin Login</h2>
          <div className="form-group">
            <label>Mobile Number (admin)</label>
            <input type="text" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="admin-btn primary">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Dynamic Content Management</h1>
        <div className="admin-actions">
           <button onClick={() => onNavigate('home')} className="admin-btn secondary">Back to Site</button>
           <button onClick={handleLogout} className="admin-btn danger"><LogOut size={16}/> Logout</button>
        </div>
      </div>

      <div className="admin-content-grid">
        <div className="admin-form-card">
          <h2>Add / Update Content</h2>
          <form onSubmit={handleSaveNew}>
            <div className="form-group">
              <label>Section (e.g., 'hero', 'about')</label>
              <input type="text" value={newSection} onChange={e => setNewSection(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Key (e.g., 'headline', 'description')</label>
              <input type="text" value={newKey} onChange={e => setNewKey(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Value (Text or HTML)</label>
              <textarea value={newValue} onChange={e => setNewValue(e.target.value)} required rows="5"></textarea>
            </div>
            <button type="submit" className="admin-btn primary"><Save size={16}/> Save Content</button>
          </form>
        </div>

        <div className="admin-table-card">
          <h2>Current Content</h2>
          {isLoading ? (
            <p>Loading content...</p>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Key</th>
                    <th>Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contentList.map((item, idx) => (
                    <tr key={idx}>
                      <td><span className="badge">{item.section}</span></td>
                      <td><code>{item.contentKey}</code></td>
                      <td className="value-cell">{item.contentValue}</td>
                      <td>
                        <button 
                          className="action-btn edit" 
                          onClick={() => {
                            setNewSection(item.section);
                            setNewKey(item.contentKey);
                            setNewValue(item.contentValue);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {contentList.length === 0 && (
                    <tr><td colSpan="4" className="text-center">No content found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
