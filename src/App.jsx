// import { Routes, Route } from 'react-router-dom'
// import LandingPage from './pages/LandingPage'
// import UploadPage from './pages/UploadPage'
// import PreviewPage from './pages/PreviewPage'
// import NotFoundPage from './pages/NotFoundPage'
// import VideoEditorPage from './pages/VideoEditorPage'
// import Layout from './components/Layout'
// import WelcomePopup from './components/WelcomePopup'
// import './App.css'

// function App() {
//   return (
//     <Layout>
//       {/* <WelcomePopup /> */}
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/video-enhancer" element={<UploadPage />} />
//         <Route path="/preview" element={<PreviewPage />} />
//         <Route path="/videoeditor" element={<VideoEditorPage />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Layout>
//   )
// }

// export default App


import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
// import PreviewPage from './pages/PreviewPage' <--- DELETE THIS LINE
import ResultsPage from './pages/ResultsPage' // <--- ADD THIS LINE
import NotFoundPage from './pages/NotFoundPage'
import VideoEditorPage from './pages/VideoEditorPage'
import Layout from './components/Layout'
// import WelcomePopup from './components/WelcomePopup'
import './App.css'

function App() {
  return (
    <Layout>
      {/* <WelcomePopup /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/video-enhancer" element={<UploadPage />} />
        
        {/* UPDATE THIS ROUTE TO USE YOUR NEW PAGE */}
        <Route path="/preview" element={<ResultsPage />} /> 
        
        <Route path="/videoeditor" element={<VideoEditorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
