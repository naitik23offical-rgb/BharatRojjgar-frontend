import React, { useState } from 'react';
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

// Mock data for workers
const mockWorkers = [
  {
    id: 1,
    name: 'Rahul Singh',
    age: 32,
    role: 'JCB Operator',
    address: 'Gurugram, Haryana',
    bio: 'Expert JCB operator with 8 years of experience in urban construction and excavation. Safety certified.',
    locations: ['Gurugram', 'Delhi NCR', 'Faridabad'],
    machines: [{ name: 'JCB', icon: '🚜' }],
    rate: ['₹800/day', '₹22k/month'],
    experience: '8 Years',
    company: 'DLF Projects',
    coords: { lat: 28.4595, lon: 77.0266 }
  },
  {
    id: 2,
    name: 'Rajesh Sharma',
    age: 45,
    role: 'Crane Operator',
    address: 'Noida, UP',
    bio: 'Specialist in tower crane operations for high-rise commercial buildings.',
    locations: ['Noida', 'Greater Noida', 'Delhi'],
    machines: [{ name: 'Crane', icon: '🏗️' }],
    rate: ['₹1200/day', '₹35k/month'],
    experience: '15 Years',
    company: 'Supertech Limited',
    coords: { lat: 28.5355, lon: 77.3910 }
  },
  {
    id: 3,
    name: 'Amit Patel',
    age: 38,
    role: 'Heavy Machinery Expert',
    address: 'Ahmedabad, Gujarat',
    bio: 'Versatile operator capable of handling multiple heavy machines including JCBs and mobile cranes.',
    locations: ['Ahmedabad', 'Surat', 'Vadodara'],
    machines: [{ name: 'JCB', icon: '🚜' }, { name: 'Crane', icon: '🏗️' }],
    rate: ['₹1500/day', '₹40k/month'],
    experience: '12 Years',
    company: 'Adani Infra',
    coords: { lat: 23.0225, lon: 72.5714 }
  },
  {
    id: 4,
    name: 'Sunil Yadav',
    age: 29,
    role: 'Crane & Forklift Operator',
    address: 'Pune, Maharashtra',
    bio: 'Experienced in industrial logistics, warehouse lifting, and dockyard crane operations.',
    locations: ['Pune', 'Mumbai', 'Navi Mumbai'],
    machines: [{ name: 'Crane', icon: '🏗️' }, { name: 'Forklift', icon: '🛻' }],
    rate: ['₹900/day', '₹25k/month'],
    experience: '6 Years',
    company: 'Tata Motors Plant',
    coords: { lat: 18.5204, lon: 73.8567 }
  },
  {
    id: 5,
    name: 'Ramesh Kumar',
    age: 50,
    role: 'Road Construction Operator',
    address: 'Jaipur, Rajasthan',
    bio: 'Veteran road construction operator specializing in road rollers and paving machines.',
    locations: ['Jaipur', 'Ajmer', 'Jodhpur'],
    machines: [{ name: 'Road Roller', icon: '🛣️' }, { name: 'JCB', icon: '🚜' }],
    rate: ['₹1000/day', '₹28k/month'],
    experience: '22 Years',
    company: 'NHAI Contractor',
    coords: { lat: 26.9124, lon: 75.7873 }
  },
  {
    id: 6,
    name: 'Vikram Verma',
    age: 35,
    role: 'Crane Operator',
    address: 'Bengaluru, Karnataka',
    bio: 'Precision lifting expert. Has worked on metro rail construction projects across South India.',
    locations: ['Bengaluru', 'Mysuru', 'Chennai'],
    machines: [{ name: 'Crane', icon: '🏗️' }],
    rate: ['₹1300/day', '₹32k/month'],
    experience: '10 Years',
    company: 'BMRCL Projects',
    coords: { lat: 12.9716, lon: 77.5946 }
  },
  {
    id: 7,
    name: 'Deepak Gupta',
    age: 28,
    role: 'Excavator & JCB Operator',
    address: 'Lucknow, UP',
    bio: 'Young and energetic operator skilled in deep excavation and foundation laying.',
    locations: ['Lucknow', 'Kanpur', 'Varanasi'],
    machines: [{ name: 'JCB', icon: '🚜' }, { name: 'Excavator', icon: '🏗️' }],
    rate: ['₹850/day', '₹24k/month'],
    experience: '5 Years',
    company: 'L&T Construction',
    coords: { lat: 26.8467, lon: 80.9462 }
  },
  {
    id: 8,
    name: 'Arun Choudhary',
    age: 42,
    role: 'Master Operator',
    address: 'Hyderabad, Telangana',
    bio: 'Can operate any heavy machinery on site. Excellent safety record and site management skills.',
    locations: ['Hyderabad', 'Secunderabad', 'Warangal'],
    machines: [{ name: 'JCB', icon: '🚜' }, { name: 'Crane', icon: '🏗️' }, { name: 'Road Roller', icon: '🛣️' }],
    rate: ['₹1800/day', '₹45k/month'],
    experience: '18 Years',
    company: 'Megha Engineering',
    coords: { lat: 17.3850, lon: 78.4867 }
  }
];

