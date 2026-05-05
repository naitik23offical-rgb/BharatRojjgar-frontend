import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Edit, Image as ImageIcon } from 'lucide-react';
import './UserProfile.css';

const UserProfile = ({ onNavigate, searchQuery, onSearch }) => {
  return (
    <div className="app-container">
      <Header onNavigate={onNavigate} searchQuery={searchQuery} onSearch={onSearch} />
      
      <main className="profile-main">
        <div className="container">
          <div className="profile-card glass">
            
            <div className="profile-header-actions">
              <h1 className="profile-title">User Profile</h1>
              <button 
                className="btn btn-outline edit-btn"
                onClick={() => onNavigate('edit-profile')}
              >
                <Edit size={18} />
                <span>Update Profile</span>
              </button>
            </div>

            <div className="profile-content">
              {/* Left Column: Photo */}
              <div className="profile-sidebar">
                <div className="profile-avatar-container">
                  {/* Using a placeholder since we don't have the exact image */}
                  <div className="profile-avatar-placeholder">
                    <span className="avatar-initial">M</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="profile-details">
                <h2 className="user-name">Mukesh</h2>
                
                <div className="user-info-grid">
                  <div className="info-item">
                    <span className="info-label">Age:</span>
                    <span className="info-value">41</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Address:</span>
                    <span className="info-value">Gurugram</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone No.:</span>
                    <span className="info-value">91 123 456 789</span>
                  </div>
                </div>

                <div className="role-badge">
                  JCB & Road Roller Worker
                </div>
              </div>
            </div>

            <hr className="profile-divider" />

            {/* Machines Section */}
            <div className="machines-section">
              <h3 className="section-subtitle">Machines Operated</h3>
              <div className="machine-photos-grid">
                <div className="machine-photo-box">
                  <ImageIcon size={32} />
                  <span>JCB Image</span>
                </div>
                <div className="machine-photo-box">
                  <ImageIcon size={32} />
                  <span>Excavator Image</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default UserProfile;
