import { HashRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CoverPage from './pages/CoverPage'
import LawsIndex from './pages/LawsIndex'
import LawPage from './pages/LawPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<CoverPage />} />
          <Route path="/laws" element={<LawsIndex />} />
          <Route path="/laws/:id" element={<LawPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