const FindJobs = ({ onNavigate, searchQuery, onSearch, userLocation }) => {
  const [selectedWorker, setSelectedWorker] = useState(null);

  const openModal = (worker) => {
    setSelectedWorker(worker);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedWorker(null);
    document.body.style.overflow = 'auto';
  };

  const filteredWorkers = mockWorkers.filter((worker) => {
    const query = (searchQuery || '').toLowerCase();
    const matchName = worker.name.toLowerCase().includes(query);
    const matchRole = worker.role.toLowerCase().includes(query);
    const matchMachine = worker.machines.some(m => m.name.toLowerCase().includes(query));
    const passesSearch = matchName || matchRole || matchMachine;

    let passesLocation = true;
    if (userLocation && userLocation.lat && userLocation.lon) {
      const distance = getDistanceFromLatLonInKm(
        userLocation.lat, userLocation.lon,
        worker.coords.lat, worker.coords.lon
      );
      if (distance > 100) {
        passesLocation = false;
      }
    }

    return passesSearch && passesLocation;
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
                    <span className="avatar-initial">{worker.name.charAt(0)}</span>
                  </div>
                  <div className="worker-info">
                    <h3 className="worker-name">{worker.name}</h3>
                    <p className="worker-role">{worker.role}</p>
                  </div>
                </div>

                <div className="worker-card-right">
                  <div className="worker-machine-icons">
                    <div className="machine-icon-circle">🚜</div>
                    <div className="machine-icon-circle">🏗️</div>
                  </div>
                  <span className="address-value">{worker.address.split(',')[0]}</span>
                </div>

              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No workers found matching "{searchQuery}"</p>
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
              {/* Using a solid green gradient or placeholder image for banner */}
              <div className="banner-bg"></div>
              
              <div className="modal-avatar-wrapper">
                <div className="modal-avatar">
                  {selectedWorker.name.charAt(0)}
                </div>
                <div className="modal-social-actions">
                  <button className="social-btn"><Phone size={16} /></button>
                </div>
              </div>
            </div>

            <div className="modal-body">
              {/* Header Info */}
              <div className="modal-header-info">
                <h2 className="modal-name">{selectedWorker.name}</h2>
              </div>
              <div className="modal-location">
                <MapPin size={16} className="text-muted" />
                <span>{selectedWorker.address}</span>
              </div>

              {/* Locations Section (Similar to Skills in ref) */}
              <div className="modal-section">
                <h3 className="section-title">Preferred Locations</h3>
                <div className="badge-container">
                  {selectedWorker.locations.map((loc, idx) => (
                    <span key={idx} className={`badge badge-color-${(idx % 3) + 1}`}>{loc}</span>
                  ))}
                </div>
              </div>

              {/* Machines Section (Similar to Tools in ref) */}
              <div className="modal-section">
                <h3 className="section-title">Machines Operated</h3>
                <div className="badge-container">
                  {selectedWorker.machines.map((mach, idx) => (
                    <span key={idx} className="badge badge-tool">
                      {mach.icon} {mach.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="modal-footer">
              <button className="btn btn-outline footer-btn" onClick={closeModal}>Close</button>
              <button className="btn btn-primary footer-btn connect-btn">Connect <CheckCircle size={18}/></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindJobs;
