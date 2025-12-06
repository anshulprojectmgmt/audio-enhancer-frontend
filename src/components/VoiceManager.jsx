import React, { useRef } from 'react';
import { useVideo } from '../context/VideoContext';
import { FiUpload, FiCheck, FiMic, FiUser } from 'react-icons/fi';
import './VoiceManager.css'; // We will create this next

const VoiceManager = () => {
  const fileInputRef = useRef(null);
  const { 
    voiceMode, 
    setVoiceMode, 
    uploadCustomVoice, 
    isUploadingVoice, 
    customVoiceFile 
  } = useVideo();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const success = await uploadCustomVoice(file);
      if (success) {
        setVoiceMode('custom');
      }
    }
  };

  return (
    <div className="voice-manager">
      <div className="voice-header">
        <h3>Voice Selection</h3>
        <p>Choose the voice for your video.</p>
      </div>

      <div className="voice-options">
        {/* OPTION 1: DEFAULT */}
        <div 
          className={`voice-card ${voiceMode === 'default' ? 'selected' : ''}`}
          onClick={() => setVoiceMode('default')}
        >
          <div className="voice-icon"><FiUser /></div>
          <div className="voice-info">
            <h4>Anshul (Default)</h4>
            <p>Standard voice profile</p>
          </div>
          <div className="radio-circle"></div>
        </div>

        {/* OPTION 2: CUSTOM */}
        <div 
          className={`voice-card ${voiceMode === 'custom' ? 'selected' : ''}`}
          onClick={() => setVoiceMode('custom')}
        >
          <div className="voice-icon"><FiMic /></div>
          <div className="voice-info">
            <h4>Custom Clone</h4>
            <p>Upload your own 10-20s sample</p>
          </div>
          <div className="radio-circle"></div>
        </div>
      </div>

      {/* UPLOAD AREA (Only shows if Custom is active) */}
      {voiceMode === 'custom' && (
        <div className="custom-upload-area">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".wav,.mp3,.m4a" 
            style={{ display: 'none' }} 
          />
          
          <div className="upload-box">
            {isUploadingVoice ? (
              <div className="upload-status uploading">
                <div className="spinner-small"></div>
                <span>Uploading sample...</span>
              </div>
            ) : customVoiceFile ? (
              <div className="upload-status success">
                <div className="file-info">
                  <FiCheck className="check-icon" />
                  <span className="filename">{customVoiceFile.name}</span>
                </div>
                <button 
                  className="btn-text" 
                  onClick={() => fileInputRef.current.click()}
                >
                  Change File
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <p>Upload a clean voice sample (WAV/MP3)</p>
                <button 
                  className="btn-secondary small" 
                  onClick={() => fileInputRef.current.click()}
                >
                  <FiUpload /> Upload Audio
                </button>
                <small>Max 7MB • 10-20s Recommended</small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceManager;
