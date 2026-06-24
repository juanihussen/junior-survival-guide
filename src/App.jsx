import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import TicketLifecycle from './components/TicketLifecycle'
import ScrumRoles from './components/ScrumRoles'
import CeremonySimulator from './components/CeremonySimulator'
import PipelineView from './components/PipelineView'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <NavBar />
      <HeroSection />
      <TicketLifecycle />
      <ScrumRoles />
      <CeremonySimulator />
      <PipelineView />
      <Footer />
    </div>
  )
}
