import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import HeroSection from './sections/HeroSection'
import ScaleSection from './sections/ScaleSection'
import LuxurySection from './sections/LuxurySection'
import DiningSection from './sections/DiningSection'
import AttractionsSection from './sections/AttractionsSection'
import EventsSection from './sections/EventsSection'
import CTASection from './sections/CTASection'
import LeasingPage from './pages/LeasingPage'
import EventsPage from './pages/EventsPage'
import SponsorsPage from './pages/SponsorsPage'
import VenuesPage from './pages/VenuesPage'
import Chatbot from './components/Chatbot/Chatbot'
import './App.css'

function HomePage() {
  return (
    <main>
      <HeroSection />
      <ScaleSection />
      <LuxurySection />
      <DiningSection />
      <AttractionsSection />
      <EventsSection />
      <CTASection />
    </main>
  )
}

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leasing" element={<LeasingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/venues" element={<VenuesPage />} />
      </Routes>
      <Chatbot />
    </div>
  )
}

export default App
