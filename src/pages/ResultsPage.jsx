// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { FiRefreshCw, FiArrowLeft } from 'react-icons/fi'
// import VideoPlayer from '../components/VideoPlayer'
// import TranscriptViewer from '../components/TranscriptViewer'
// import VoiceSelector from '../components/VoiceSelector'
// import ProcessingIndicator from '../components/ProcessingIndicator'
// import { useVideo } from '../context/VideoContext'
// import './ResultsPage.css'

// function ResultsPage() {
//   const navigate = useNavigate()
//   const { 
//     videoUrl, 
//     videoFile, 
//     transcript, 
//     voiceoverProcessing, 
//     voiceoverApplied,
//     refreshVoiceover 
//   } = useVideo()
  
//   // Redirect if no video or transcript
//   if (!videoUrl && !videoFile) {
//     navigate('/')
//     return null
//   }
  
//   return (
//     <div className="results-page">
//       <motion.div 
//         className="page-header with-back"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <button 
//           className="back-button"
//           onClick={() => navigate('/')}
//         >
//           <FiArrowLeft />
//           <span>Back to Upload</span>
//         </button>
        
//         <div className="header-content">
//           <h1>Video Results</h1>
//           <p className="page-description">
//             {voiceoverApplied 
//               ? 'Your video has been processed with a new voiceover.'
//               : 'Your video has been processed. You can view the transcript and change the voiceover.'}
//           </p>
//         </div>
//       </motion.div>
      
//       <div className="results-container">
//         <div className="video-section">
//           <VideoPlayer 
//             src={videoUrl} 
//             title={videoFile?.name} 
//           />
//         </div>
        
//         <div className="transcript-section">
//           {transcript ? (
//             <TranscriptViewer transcript={transcript} />
//           ) : (
//             <div className="no-transcript">
//               <p>No transcript available. Process the video first.</p>
//             </div>
//           )}
//         </div>
        
//         <div className="voiceover-section">
//           {transcript && (
//             <>
//               <div className="section-header">
//                 <h2>Voice Replacement</h2>
//                 <p className="section-description">
//                   Choose a voice style and refresh the voiceover to apply it to your video.
//                 </p>
//               </div>
              
//               {/* <VoiceSelector /> */}
              
//               {voiceoverProcessing ? (
//                 <ProcessingIndicator text="Applying new voiceover. This may take a few moments..." />
//               ) : (
//                 <motion.button
//                   className="btn btn-primary btn-icon"
//                   onClick={refreshVoiceover}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <FiRefreshCw />
//                   <span>Refresh Voiceover</span>
//                 </motion.button>
//               )}
              
//               {voiceoverApplied && (
//                 <motion.div 
//                   className="success-message"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                 >
//                   <p>✅ New voiceover has been applied successfully!</p>
//                 </motion.div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ResultsPage

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiEdit3, FiUser } from 'react-icons/fi' // Icons
import VideoPlayer from '../components/VideoPlayer'
import TranscriptViewer from '../components/TranscriptViewer'
import AvatarGenerator from '../components/AvatarGenerator' // <--- THE MISSING LINK
import { useVideo } from '../context/VideoContext'
import './ResultsPage.css'

function ResultsPage() {
  const navigate = useNavigate()
  const { 
    videoUrl, 
    videoFile, 
    processedVideoUrl, 
    transcript, 
    voiceoverProcessing, 
    voiceoverApplied,
    refreshVoiceover 
  } = useVideo()
  
  // Tab State: 'script' or 'avatar'
  const [activeTab, setActiveTab] = useState('script')

  if (!videoUrl && !videoFile) {
    navigate('/')
    return null
  }
  
  return (
    <div className="results-page">
      <motion.div 
        className="page-header with-back"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="back-button" onClick={() => navigate('/')}>
          <FiArrowLeft /> <span>Back to Upload</span>
        </button>
        <div className="header-content"><h1>Video Editor</h1></div>
      </motion.div>
      
      <div className="editor-layout">
        
        {/* --- LEFT PANEL --- */}
        <div className="editor-left-panel">
          
          {/* TABS */}
          <div className="editor-tabs">
            <button 
              className={`tab-btn ${activeTab === 'script' ? 'active' : ''}`}
              onClick={() => setActiveTab('script')}
            >
              <FiEdit3 /> Script
            </button>
            <button 
              className={`tab-btn ${activeTab === 'avatar' ? 'active' : ''}`}
              onClick={() => setActiveTab('avatar')}
            >
              <FiUser /> AI Avatar
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="tab-content">
            
            {/* 1. SCRIPT TAB */}
            {activeTab === 'script' && (
              <div className="script-container">
                <div className="panel-header">
                  <h3>Transcript Editor</h3>
                  <p>Edit the text below to change what is spoken.</p>
                </div>
                
                {transcript ? (
                  <TranscriptViewer transcript={transcript} />
                ) : (
                  <p>No transcript available.</p>
                )}

                <div className="action-area">
                   {voiceoverProcessing ? (
                      <button className="btn-action processing" disabled>
                        <div className="spinner-small"></div> Applying Voiceover...
                      </button>
                   ) : (
                      <button className="btn-action primary" onClick={refreshVoiceover}>
                        Refresh Voiceover
                      </button>
                   )}
                   {voiceoverApplied && <span className="success-tag">✅ Updated</span>}
                </div>
              </div>
            )}

            {/* 2. AVATAR TAB (Connects to your new file) */}
            {activeTab === 'avatar' && (
              <AvatarGenerator 
                onBack={() => setActiveTab('script')}
              />
            )}

          </div>
        </div>
        
        {/* --- RIGHT PANEL --- */}
        <div className="editor-right-panel">
          <div className="video-wrapper">
            <VideoPlayer 
              src={processedVideoUrl || videoUrl} 
              title={videoFile?.name} 
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResultsPage
