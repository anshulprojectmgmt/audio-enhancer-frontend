// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { FiRefreshCw } from 'react-icons/fi'
// import { FaDownload } from 'react-icons/fa'
// import VideoPlayer from '../components/VideoPlayer'
// import TranscriptViewer from '../components/TranscriptViewer'
// import ProcessingIndicator from '../components/ProcessingIndicator'
// import { useVideo } from '../context/VideoContext'
// import './PreviewPage.css'

// function PreviewPage() {
//   const [activeTab, setActiveTab] = useState('script')
//   const [selectedVoice, setSelectedVoice] = useState('anshul')
//   const { 
//     processedVideoUrl,
//     voiceoverProcessing,
//     refreshVoiceover,
//     sheetLink
//   } = useVideo()

//   const tabs = [
//     { id: 'script', label: 'Script' },
//     { id: 'aiVoice', label: 'AI Voice' },
//     { id: 'zoom', label: 'Zoom' },
//     { id: 'aiAvatar', label: 'AI Avatar' }
//   ]

//   return (
//     <div className="preview-page">
//       <div className="preview-header">
//         <div className="tabs-container">
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className={`tab ${activeTab === tab.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
        
//         <div className="header-actions">
//           <motion.button
//             className="refresh-button"
//             onClick={refreshVoiceover}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             disabled={voiceoverProcessing}
//           >
//             <FiRefreshCw className={voiceoverProcessing ? 'spinning' : ''} />
//             <span>{voiceoverProcessing ? 'Processing...' : 'Refresh Voiceover'}</span>
//           </motion.button>

//           {processedVideoUrl && (
//             <motion.a
//               href={processedVideoUrl}
//               download="processed-video.mp4"
//               className="download-button"
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <FaDownload />
//               <span>Download Video</span>
//             </motion.a>
//           )}
//         </div>
//       </div>

//       <div className="preview-content">
//         <div className="editor-section">
//           {activeTab === 'script' && (
//             <TranscriptViewer sheetLink={sheetLink} />
//           )}
//           {activeTab === 'aiVoice' && (
//             <div className="voice-selector">
//               <div className="voice-selector-header">
//                 <label htmlFor="voice-select">Select Voice</label>
//                 <select 
//                   id="voice-select"
//                   className="voice-dropdown"
//                   value={selectedVoice}
//                   onChange={(e) => setSelectedVoice(e.target.value)}
//                 >
//                   <option value="anshul">Anshul</option>
//                   <option value="ai">AI Voice</option>
//                 </select>
//               </div>
//             </div>
//           )}
//           {activeTab === 'zoom' && (
//             <div className="coming-soon">Zoom features coming soon</div>
//           )}
//           {activeTab === 'aiAvatar' && (
//             <div className="coming-soon">AI Avatar features coming soon</div>
//           )}
//         </div>
        
//         <div className="video-section">
//           <AnimatePresence mode="wait">
//             {voiceoverProcessing ? (
//               <motion.div 
//                 className="video-processing-overlay"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <div className="processing-spinner" />
//                 <p>Generating new video with selected voice...</p>
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 key="video-player"
//               >
//                 <VideoPlayer src={processedVideoUrl} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PreviewPage



// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom' // Added useNavigate
// import { motion, AnimatePresence } from 'framer-motion'
// import { FiRefreshCw, FiArrowLeft } from 'react-icons/fi' // Added FiArrowLeft
// import { FaDownload } from 'react-icons/fa'
// import VideoPlayer from '../components/VideoPlayer'
// import TranscriptViewer from '../components/TranscriptViewer'
// import AvatarGenerator from '../components/AvatarGenerator' // <--- IMPORT THIS
// // import ProcessingIndicator from '../components/ProcessingIndicator' (Unused in this file)
// import { useVideo } from '../context/VideoContext'
// import './PreviewPage.css'

// function PreviewPage() {
//   const navigate = useNavigate() // Initialize hook
//   const [activeTab, setActiveTab] = useState('script')
//   const [selectedVoice, setSelectedVoice] = useState('anshul')
  
//   const { 
//     processedVideoUrl,
//     voiceoverProcessing,
//     refreshVoiceover,
//     sheetLink, // <--- Ensure this is being set in Context
//     sheetId    // <--- We might need this too
//   } = useVideo()

//   // Redirect if no sheetLink (Page reload protection)
//   useEffect(() => {
//     if (!sheetLink) {
//        // Optional: Redirect back if state is lost on reload
//        // navigate('/video-enhancer') 
//     }
//   }, [sheetLink, navigate])

//   const tabs = [
//     { id: 'script', label: 'Script' },
//     { id: 'aiVoice', label: 'AI Voice' },
//     { id: 'zoom', label: 'Zoom' },
//     { id: 'aiAvatar', label: 'AI Avatar' }
//   ]

//   return (
//     <div className="preview-page">
      
//       {/* --- ADDED BACK BUTTON --- */}
//       <div className="preview-nav-header" style={{ padding: '10px 20px' }}>
//          <button 
//             onClick={() => navigate('/video-enhancer')}
//             style={{ 
//               background: 'transparent', 
//               border: 'none', 
//               color: '#fff', 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '8px',
//               cursor: 'pointer'
//             }}
//          >
//             <FiArrowLeft /> Back to Upload
//          </button>
//       </div>

//       <div className="preview-header">
//         <div className="tabs-container">
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className={`tab ${activeTab === tab.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
        
//         {/* HIDE REFRESH BUTTON IF ON AVATAR TAB */}
//         {activeTab !== 'aiAvatar' && (
//           <div className="header-actions">
//             <motion.button
//               className="refresh-button"
//               onClick={refreshVoiceover}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               disabled={voiceoverProcessing}
//             >
//               <FiRefreshCw className={voiceoverProcessing ? 'spinning' : ''} />
//               <span>{voiceoverProcessing ? 'Processing...' : 'Refresh Voiceover'}</span>
//             </motion.button>

//             {processedVideoUrl && (
//               <motion.a
//                 href={processedVideoUrl}
//                 download="processed-video.mp4"
//                 className="download-button"
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <FaDownload />
//                 <span>Download Video</span>
//               </motion.a>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="preview-content">
//         <div className="editor-section">
          
//           {/* SCRIPT TAB */}
//           {activeTab === 'script' && (
//             // Ensure TranscriptViewer is handling 'sheetLink' correctly
//             sheetLink ? (
//                 <TranscriptViewer sheetLink={sheetLink} />
//             ) : (
//                 <div className="no-script-message" style={{color: '#888', padding: '20px'}}>
//                     No transcript available. Please re-upload video.
//                 </div>
//             )
//           )}
          
//           {/* AI VOICE TAB */}
//           {activeTab === 'aiVoice' && (
//             <div className="voice-selector">
//               <div className="voice-selector-header">
//                 <label htmlFor="voice-select">Select Voice</label>
//                 <select 
//                   id="voice-select"
//                   className="voice-dropdown"
//                   value={selectedVoice}
//                   onChange={(e) => setSelectedVoice(e.target.value)}
//                 >
//                   <option value="anshul">Anshul</option>
//                   <option value="ai">AI Voice</option>
//                 </select>
//               </div>
//             </div>
//           )}
          
//           {/* ZOOM TAB */}
//           {activeTab === 'zoom' && (
//             <div className="coming-soon">Zoom features coming soon</div>
//           )}
          
//           {/* AVATAR TAB - INJECTED HERE */}
//           {activeTab === 'aiAvatar' && (
//             <AvatarGenerator onBack={() => setActiveTab('script')} />
//           )}
//         </div>
        
//         {/* VIDEO PLAYER SECTION */}
//         <div className="video-section" style={{ position: 'relative' }}>
//           <AnimatePresence mode="wait">
//             {voiceoverProcessing ? (
//               <motion.div 
//                 className="video-processing-overlay"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 // FIX SPINNER POSITION
//                 style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: '100%',
//                     width: '100%',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     background: '#000',
//                     zIndex: 10
//                 }}
//               >
//                 <div className="processing-spinner" />
//                 <p style={{ marginTop: '20px' }}>Generating new video with selected voice...</p>
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 key="video-player"
//                 style={{ width: '100%', height: '100%' }}
//               >
//                 <VideoPlayer src={processedVideoUrl} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PreviewPage

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiRefreshCw, FiArrowLeft } from 'react-icons/fi'
import { FaDownload } from 'react-icons/fa'
import VideoPlayer from '../components/VideoPlayer'
import TranscriptViewer from '../components/TranscriptViewer'
import AvatarGenerator from '../components/AvatarGenerator'
import { useVideo } from '../context/VideoContext'
import VoiceManager from '../components/VoiceManager' 
import './PreviewPage.css'

function PreviewPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('script')
  const [selectedVoice, setSelectedVoice] = useState('anshul')
  
  const { 
    processedVideoUrl,
    voiceoverProcessing,
    refreshVoiceover,
    voiceoverApplied, // <--- Used for the safety check
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
        
        {/* HEADER ACTIONS - NOW VISIBLE ON ALL TABS */}
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
                download="processed-video.mp4"
                target="_blank"                  // <--- OPENS IN NEW TAB
                rel="noopener noreferrer"        // <--- SECURITY BEST PRACTICE
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
          
          {/* AI VOICE TAB */}
          {activeTab === 'aiVoice' && (
              <VoiceManager />
           )}
          
          {/* ZOOM TAB */}
          {activeTab === 'zoom' && (
            <div className="coming-soon" style={{color: '#888', padding: '20px', textAlign: 'center'}}>
                Zoom features coming soon
            </div>
          )}
          
          {/* AI AVATAR TAB (WITH SAFETY CHECK) */}
          {activeTab === 'aiAvatar' && (
            <>
              {voiceoverApplied ? (
                // 1. Show Generator if Voiceover IS applied
                <AvatarGenerator onBack={() => setActiveTab('script')} />
              ) : (
                // 2. Show Warning if Voiceover is NOT applied
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    background: '#2a2a2a', // Dark card
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
                // CENTERED SPINNER STYLE
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
