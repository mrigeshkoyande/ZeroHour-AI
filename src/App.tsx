// ZeroHour AI OS Navigation
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import AIPlanner from './pages/AIPlanner'
import RiskEngine from './pages/RiskEngine'
import DigitalTwin from './pages/DigitalTwin'
import SOSRecovery from './pages/SOSRecovery'
import AIChat from './pages/AIChat'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/planner" element={<AIPlanner />} />
          <Route path="/risk" element={<RiskEngine />} />
          <Route path="/twin" element={<DigitalTwin />} />
          <Route path="/sos" element={<SOSRecovery />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
