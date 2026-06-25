import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function NavBar() {
  const { lang, toggleLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface-card shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-accent-blue" />
          <span className="font-semibold text-sm tracking-tight">
            Junior<span className="text-accent-blue">Survival</span>Guide
          </span>
        </button>

        <button
          onClick={toggleLanguage}
          className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-all"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </motion.nav>
  )
}
