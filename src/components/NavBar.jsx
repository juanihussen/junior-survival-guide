import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const sections = [
  { id: 'inicio', label: { es: 'Inicio', en: 'Home' } },
  { id: 'tickets', label: { es: 'Tickets', en: 'Tickets' } },
  { id: 'roles', label: { es: 'Roles', en: 'Roles' } },
  { id: 'ceremonias', label: { es: 'Ceremonias', en: 'Ceremonies' } },
  { id: 'pipeline', label: { es: 'CI/CD', en: 'CI/CD' } },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const { lang, toggleLanguage } = useLanguage()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id)
        return { id: s.id, top: el?.offsetTop ?? 0 }
      })
      const mid = window.scrollY + window.innerHeight / 3
      const current = [...offsets].reverse().find(o => mid >= o.top)
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('inicio')} className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-accent-blue" />
          <span className="font-semibold text-sm tracking-tight">
            Junior<span className="text-accent-blue">Survival</span>Guide
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                active === s.id
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {s.label[lang]}
            </button>
          ))}
          <div className="w-px h-5 bg-white/10 mx-2" />
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-all"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>

        <button
          onClick={toggleLanguage}
          className="md:hidden px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 text-gray-400 transition-all"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </motion.nav>
  )
}
