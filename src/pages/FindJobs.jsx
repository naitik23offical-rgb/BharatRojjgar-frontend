import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Pointer, MapPin, Phone, X, CheckCircle } from 'lucide-react';
import './FindJobs.css';

// Helper function for distance
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}



const FindJobs = ({ onNavigate, searchQuery, onSearch, userLocation }) => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWorkers();
  }, [userLocation]);

  const fetchWorkers = async () => {
    setIsLoading(true);
    try {
      let url = 'http://localhost:8080/api/workers/nearby?category=all&lat=0&lon=0';
      if (userLocation && userLocation.lat) {
        url = `http://localhost:8080/api/workers/nearby?category=all&lat=${userLocation.lat}&lon=${userLocation.lon}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        setWorkers(await response.json());
      }
    } catch (error) {
      console.error("Error fetching workers", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (worker) => {
    setSelectedWorker(worker);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedWorker(null);
    document.body.style.overflow = 'auto';
  };

  const filteredWorkers = workers.filter((worker) => {
    const query = (searchQuery || '').toLowerCase();
    const matchName = worker.user && worker.user.name ? worker.user.name.toLowerCase().includes(query) : false;
    const matchRole = worker.jobCategory ? worker.jobCategory.toLowerCase().includes(query) : false;
    return matchName || matchRole;
  });

  return (
    <div className="app-container find-jobs-page">
      <Header onNavigate={onNavigate} searchQuery={searchQuery} onSearch={onSearch} />
      
      <main className="find-jobs-main container">
        <div className="list-header">
          <h2>Available Workers</h2>
          <button 
            className="btn btn-primary click-here-btn"
            onClick={() => onNavigate('signup')}
          >
            Want to work? Register Here
            <Pointer size={16} className="pointer-icon" />
          </button>
        </div>

        <div className="workers-list-grid">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <div key={worker.id} className="worker-list-card" onClick={() => openModal(worker)}>
                
                <div className="worker-card-left">
                  <div className="worker-avatar">
                    <span className="avatar-initial">{worker.user.name.charAt(0)}</span>
                  </div>
                  <div className="worker-info">
                    <h3 className="worker-name">{worker.user.name}</h3>
                    <p className="worker-role">{worker.jobCategory}</p>
                  </div>
                </div>

                <div className="worker-card-right">
                  <div className="worker-machine-icons">
                    <div className="machine-icon-circle">🚜</div>
                    <div className="machine-icon-circle">🏗️</div>
                  </div>
                  <span className="address-value">{worker.city}</span>
                </div>

              </div>
            ))
          ) : (
            <div className="no-results">
              <p>{isLoading ? 'Finding workers...' : `No workers found matching "${searchQuery}"`}</p>
            </div>
          )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />

      {/* Worker Profile Modal */}
      {selectedWorker && (
        <div className="worker-modal-overlay animate-fade-in" onClick={closeModal}>
          <div className="worker-modal-card" onClick={(e) => e.stopPropagation()}>
            
            <button className="modal-close-icon" onClick={closeModal}>
              <X size={20} />
            </button>

            {/* Banner & Avatar section */}
            <div className="modal-banner">
              <div className="banner-bg"></div>
              
              <div className="modal-avatar-wrapper">
                <div className="modal-avatar">
                  {selectedWorker.user.name.charAt(0)}
                </div>
                <div className="modal-social-actions">
                  <button className="social-btn"><Phone size={16} /></button>
                </div>
              </div>
            </div>

            <div className="modal-body">
              {/* Header Info */}
              <div className="modal-header-info">
                <h2 className="modal-name">{selectedWorker.user.name}</h2>
              </div>
              <div className="modal-location">
                <MapPin size={16} className="text-muted" />
                <span>{selectedWorker.city}</span>
              </div>

              <div className="modal-section">
                <h3 className="section-title">Experience</h3>
                <div className="badge-container">
                  <span className="badge badge-color-1">{selectedWorker.experience}</span>
                </div>
              </div>

              <div className="modal-section">
                <h3 className="section-title">Machine Category</h3>
                <div className="badge-container">
                  <span className="badge badge-tool">
                    🚜 {selectedWorker.jobCategory}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="modal-footer">
              <button className="btn btn-outline footer-btn" onClick={closeModal}>Close</button>
              <button className="btn btn-primary footer-btn connect-btn" onClick={() => alert(`Connecting to ${selectedWorker.user.name}...`)}>Connect <CheckCircle size={18}/></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindJobs;
