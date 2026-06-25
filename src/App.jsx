import { useState } from 'react'
import NavBar from './components/NavBar'
import SectionTabs from './components/SectionTabs'
import HeroSection from './components/HeroSection'
import TicketLifecycle from './components/TicketLifecycle'
import ScrumRoles from './components/ScrumRoles'
import Methodologies from './components/Methodologies'
import PipelineView from './components/PipelineView'
import EnvironmentsSection from './components/EnvironmentsSection'
import InterviewProcess from './components/InterviewProcess'
import Footer from './components/Footer'

const sectionComponents = {
  tickets: TicketLifecycle,
  roles: ScrumRoles,
  metodologias: Methodologies,
  pipeline: PipelineView,
  entornos: EnvironmentsSection,
  entrevistas: InterviewProcess,
}

export default function App() {
  const [activeSection, setActiveSection] = useState('tickets')
  const SectionComponent = sectionComponents[activeSection]

  return (
    <div className="min-h-screen bg-surface">
      <NavBar />
      <HeroSection />
      <div className="py-4">
        <SectionTabs activeSection={activeSection} onSelect={setActiveSection} />
      </div>
      <SectionComponent />
      <Footer />
    </div>
  )
}
