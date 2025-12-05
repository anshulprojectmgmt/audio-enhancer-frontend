// import { createContext, useState, useContext } from 'react'
// import axios from 'axios'
// const VideoContext = createContext()

// export const useVideo = () => useContext(VideoContext)

// export function VideoProvider({ children }) {
//   const [videoFile, setVideoFile] = useState(null)
//   const [videoUrl, setVideoUrl] = useState(null)
  
//   const [processedVideoUrl, setProcessedVideoUrl] = useState(null)
//   const [transcript, setTranscript] = useState(null)
//   const [processing, setProcessing] = useState(false)
//   const [voiceoverProcessing, setVoiceoverProcessing] = useState(false)
//   const [error, setError] = useState(null)
//   const [voiceoverApplied, setVoiceoverApplied] = useState(false)
//   const [selectedVoice, setSelectedVoice] = useState('male')
//   const [sheetLink, setSheetLink] = useState("");
//   const [segments, setSegments] = useState([]);
//   const [newVideoLink, setNewVideoLink] = useState(""); 
//   const [sheetId, setSheetId] = useState(""); 
//   const [backendUrl, setBackendUrl] = useState("https://elastic.aiplanet.tech")
//   const handleVideoUpload = (file) => {
//     try {
//       setVideoFile(file)
//       const url = URL.createObjectURL(file)
//       setVideoUrl(url)
//       setProcessedVideoUrl(url) // Set the original video URL initially
//       setTranscript(null)
//       setVoiceoverApplied(false)
//       setError(null)
//     } catch (err) {
//       setError('Error uploading video: ' + err.message)
//       console.error(err)
//     }
//   }

//   const uploadVideoAndGetSheetId = async () => {
//     const form = new FormData();
//     form.append("file", videoFile);
//     const res = await fetch(`${backendUrl}/process-video`,
//       { method: "POST", body: form }
//     );
//     const json = await res.json();
//     console.log('spreadSheet Id: ', json);
//     const id = json.spreadsheetId;
//     const link = `https://docs.google.com/spreadsheets/d/${id}`;
//     setSheetId(id);
//     setSheetLink(link);
//     return id;
//   }

//   const processVideo = async () => {
//     if (!videoFile) {
//       setError('Please upload a video first')
//       return
//     }
      
//     try {
//       setProcessing(true)
//       setError(null)
      
//       // Only upload video and get sheet ID
//       await uploadVideoAndGetSheetId();
      
//       setProcessing(false)
//     } catch (err) {
//       setProcessing(false)
//       setError('Error processing video: ' + err.message)
//       console.error(err)
//     }
//   }

//   // const refreshVoiceover = async () => {
//   //   try {
//   //     setVoiceoverProcessing(true)
//   //     setVoiceoverApplied(false)
//   //     setError(null)
      
//   //     const refreshRes = await axios.post(`${backendUrl}/refresh-voiceover?sheetId=${sheetId}`);
//   //     setProcessedVideoUrl(refreshRes.data.Final_s3_url);
      
//   //     setVoiceoverApplied(true)
//   //     setVoiceoverProcessing(false)
//   //   } catch (err) {
//   //     setVoiceoverProcessing(false)
//   //     setError('Error refreshing voiceover: ' + err.message)
//   //     console.error(err)
//   //   }
//   // }
//   const refreshVoiceover = async () => {
//   try {
//     setVoiceoverProcessing(true)
//     setVoiceoverApplied(false)
//     setError(null)
    
//     // Show initial loading state
//     setError('Processing started... This may take 2-3 minutes.')
    
//     const refreshRes = await axios.post(`${backendUrl}/refresh-voiceover?sheetId=${sheetId}`, {}, {
//       timeout: 600000 // 5 minutes timeout
//     });
    
//     setProcessedVideoUrl(refreshRes.data.Final_s3_url);
//     setError(null) // Clear any loading messages
    
//     setVoiceoverApplied(true)
//     setVoiceoverProcessing(false)
//   } catch (err) {
//     setVoiceoverProcessing(false)
//     if (err.code === 'ECONNABORTED') {
//       setError('Request timed out. The video is still processing on the server.')
//     } else {
//       setError('Error refreshing voiceover: ' + err.message)
//     }
//     console.error(err)
//   }
// }

//   const resetAll = () => {
//     if (videoUrl) {
//       URL.revokeObjectURL(videoUrl)
//     }
//     if (processedVideoUrl && processedVideoUrl !== videoUrl) {
//       URL.revokeObjectURL(processedVideoUrl)
//     }
//     setVideoFile(null)
//     setVideoUrl(null)
//     setProcessedVideoUrl(null)
//     setTranscript(null)
//     setProcessing(false)
//     setVoiceoverProcessing(false)
//     setError(null)
//     setVoiceoverApplied(false)
//   }

//   const value = {
//     videoFile,
//     videoUrl,
//     processedVideoUrl,
//     transcript,
//     processing,
//     voiceoverProcessing,
//     error,
//     voiceoverApplied,
//     selectedVoice,
//     setSelectedVoice,
//     handleVideoUpload,
//     processVideo,
//     refreshVoiceover,
//     resetAll,
//     sheetLink,
//     newVideoLink,
//     sheetId,
//   }

//   return (
//     <VideoContext.Provider value={value}>
//       {children}
//     </VideoContext.Provider>
//   )
// }


