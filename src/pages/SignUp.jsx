import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Upload, KeyRound, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './SignUp.css';

const SignUp = ({ onNavigate, searchQuery, onSearch }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    address: '',
    location: '',
    machine: ''
  });
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Simulate API call to send OTP
    console.log('Sending OTP to', formData.mobile);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate API call to verify OTP
    console.log('Verifying OTP', otp, 'for', formData.mobile);
    console.log('User registered!');
    alert('Registration Successful!');
  };

  return (
    <div className="app-container">
      <Header onNavigate={onNavigate} searchQuery={searchQuery} onSearch={onSearch} />
      
      <main className="signup-main">
        <div className="container">
          <div className="signup-card glass">
            <div className="signup-header">
              <h1 className="signup-title">Sign Up to Bharat Rojjgar</h1>
              <p className="signup-subtitle">
                {step === 1 ? 'Create your account to connect and find the right talent.' : 'We sent a 6-digit code to your mobile number.'}
              </p>
            </div>

            {step === 1 ? (
              <form className="signup-form-web" onSubmit={handleSendOtp}>
                <div className="form-grid">
                  <div className="form-left">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="form-input" required />
                    </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Mobile</label>
                          <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile Number" className="form-input" required />
                        </div>
                      </div>

                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete Address" className="form-input" />
                    </div>

                    <div className="form-group">
                      <label>Where you can work</label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="State / District" className="form-input" />
                    </div>

                    <div className="form-group">
                      <label>Which machine you can operate?</label>
                      <input type="text" name="machine" value={formData.machine} onChange={handleInputChange} placeholder="E.g., JCB, Electrician, General Labour" className="form-input" />
                    </div>
                  </div>

                  <div className="form-right">
                    <div className="upload-section">
                      <p className="upload-warning">
                        Uploading your profile image is mandatory.
                      </p>

                      <div className="upload-box">
                        <Upload size={48} className="upload-icon" />
                        <p className="upload-text">Click to upload image</p>
                        <p className="upload-subtext">Max size: 10 MB (PNG, JPG)</p>
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
                  <button type="submit" className="btn btn-primary submit-btn-web">
                    <span>Send OTP</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            ) : (
              <form className="otp-form" onSubmit={handleVerifyOtp}>
                <div className="otp-container">
                  <div className="otp-icon-wrapper">
                    <KeyRound size={48} className="otp-icon" />
                  </div>
                  <h3 className="otp-title">Enter Verification Code</h3>
                  <p className="otp-message">Sent to +91 {formData.mobile}</p>
                  
                  <div className="form-group otp-input-group">
                    <input 
                      type="text" 
                      maxLength="6" 
                      className="form-input otp-input" 
                      placeholder="• • • • • •" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                      required
                    />
                  </div>
                  
                  <div className="otp-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Verify & Register
                    </button>
                  </div>
                  
                  <p className="resend-text">
                    Didn't receive code? <button type="button" className="text-btn" onClick={handleSendOtp}>Resend</button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SignUp;
