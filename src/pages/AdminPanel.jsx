import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import './AdminPanel.css';
import { LogIn, Save, Trash2, Plus, LogOut, Layout, Users, Briefcase, Edit, Image as ImageIcon } from 'lucide-react';

const AdminPanel = ({ onNavigate }) => {
  const { fetchContent } = useContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('content');
  const [isLoading, setIsLoading] = useState(false);

  // Data Lists
  const [contentList, setContentList] = useState([]);
  const [workerList, setWorkerList] = useState([]);
  const [jobList, setJobList] = useState([]);

  // Form States
  const [contentForm, setContentForm] = useState({ id: null, section: '', contentKey: '', contentValue: '', imageUrl: '' });
  const [jobForm, setJobForm] = useState({ id: null, title: '', description: '', company: '', location: '', salary: '', category: '', machineType: '' });

  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token]);

  const loadAllData = async () => {
    setIsLoading(true);
    await Promise.all([
      loadContent(),
      loadWorkers(),
      loadJobs()
    ]);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const loadContent = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/content/all');
      if (response.ok) {
        const data = await response.json();
        let flatList = [];
        Object.keys(data).forEach(section => {
          Object.keys(data[section]).forEach(key => {
            flatList.push({ 
              section, 
              contentKey: key, 
              contentValue: data[section][key].value, 
              imageUrl: data[section][key].imageUrl 
            });
          });
        });
        setContentList(flatList);
      }
    } catch (error) { console.error("Content load error", error); }
  };

  const loadWorkers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/workers/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) setWorkerList(await response.json());
    } catch (error) { console.error("Worker load error", error); }
  };

  const loadJobs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/jobs/all');
      if (response.ok) setJobList(await response.json());
    } catch (error) { console.error("Job load error", error); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
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
    } catch (error) { console.error("Login error", error); }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
  };

  // --- CRUD Handlers ---

  const handleSaveContent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(contentForm)
      });
      if (response.ok) {
        setContentForm({ id: null, section: '', contentKey: '', contentValue: '', imageUrl: '' });
        loadContent();
        fetchContent();
      }
    } catch (error) { console.error("Save content error", error); }
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    const method = jobForm.id ? 'PUT' : 'POST';
    const url = jobForm.id ? `http://localhost:8080/api/jobs/${jobForm.id}` : 'http://localhost:8080/api/jobs';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(jobForm)
      });
      if (response.ok) {
        setJobForm({ id: null, title: '', description: '', company: '', location: '', salary: '', category: '', machineType: '' });
        loadJobs();
      }
    } catch (error) { console.error("Save job error", error); }
  };

  const handleDeleteWorker = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/workers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) loadWorkers();
    } catch (error) { console.error("Delete worker error", error); }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) loadJobs();
    } catch (error) { console.error("Delete job error", error); }
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
        <div className="header-left">
          <h1>Bharat Rojjgar Admin</h1>
          <nav className="admin-tabs">
            <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}><Layout size={18}/> Content</button>
            <button className={activeTab === 'workers' ? 'active' : ''} onClick={() => setActiveTab('workers')}><Users size={18}/> Workers</button>
            <button className={activeTab === 'jobs' ? 'active' : ''} onClick={() => setActiveTab('jobs')}><Briefcase size={18}/> Jobs</button>
          </nav>
        </div>
        <div className="admin-actions">
           <button onClick={() => onNavigate('home')} className="admin-btn secondary">View Site</button>
           <button onClick={handleLogout} className="admin-btn danger"><LogOut size={16}/> Logout</button>
        </div>
      </div>

      <div className="admin-body">
        {activeTab === 'content' && (
          <div className="admin-content-grid">
            <div className="admin-form-card">
              <h2>{contentForm.id ? 'Edit' : 'Add'} Page Content</h2>
              <form onSubmit={handleSaveContent}>
                <div className="form-group">
                  <label>Section (e.g., 'hero', 'about')</label>
                  <input type="text" value={contentForm.section} onChange={e => setContentForm({...contentForm, section: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Key (e.g., 'headline', 'description')</label>
                  <input type="text" value={contentForm.contentKey} onChange={e => setContentForm({...contentForm, contentKey: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Value (Text/HTML)</label>
                  <textarea value={contentForm.contentValue} onChange={e => setContentForm({...contentForm, contentValue: e.target.value})} rows="4"></textarea>
                </div>
                <div className="form-group">
                  <label>Image URL (Optional)</label>
                  <input type="text" value={contentForm.imageUrl} onChange={e => setContentForm({...contentForm, imageUrl: e.target.value})} placeholder="https://example.com/img.jpg" />
                </div>
                <button type="submit" className="admin-btn primary"><Save size={16}/> Save Content</button>
              </form>
            </div>
            <div className="admin-table-card">
              <h2>Site Content List</h2>
              <table className="admin-table">
                <thead><tr><th>Section</th><th>Key</th><th>Value</th><th>Action</th></tr></thead>
                <tbody>
                  {contentList.map((item, idx) => (
                    <tr key={idx}>
                      <td><span className="badge">{item.section}</span></td>
                      <td><code>{item.contentKey}</code></td>
                      <td className="truncate">{item.contentValue}</td>
                      <td>
                        <button className="action-btn" onClick={() => setContentForm({...item})}><Edit size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="admin-table-card full-width">
            <h2>Registered Workers</h2>
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Category</th><th>City</th><th>Experience</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {workerList.map(worker => (
                  <tr key={worker.id}>
                    <td>{worker.user.name}</td>
                    <td>{worker.jobCategory}</td>
                    <td>{worker.city}</td>
                    <td>{worker.experience}</td>
                    <td><span className={`status-dot ${worker.isAvailable ? 'available' : 'busy'}`}></span></td>
                    <td>
                      <button className="action-btn danger" onClick={() => handleDeleteWorker(worker.id)}><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="admin-content-grid">
             <div className="admin-form-card">
              <h2>{jobForm.id ? 'Edit' : 'Post'} New Job</h2>
              <form onSubmit={handleSaveJob}>
                <div className="form-group">
                  <label>Job Title</label>
                  <input type="text" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" value={jobForm.company} onChange={e => setJobForm({...jobForm, company: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Salary (e.g., ₹25k/month)</label>
                  <input type="text" value={jobForm.salary} onChange={e => setJobForm({...jobForm, salary: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" value={jobForm.category} onChange={e => setJobForm({...jobForm, category: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} rows="3"></textarea>
                </div>
                <button type="submit" className="admin-btn primary"><Save size={16}/> {jobForm.id ? 'Update' : 'Post'} Job</button>
              </form>
            </div>
            <div className="admin-table-card">
              <h2>Posted Jobs</h2>
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Company</th><th>Location</th><th>Action</th></tr></thead>
                <tbody>
                  {jobList.map(job => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.location}</td>
                      <td>
                        <button className="action-btn" onClick={() => setJobForm(job)}><Edit size={14}/></button>
                        <button className="action-btn danger" onClick={() => handleDeleteJob(job.id)}><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

