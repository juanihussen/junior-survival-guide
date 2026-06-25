import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function HeroSection() {
  const { lang } = useLanguage()

  const T = {
    badge: { es: 'Guía Interactiva para Devs Juniors', en: 'Interactive Guide for Junior Devs' },
    survivalGuide: { es: 'Guía de Supervivencia', en: 'Survival Guide' },
    description: {
      es: 'Aprendé cómo funciona la vida real en una empresa de software: tickets, roles, ceremonias y pipelines. Todo interactivo.',
      en: 'Learn how real life works at a software company: tickets, roles, ceremonies, and pipelines. All interactive.',
    },
    tickets: { es: 'Tickets', en: 'Tickets' },
    rolesScrum: { es: 'Roles Scrum', en: 'Scrum Roles' },
    cicd: { es: 'CI/CD', en: 'CI/CD' },
  }

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[100px]" />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-blue/10 text-accent-blue border border-accent-blue/20 mb-6">
            {T.badge[lang]}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
        >
          <span className="text-gradient">Junior</span>
          <br />
          <span>{T.survivalGuide[lang]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {T.description[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
