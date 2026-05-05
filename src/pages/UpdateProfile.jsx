import React from 'react';
import { Camera, Image as ImageIcon, Upload, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './UpdateProfile.css';

const UpdateProfile = ({ onNavigate, searchQuery, onSearch }) => {
  return (
    <div className="app-container">
      <Header onNavigate={onNavigate} searchQuery={searchQuery} onSearch={onSearch} />
      
      <main className="update-profile-main">
        <div className="container">
          <div className="update-profile-card glass">
            
            <div className="update-header">
              <div>
                <h1 className="update-title">Update Profile</h1>
                <p className="update-subtitle">Edit your personal details and skills.</p>
              </div>
              <button 
                className="btn btn-outline cancel-btn" 
                onClick={() => onNavigate('profile')}
              >
                <X size={18} />
                Cancel
              </button>
            </div>

            <form className="update-form-web" onSubmit={(e) => { e.preventDefault(); onNavigate('profile'); }}>
              <div className="form-grid">
                <div className="form-left">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="Mukesh" className="form-input" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Age</label>
                      <input type="date" className="form-input" defaultValue="1985-06-15" />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input type="tel" defaultValue="91 123 456 789" className="form-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Complete Address</label>
                    <input type="text" defaultValue="Gurugram" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label>Where you can work</label>
                    <input type="text" defaultValue="Haryana, Delhi NCR" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label>Which machine you can operate?</label>
                    <input type="text" defaultValue="JCB, Road Roller" className="form-input" />
                  </div>
                </div>

                <div className="form-right">
                  <div className="upload-section">
                    <p className="upload-warning">
                      Update your profile image (Optional)
                    </p>

                    <div className="current-image-preview">
                       <div className="avatar-preview">M</div>
                    </div>

                    <div className="upload-box update-mode">
                      <Upload size={32} className="upload-icon" />
                      <p className="upload-text">Click to replace image</p>
                    </div>

                    <div className="upload-buttons">
                      <button type="button" className="btn btn-outline action-btn">
                        <ImageIcon size={20} />
                        <span>Choose File</span>
                      </button>
                      <button type="button" className="btn btn-outline action-btn">
                        <Camera size={20} />
                        <span>Use Camera</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary save-changes-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default UpdateProfile;
