import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PasswordPrompt from './components/PasswordPrompt'
import Layout from './components/Layout'
import { LightboxProvider } from './context/LightboxContext'
import HomePage from './pages/HomePage'
import AngryBirdPage from './pages/AngryBirdPage'
import NewYearPage from './pages/NewYearPage'
import AnniversaryPage from './pages/AnniversaryPage'
import FunnyPage from './pages/FunnyPage'
import ImportantDatesPage from './pages/ImportantDatesPage'
import LoveTimelinePage from './pages/LoveTimelinePage'
import RoseDayPage from './pages/RoseDayPage'
import ProposeDayPage from './pages/ProposeDayPage'
import ChocolateDayPage from './pages/ChocolateDayPage'
import TeddyDayPage from './pages/TeddyDayPage'
import PromiseDayPage from './pages/PromiseDayPage'
import HugDayPage from './pages/HugDayPage'
import KissDayPage from './pages/KissDayPage'
import ValentinesDayPage from './pages/ValentinesDayPage'
import { useState } from 'react'

function App() {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true)

  if (showPasswordPrompt) {
    return <PasswordPrompt onSuccess={() => setShowPasswordPrompt(false)} />
  }

  return (
    <Router>
      <LightboxProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/angry-bird" element={<AngryBirdPage />} />
            <Route path="/new-year" element={<NewYearPage />} />
            <Route path="/anniversary" element={<AnniversaryPage />} />
            <Route path="/funny" element={<FunnyPage />} />
            <Route path="/important-dates" element={<ImportantDatesPage />} />
            <Route path="/love-timeline" element={<LoveTimelinePage />} />
            <Route path="/rose-day" element={<RoseDayPage />} />
            <Route path="/propose-day" element={<ProposeDayPage />} />
            <Route path="/chocolate-day" element={<ChocolateDayPage />} />
            <Route path="/teddy-day" element={<TeddyDayPage />} />
            <Route path="/promise-day" element={<PromiseDayPage />} />
            <Route path="/hug-day" element={<HugDayPage />} />
            <Route path="/kiss-day" element={<KissDayPage />} />
            <Route path="/valentines-day" element={<ValentinesDayPage />} />
          </Routes>
        </Layout>
      </LightboxProvider>
    </Router>
  )
}

export default App
