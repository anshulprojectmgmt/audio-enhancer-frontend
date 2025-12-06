import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiRefreshCw, FiArrowLeft } from 'react-icons/fi'
import { FaDownload } from 'react-icons/fa'
import VideoPlayer from '../components/VideoPlayer'
import TranscriptViewer from '../components/TranscriptViewer'
import AvatarGenerator from '../components/AvatarGenerator'
import VoiceManager from '../components/VoiceManager' // <--- THIS WAS MISSING
import { useVideo } from '../context/VideoContext'
import './PreviewPage.css'

function PreviewPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('script')
  
  // Note: selectedVoice state is now handled inside VoiceManager via Context
  
  const { 
    processedVideoUrl,
    voiceoverProcessing,
    refreshVoiceover,
    voiceoverApplied,
    sheetLink, 
    videoUrl,
    videoFile
  } = useVideo()

  // Redirect if no video (Page reload protection)
  useEffect(() => {
    if (!videoUrl && !videoFile) {
       navigate('/') 
    }
  }, [videoUrl, videoFile, navigate])

  const tabs = [
    { id: 'script', label: 'Script' },
    { id: 'aiVoice', label: 'AI Voice' },
    { id: 'zoom', label: 'Zoom' },
    { id: 'aiAvatar', label: 'AI Avatar' }
  ]

  return (
    <div className="preview-page">
      
      {/* Back Button */}
      <div className="preview-nav-header" style={{ padding: '10px 20px' }}>
         <button 
            onClick={() => navigate('/video-enhancer')}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
         >
            <FiArrowLeft /> Back to Upload
         </button>
      </div>

      <div className="preview-header">
        <div className="tabs-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Header Actions */}
        <div className="header-actions">
          <motion.button
            className="refresh-button"
            onClick={refreshVoiceover}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={voiceoverProcessing}
          >
            <FiRefreshCw className={voiceoverProcessing ? 'spinning' : ''} />
            <span>{voiceoverProcessing ? 'Processing...' : 'Refresh Voiceover'}</span>
          </motion.button>

          {processedVideoUrl && (
            <motion.a
              href={processedVideoUrl}
              download // Force Download handled by backend headers
              className="download-button"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaDownload />
              <span>Download Video</span>
            </motion.a>
          )}
        </div>
      </div>

      <div className="preview-content">
        <div className="editor-section">
          
          {/* SCRIPT TAB */}
          {activeTab === 'script' && (
            sheetLink ? (
                <TranscriptViewer sheetLink={sheetLink} />
            ) : (
                <div className="no-script-message" style={{color: '#888', padding: '20px', textAlign: 'center'}}>
                    No transcript available. Please re-upload video.
                </div>
            )
          )}
          
          {/* AI VOICE TAB (UPDATED) */}
          {activeTab === 'aiVoice' && (
            <VoiceManager />
          )}
          
          {/* ZOOM TAB */}
          {activeTab === 'zoom' && (
            <div className="coming-soon" style={{color: '#888', padding: '20px', textAlign: 'center'}}>
                Zoom features coming soon
            </div>
          )}
          
          {/* AI AVATAR TAB */}
          {activeTab === 'aiAvatar' && (
            <>
              {voiceoverApplied ? (
                <AvatarGenerator onBack={() => setActiveTab('script')} />
              ) : (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    background: '#2a2a2a',
                    borderRadius: '8px',
                    color: '#fff',
                    marginTop: '2rem',
                    border: '1px solid #444'
                }}>
                    <h3 style={{ marginBottom: '10px', color: '#ffcc00' }}>⚠️ Step Required</h3>
                    <p style={{ color: '#ccc', marginBottom: '20px' }}>
                        You must generate a <strong>Voiceover</strong> first before creating an AI Avatar video.
                    </p>
                    <button 
                        onClick={refreshVoiceover}
                        disabled={voiceoverProcessing}
                        style={{
                            padding: '10px 20px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        {voiceoverProcessing ? 'Processing...' : 'Refresh Voiceover Now'}
                    </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* VIDEO PLAYER SECTION */}
        <div className="video-section" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            {voiceoverProcessing ? (
              <motion.div 
                className="video-processing-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: '#000',
                    zIndex: 10,
                    borderRadius: '12px'
                }}
              >
                <div className="processing-spinner" />
                <p style={{ marginTop: '20px', color: '#fff' }}>Generating new video with selected voice...</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="video-player"
                style={{ width: '100%', height: '100%' }}
              >
                <VideoPlayer src={processedVideoUrl} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage
