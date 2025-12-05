import React from 'react';
import { useVideo } from '../context/VideoContext';
import './AvatarGenerator.css';

const AvatarGenerator = ({ onBack }) => {
  const { 
    heygenApiKey, 
    setHeygenApiKey, 
    avatarId, 
    setAvatarId, 
    generateAvatarVideo, 
    avatarProcessing, 
    error 
  } = useVideo();

  // 1. PROCESSING STATE (Shows for ~15 mins if needed)
  if (avatarProcessing) {
    return (
      <div className="avatar-container processing">
        <div className="spinner-large"></div>
        <h3>Generating Avatar Video...</h3>
        <p>This process relies on HeyGen AI and can take <strong>5 to 15 minutes</strong>.</p>
        <p className="sub-text">Please do not close this tab. The video will appear on the right once finished.</p>
      </div>
    );
  }

  // 2. INPUT FORM STATE
  return (
    <div className="avatar-container">
      <div className="avatar-header">
        <h3>AI Avatar Generation</h3>
        <p>Enter your HeyGen credentials to generate a talking avatar video matching your script.</p>
      </div>

      <div className="avatar-form">
        {error && <div className="error-banner">{error}</div>}

        <div className="form-group">
          <label>HeyGen API Key <span className="required">*</span></label>
          <input 
            type="password" 
            placeholder="Enter your API Key" 
            value={heygenApiKey}
            onChange={(e) => setHeygenApiKey(e.target.value)}
          />
          <small>You can find this in your HeyGen account settings.</small>
        </div>

        <div className="form-group">
          <label>Avatar ID <span className="required">*</span></label>
          <input 
            type="text" 
            placeholder="e.g., Angela-in-T-shirt-2022" 
            value={avatarId}
            onChange={(e) => setAvatarId(e.target.value)}
          />
          <small>The specific ID of the avatar you wish to use.</small>
        </div>

        <div className="button-group">
          <button className="btn-secondary" onClick={onBack}>
            ← Back to Script
          </button>
          
          <button 
            className="btn-primary" 
            onClick={generateAvatarVideo}
            disabled={!heygenApiKey || !avatarId}
          >
            Generate Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarGenerator;