import { createContext, useState, useContext } from 'react'
import axios from 'axios'
const VideoContext = createContext()

export const useVideo = () => useContext(VideoContext)

export function VideoProvider({ children }) {
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null)
  const [transcript, setTranscript] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [voiceoverProcessing, setVoiceoverProcessing] = useState(false)
  
  // --- NEW AVATAR STATE ---
  const [heygenApiKey, setHeygenApiKey] = useState('')
  const [avatarId, setAvatarId] = useState('')
  const [avatarProcessing, setAvatarProcessing] = useState(false)
  // ------------------------

  const [error, setError] = useState(null)
  const [voiceoverApplied, setVoiceoverApplied] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState('male')
  const [sheetLink, setSheetLink] = useState("");
  const [segments, setSegments] = useState([]);
  const [newVideoLink, setNewVideoLink] = useState(""); 
  const [sheetId, setSheetId] = useState(""); 
  const [backendUrl, setBackendUrl] = useState("https://elastic.aiplanet.tech")

  const handleVideoUpload = (file) => {
    try {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      setProcessedVideoUrl(url) // Set the original video URL initially
      setTranscript(null)
      setVoiceoverApplied(false)
      setError(null)
    } catch (err) {
      setError('Error uploading video: ' + err.message)
      console.error(err)
    }
  }

  const uploadVideoAndGetSheetId = async () => {
    const form = new FormData();
    form.append("file", videoFile);
    const res = await fetch(`${backendUrl}/process-video`,
      { method: "POST", body: form }
    );
    const json = await res.json();
    console.log('spreadSheet Id: ', json);
    const id = json.spreadsheetId;
    const link = `https://docs.google.com/spreadsheets/d/${id}`;
    setSheetId(id);
    setSheetLink(link);
    return id;
  }

  const processVideo = async () => {
    if (!videoFile) {
      setError('Please upload a video first')
      return
    }
      
    try {
      setProcessing(true)
      setError(null)
      
      // Only upload video and get sheet ID
      await uploadVideoAndGetSheetId();
      
      setProcessing(false)
    } catch (err) {
      setProcessing(false)
      setError('Error processing video: ' + err.message)
      console.error(err)
    }
  }

  const refreshVoiceover = async () => {
    try {
      setVoiceoverProcessing(true)
      setVoiceoverApplied(false)
      setError(null)
      
      // Show initial loading state
      setError('Processing started... This may take 2-3 minutes.')
      
      const refreshRes = await axios.post(`${backendUrl}/refresh-voiceover?sheetId=${sheetId}`, {}, {
        timeout: 600000 // 10 minutes timeout
      });
      
      setProcessedVideoUrl(refreshRes.data.Final_s3_url);
      setError(null) // Clear any loading messages
      
      setVoiceoverApplied(true)
      setVoiceoverProcessing(false)
    } catch (err) {
      setVoiceoverProcessing(false)
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. The video is still processing on the server.')
      } else {
        setError('Error refreshing voiceover: ' + err.message)
      }
      console.error(err)
    }
  }

  // --- NEW AVATAR GENERATION FUNCTION ---
  const generateAvatarVideo = async () => {
    if (!heygenApiKey || !avatarId) {
      setError('Please enter both HeyGen API Key and Avatar ID')
      return
    }

    try {
      setAvatarProcessing(true)
      setError(null) // Clear previous errors
      
      // Send JSON body matching the Backend Pydantic Model
      const res = await axios.post(`${backendUrl}/create-avatar-video`, {
        sheetId: sheetId,
        heygenApiKey: heygenApiKey,
        avatarId: avatarId
      }, {
        timeout: 900000 // 15 minutes (Avatar generation is slow)
      });

      // Update the main video URL with the result from Endpoint 3
      if (res.data.final_video_url) {
          setProcessedVideoUrl(res.data.final_video_url)
      } else {
          throw new Error("Backend did not return a video URL.")
      }
      
      setAvatarProcessing(false)
      setError(null)
    } catch (err) {
      setAvatarProcessing(false)
      const msg = err.response?.data?.detail || err.message || "Unknown Error";
      setError('Error generating avatar video: ' + msg)
      console.error(err)
    }
  }
  // --------------------------------------

  const resetAll = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }
    if (processedVideoUrl && processedVideoUrl !== videoUrl) {
      URL.revokeObjectURL(processedVideoUrl)
    }
    setVideoFile(null)
    setVideoUrl(null)
    setProcessedVideoUrl(null)
    setTranscript(null)
    setProcessing(false)
    setVoiceoverProcessing(false)
    setError(null)
    setVoiceoverApplied(false)
    // Reset Avatar State
    setHeygenApiKey('')
    setAvatarId('')
    setAvatarProcessing(false)
  }

  const value = {
    videoFile,
    videoUrl,
    processedVideoUrl,
    transcript,
    processing,
    voiceoverProcessing,
    error,
    voiceoverApplied,
    selectedVoice,
    setSelectedVoice,
    handleVideoUpload,
    processVideo,
    refreshVoiceover,
    resetAll,
    sheetLink,
    newVideoLink,
    sheetId,
    // Export New Avatar Values
    heygenApiKey,
    setHeygenApiKey,
    avatarId,
    setAvatarId,
    avatarProcessing,
    generateAvatarVideo,
  }

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  )
}
