import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const TEAM = [
  { name: 'Ana', role: { es: 'Tech Lead', en: 'Tech Lead' }, emoji: '🧠', color: 'text-accent-purple' },
  { name: 'Carlos', role: { es: 'Senior Dev', en: 'Senior Dev' }, emoji: '⚡', color: 'text-accent-blue' },
  { name: 'Sofia', role: { es: 'Junior Dev', en: 'Junior Dev' }, emoji: '🌱', color: 'text-accent-amber' },
  { name: 'Tomás', role: { es: 'Junior Dev', en: 'Junior Dev' }, emoji: '🌱', color: 'text-accent-amber' },
  { name: 'Laura', role: { es: 'QA Engineer', en: 'QA Engineer' }, emoji: '🔍', color: 'text-accent-rose' },
  { name: 'Martín', role: { es: 'Product Owner', en: 'Product Owner' }, emoji: '🎯', color: 'text-accent-amber' },
]

const CEREMONIES = {
  daily: {
    id: 'daily',
    title: { es: 'Daily Scrum', en: 'Daily Scrum' },
    desc: { es: 'Sincronización diaria del equipo. Cada miembro responde: ¿Qué hice ayer? ¿Qué haré hoy? ¿Tengo blockers?', en: 'Daily team sync. Each member answers: What did I do yesterday? What will I do today? Do I have blockers?' },
    icon: '👥',
    badge: { es: 'Reunión Diaria', en: 'Daily Meeting' },
    badgeColor: 'accent-blue',
    team: TEAM,
    ctaText: { es: 'Siguiente participante →', en: 'Next participant →' },
    completeTitle: { es: '¡Daily Completa!', en: 'Daily Complete!' },
    completeText: { es: 'Todos los miembros del equipo están sincronizados.', en: 'All team members are synchronized.' },
    newLabel: { es: 'Nueva Daily', en: 'New Daily' },
  },
  planning: {
    id: 'planning',
    title: { es: 'Sprint Planning', en: 'Sprint Planning' },
    desc: { es: 'El equipo define qué se va a construir en el sprint y cómo se va a abordar.', en: 'The team defines what will be built in the sprint and how to approach it.' },
    icon: '📋',
    badge: { es: 'Planificación', en: 'Planning' },
    badgeColor: 'accent-purple',
    ctaText: { es: 'Estimar siguiente historia →', en: 'Estimate next story →' },
    completeTitle: { es: '¡Sprint Planificado!', en: 'Sprint Planned!' },
    completeText: { es: 'El equipo tiene un sprint backlog claro y listo para ejecutar.', en: 'The team has a clear sprint backlog ready to execute.' },
    newLabel: { es: 'Nuevo Planning', en: 'New Planning' },
  },
  refinement: {
    id: 'refinement',
    title: { es: 'Backlog Refinement', en: 'Backlog Refinement' },
    desc: { es: 'El equipo refina las historias del backlog: agrega detalles, criterios y estimaciones.', en: 'The team refines backlog stories: adding details, criteria, and estimates.' },
    icon: '🔧',
    badge: { es: 'Refinamiento', en: 'Refinement' },
    badgeColor: 'accent-amber',
    ctaText: { es: 'Refinar siguiente ítem →', en: 'Refine next item →' },
    completeTitle: { es: '¡Backlog Refinado!', en: 'Backlog Refined!' },
    completeText: { es: 'Todas las historias tienen criterios claros y estimaciones.', en: 'All stories have clear criteria and estimates.' },
    newLabel: { es: 'Nuevo Refinement', en: 'New Refinement' },
  },
  retro: {
    id: 'retro',
    title: { es: 'Sprint Retrospective', en: 'Sprint Retrospective' },
    desc: { es: 'El equipo reflexiona sobre el sprint para mejorar continuamente.', en: 'The team reflects on the sprint to continuously improve.' },
    icon: '🔄',
    badge: { es: 'Retrospectiva', en: 'Retrospective' },
    badgeColor: 'accent-rose',
    ctaText: { es: 'Siguiente insight →', en: 'Next insight →' },
    completeTitle: { es: '¡Retro Completa!', en: 'Retro Complete!' },
    completeText: { es: 'El equipo identificó acciones concretas para mejorar.', en: 'The team identified concrete actions to improve.' },
    newLabel: { es: 'Nueva Retro', en: 'New Retro' },
  },
}

const UPDATES = {
  'Ana': [
    { es: 'Ayer mergeé el refactor del módulo de auth. Hoy voy a empezar con la integración de la API de pagos. Sin blockers.', en: 'Yesterday I merged the auth module refactor. Today I will start integrating the payments API. No blockers.' },
    { es: 'Ayer hice code review de 3 PRs. Hoy voy a pair programming con Sofía para la feature de notificaciones. Blocker: necesito acceso a la DB de staging.', en: 'Yesterday I reviewed 3 PRs. Today I will pair program with Sofía on the notifications feature. Blocker: I need access to the staging DB.' },
    { es: 'Ayer desbloquee a Tomás con el tema de Docker. Hoy voy a terminar la documentación técnica del sprint.', en: 'Yesterday I unblocked Tomás with Docker. Today I will finish the sprint technical documentation.' },
  ],
  'Carlos': [
    { es: 'Ayer terminé el endpoint de usuarios. Hoy voy a empezar con los tests de integración. Sin blockers.', en: 'Yesterday I finished the users endpoint. Today I will start integration tests. No blockers.' },
    { es: 'Ayer tuve varias interrupciones. Hoy voy a cerrar la deuda técnica del módulo de reports. Blocker: el ambiente de dev está caído.', en: 'Yesterday I had several interruptions. Today I will close the technical debt on the reports module. Blocker: the dev environment is down.' },
    { es: 'Ayer hice review del PR de Tomás. Hoy voy a pair programming con él para mejorar la cobertura de tests.', en: 'Yesterday I reviewed Tomás\'s PR. Today I will pair program with him to improve test coverage.' },
  ],
  'Sofia': [
    { es: 'Ayer estuve con el onboarding del proyecto. Hoy voy a empezar mi primer ticket: un bug en el login. Blocker: no entiendo bien la estructura del proyecto.', en: 'Yesterday I was doing project onboarding. Today I will start my first ticket: a login bug. Blocker: I don\'t fully understand the project structure.' },
    { es: 'Ayer hice mi primer PR 🎉. Hoy voy a seguir con el ticket de la UI del dashboard. Sin blockers, Carlos me ayudó con las dudas.', en: 'Yesterday I made my first PR 🎉. Today I will continue with the dashboard UI ticket. No blockers, Carlos helped me with my questions.' },
    { es: 'Ayer aprendí a usar Docker. Hoy voy a implementar el componente de búsqueda. Blocker: necesito que alguien revise mi diseño antes de codear.', en: 'Yesterday I learned to use Docker. Today I will implement the search component. Blocker: I need someone to review my design before coding.' },
  ],
  'Tomás': [
    { es: 'Ayer configuré mi entorno local. Hoy voy a empezar con el ticket de filtros. Blocker: problemas con las variables de entorno.', en: 'Yesterday I set up my local environment. Today I will start the filters ticket. Blocker: issues with environment variables.' },
    { es: 'Ayer hice pairing con Ana. Hoy voy a seguir con el ticket de paginación. Sin blockers.', en: 'Yesterday I paired with Ana. Today I will continue with the pagination ticket. No blockers.' },
    { es: 'Ayer completé mi segundo ticket. Hoy voy a empezar con la integración del front con la API. Blocker: necesito ayuda con los tipos de TypeScript.', en: 'Yesterday I completed my second ticket. Today I will start frontend-API integration. Blocker: I need help with TypeScript types.' },
  ],
  'Laura': [
    { es: 'Ayer probé el PR de Carlos. Encontré un bug en el flujo de error. Hoy voy a escribir los casos de prueba para la nueva feature.', en: 'Yesterday I tested Carlos\'s PR. I found a bug in the error flow. Today I will write test cases for the new feature.' },
    { es: 'Ayer ejecuté la suite de tests regresivos. Todo OK. Hoy voy a automatizar los tests del módulo de usuarios.', en: 'Yesterday I ran the regression test suite. All OK. Today I will automate tests for the users module.' },
    { es: 'Ayer rechacé un PR que no tenía tests. Hoy voy a documentar los criterios de aceptación para el sprint que viene.', en: 'Yesterday I rejected a PR that had no tests. Today I will document acceptance criteria for the upcoming sprint.' },
  ],
  'Martín': [
    { es: 'Ayer hablé con stakeholders. Confirman que la prioridad es el módulo de pagos. Hoy voy a refinar las historias del backlog.', en: 'Yesterday I spoke with stakeholders. They confirm the payments module is the priority. Today I will refine backlog stories.' },
    { es: 'Ayer ajusté la prioridad del backlog. Hoy voy a preparar la sprint review con el cliente.', en: 'Yesterday I adjusted the backlog priority. Today I will prepare the sprint review with the client.' },
    { es: 'Ayer definí los criterios de aceptación de las próximas historias. Hoy voy a responder dudas del equipo sobre los requerimientos.', en: 'Yesterday I defined acceptance criteria for upcoming stories. Today I will answer team questions about requirements.' },
  ],
}

const PLANNING_STORIES = [
  { title: { es: 'Login con Google OAuth', en: 'Login with Google OAuth' }, points: null, desc: { es: 'Como usuario quiero iniciar sesión con Google para no tener que recordar otra contraseña.', en: 'As a user I want to log in with Google so I don\'t have to remember another password.' }, teamVotes: [3, 5, 5, 3, 5, 3] },
  { title: { es: 'Dashboard de métricas', en: 'Metrics Dashboard' }, points: null, desc: { es: 'Como admin quiero ver un dashboard con métricas clave del sistema.', en: 'As an admin I want to see a dashboard with key system metrics.' }, teamVotes: [8, 13, 8, 8, 5, 8] },
  { title: { es: 'Exportar reportes a PDF', en: 'Export Reports to PDF' }, points: null, desc: { es: 'Como usuario quiero exportar reportes a PDF para compartirlos con mi equipo.', en: 'As a user I want to export reports to PDF to share with my team.' }, teamVotes: [5, 5, 3, 5, 8, 5] },
  { title: { es: 'Notificaciones push', en: 'Push Notifications' }, points: null, desc: { es: 'Como usuario quiero recibir notificaciones push cuando ocurra un evento importante.', en: 'As a user I want to receive push notifications when an important event occurs.' }, teamVotes: [8, 8, 13, 8, 8, 5] },
]

const PLANNING_DISCUSSIONS = [
  { es: '¿Usamos alguna librería de OAuth o la hacemos manual?', en: 'Do we use an OAuth library or build it manually?' },
  { es: 'Tenemos que considerar qué métricas son las más relevantes.', en: 'We need to consider which metrics are most relevant.' },
  { es: 'Ya tenemos una lib de PDF, debería ser straightforward.', en: 'We already have a PDF lib, it should be straightforward.' },
  { es: 'Vamos a necesitar un service worker y configurar Firebase.', en: 'We will need a service worker and Firebase setup.' },
]

const REFINEMENT_ITEMS = [
  {
    title: { es: 'Filtros avanzados', en: 'Advanced Filters' },
    desc: { es: 'Como usuario quiero filtrar resultados por múltiples criterios.', en: 'As a user I want to filter results by multiple criteria.' },
    criteria: [],
    split: false,
  },
  {
    title: { es: 'Panel de administración', en: 'Admin Panel' },
    desc: { es: 'Como admin quiero gestionar usuarios desde un panel.', en: 'As an admin I want to manage users from a panel.' },
    criteria: [],
    split: false,
  },
  {
    title: { es: 'Modo oscuro', en: 'Dark Mode' },
    desc: { es: 'Como usuario quiero cambiar entre modo claro y oscuro.', en: 'As a user I want to toggle between light and dark mode.' },
    criteria: [],
    split: false,
  },
  {
    title: { es: 'Importación masiva de datos', en: 'Bulk Data Import' },
    desc: { es: 'Como usuario quiero importar datos desde un archivo CSV.', en: 'As a user I want to import data from a CSV file.' },
    criteria: [],
    split: false,
  },
]

const REFINEMENT_ACTIONS = [
  { label: { es: 'Agregar criterio de aceptación', en: 'Add acceptance criterion' }, result: 'criterio' },
  { label: { es: 'Dividir en historias más pequeñas', en: 'Split into smaller stories' }, result: 'split' },
  { label: { es: 'Estimar (3 pts)', en: 'Estimate (3 pts)' }, result: 'estimate' },
]

const RETRO_CATEGORIES = [
  {
    label: { es: 'Start (Empezar)', en: 'Start' },
    icon: '🚀',
    color: 'text-accent-emerald',
    items: [
      { author: 'Sofia', text: { es: 'Hacer pair programming más seguido', en: 'Do pair programming more often' } },
      { author: 'Carlos', text: { es: 'Documentar decisiones técnicas', en: 'Document technical decisions' } },
      { author: 'Martín', text: { es: 'Tener refinements más frecuentes', en: 'Have more frequent refinements' } },
    ],
  },
  {
    label: { es: 'Stop (Dejar de hacer)', en: 'Stop' },
    icon: '✋',
    color: 'text-accent-rose',
    items: [
      { author: 'Ana', text: { es: 'Aprobar PRs sin revisarlos bien', en: 'Approving PRs without thorough review' } },
      { author: 'Laura', text: { es: 'Agregar features fuera del alcance', en: 'Adding features outside the scope' } },
      { author: 'Tomás', text: { es: 'Trabajar sin hacer commits por días', en: 'Working without committing for days' } },
    ],
  },
  {
    label: { es: 'Continue (Seguir haciendo)', en: 'Continue' },
    icon: '👍',
    color: 'text-accent-blue',
    items: [
      { author: 'Sofia', text: { es: 'Las dailies son ágiles y productivas', en: 'Dailies are agile and productive' } },
      { author: 'Carlos', text: { es: 'El feedback en code reviews es constructivo', en: 'Feedback in code reviews is constructive' } },
      { author: 'Ana', text: { es: 'La colaboración entre devs y QA', en: 'Collaboration between devs and QA' } },
    ],
  },
]

const CEREMONY_START_TEXTS = {
  daily: { es: '📋 Daily Scrum — Sprint', en: '📋 Daily Scrum — Sprint' },
  planning: { es: '📋 Sprint Planning — Estimación de historias', en: '📋 Sprint Planning — Story estimation' },
  refinement: { es: '🔧 Backlog Refinement — Preparando historias', en: '🔧 Backlog Refinement — Preparing stories' },
  retro: { es: '🔄 Sprint Retrospective — Reflexionando sobre el sprint', en: '🔄 Sprint Retrospective — Reflecting on the sprint' },
}

function formatPoints(val, lang) {
  if (lang === 'es') {
    if (val === 1) return '1 punto'
    return `${val} puntos`
  }
  if (val === 1) return '1 point'
  return `${val} points`
}

export default function CeremonySimulator() {
  const { lang } = useLanguage()
  const [ceremony, setCeremony] = useState('daily')
  const [started, setStarted] = useState(false)
  const [history, setHistory] = useState([])

  const [dailyStep, setDailyStep] = useState(0)
  const [planningStep, setPlanningStep] = useState(0)
  const [refinementStep, setRefinementStep] = useState(0)
  const [refinementIdx, setRefinementIdx] = useState(0)
  const [refinementItems, setRefinementItems] = useState(REFINEMENT_ITEMS.map(i => ({ ...i, criteria: [...i.criteria], points: null })))
  const [retroStep, setRetroStep] = useState(0)
  const [retroCategory, setRetroCategory] = useState(0)
  const [retroItem, setRetroItem] = useState(0)

  const config = CEREMONIES[ceremony]

  const reset = useCallback(() => {
    setStarted(false)
    setHistory([])
    setDailyStep(0)
    setPlanningStep(0)
    setRefinementStep(0)
    setRefinementIdx(0)
    setRefinementItems(REFINEMENT_ITEMS.map(i => ({ ...i, criteria: [...i.criteria], points: null })))
    setRetroStep(0)
    setRetroCategory(0)
    setRetroItem(0)
  }, [])

  const switchCeremony = (id) => {
    reset()
    setCeremony(id)
  }

  const advanceDaily = useCallback(() => {
    if (!started) {
      setStarted(true)
      setDailyStep(0)
      setHistory([{ type: 'start', text: `${CEREMONY_START_TEXTS.daily[lang]} ${Math.floor(Math.random() * 10) + 1}` }])
      return
    }

    if (dailyStep < TEAM.length) {
      const member = TEAM[dailyStep]
      const updates = UPDATES[member.name]
      const updateText = updates[Math.floor(Math.random() * updates.length)][lang]
      const hasBlocker = updateText.toLowerCase().includes('blocker')

      setHistory(prev => [...prev, {
        type: 'update',
        name: member.name,
        role: member.role[lang],
        emoji: member.emoji,
        text: updateText,
        hasBlocker,
      }])
      setDailyStep(dailyStep + 1)
    }
  }, [started, dailyStep, lang])

  const advancePlanning = useCallback(() => {
    if (!started) {
      setStarted(true)
      setPlanningStep(0)
      setHistory([{ type: 'start', text: CEREMONY_START_TEXTS.planning[lang] }])
      return
    }

    if (planningStep < PLANNING_STORIES.length) {
      const story = PLANNING_STORIES[planningStep]
      const avg = Math.round(story.teamVotes.reduce((a, b) => a + b, 0) / story.teamVotes.length)
      const discussion = PLANNING_DISCUSSIONS[planningStep][lang]

      setHistory(prev => [...prev, {
        type: 'planning',
        title: story.title,
        votes: story.teamVotes,
        average: avg,
        discussion,
      }])
      setPlanningStep(planningStep + 1)
    }
  }, [started, planningStep, lang])

  const advanceRefinement = useCallback(() => {
    if (!started) {
      setStarted(true)
      setRefinementStep(0)
      setRefinementIdx(0)
      setHistory([{ type: 'start', text: CEREMONY_START_TEXTS.refinement[lang] }])
      return
    }

    const idx = refinementIdx
    if (idx < refinementItems.length) {
      const actionIdx = refinementStep % REFINEMENT_ACTIONS.length
      const action = REFINEMENT_ACTIONS[actionIdx]

      const updated = [...refinementItems]
      const item = { ...updated[idx] }

      if (action.result === 'criterio') {
        const criteria = [...(item.criteria || []), `Criterio #${(item.criteria?.length || 0) + 1}: Validar que funciona correctamente`]
        item.criteria = criteria
      } else if (action.result === 'split') {
        item.split = true
      } else if (action.result === 'estimate') {
        item.points = item.points || 3
      }

      updated[idx] = item
      setRefinementItems(updated)

      setHistory(prev => [...prev, {
        type: 'refinement',
        title: item.title,
        action: action.result,
        actionLabel: action.label,
      }])

      const nextStep = refinementStep + 1
      if (nextStep >= REFINEMENT_ACTIONS.length) {
        setRefinementStep(0)
        setRefinementIdx(idx + 1)
      } else {
        setRefinementStep(nextStep)
      }
    }
  }, [started, refinementStep, refinementIdx, refinementItems, lang])

  const advanceRetro = useCallback(() => {
    if (!started) {
      setStarted(true)
      setRetroStep(0)
      setRetroCategory(0)
      setRetroItem(0)
      setHistory([{ type: 'start', text: CEREMONY_START_TEXTS.retro[lang] }])
      return
    }

    const cat = RETRO_CATEGORIES[retroCategory]
    if (retroItem < cat.items.length) {
      const item = cat.items[retroItem]
      setHistory(prev => [...prev, {
        type: 'retro',
        category: cat.label,
        icon: cat.icon,
        author: item.author,
        text: item.text,
      }])
      setRetroItem(retroItem + 1)
    } else {
      const nextCat = retroCategory + 1
      if (nextCat < RETRO_CATEGORIES.length) {
        setRetroCategory(nextCat)
        setRetroItem(0)
      }
    }
  }, [started, retroCategory, retroItem, lang])

  const advance = useCallback(() => {
    if (ceremony === 'daily') advanceDaily()
    else if (ceremony === 'planning') advancePlanning()
    else if (ceremony === 'refinement') advanceRefinement()
    else if (ceremony === 'retro') advanceRetro()
  }, [ceremony, advanceDaily, advancePlanning, advanceRefinement, advanceRetro])

  const isComplete = (() => {
    if (ceremony === 'daily') return started && dailyStep >= TEAM.length
    if (ceremony === 'planning') return started && planningStep >= PLANNING_STORIES.length
    if (ceremony === 'refinement') return started && refinementIdx >= refinementItems.length
    if (ceremony === 'retro') return started && retroCategory >= RETRO_CATEGORIES.length
    return false
  })()

  const currentStep = (() => {
    if (ceremony === 'daily') return dailyStep
    if (ceremony === 'planning') return planningStep
    if (ceremony === 'refinement') return refinementIdx
    if (ceremony === 'retro') return retroCategory
    return 0
  })()

  const totalSteps = (() => {
    if (ceremony === 'daily') return TEAM.length
    if (ceremony === 'planning') return PLANNING_STORIES.length
    if (ceremony === 'refinement') return refinementItems.length
    if (ceremony === 'retro') return RETRO_CATEGORIES.length
    return 0
  })()

  return (
    <section id="ceremonias" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/3 via-transparent to-transparent" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-4">
            {lang === 'es' ? 'Módulo 2 — Interactivo' : 'Module 2 — Interactive'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{lang === 'es' ? 'Ceremonias Scrum' : 'Scrum Ceremonies'}</h2>
          <p className="text-gray-400">{lang === 'es' ? 'Simulá las ceremonias más importantes de Scrum' : 'Simulate the most important Scrum ceremonies'}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {Object.values(CEREMONIES).map(c => (
            <button
              key={c.id}
              onClick={() => switchCeremony(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                ceremony === c.id
                  ? `bg-${c.badgeColor}/20 text-${c.badgeColor} border border-${c.badgeColor}/30`
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <span>{c.icon}</span>
              {c.title[lang]}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={ceremony}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          {!started ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">{config.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{config.title[lang]}</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                {config.desc[lang]}
              </p>
              <button
                onClick={advance}
                className={`px-6 py-3 rounded-xl text-sm font-medium bg-${config.badgeColor}/20 text-${config.badgeColor} hover:bg-${config.badgeColor}/30 border border-${config.badgeColor}/30 transition-all`}
              >
                {lang === 'es' ? `Iniciar ${config.title[lang]}` : `Start ${config.title[lang]}`} →
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-mono text-gray-500">
                  {config.title[lang]} · {lang === 'es' ? `Paso ${started ? Math.min(currentStep + 1, totalSteps) : 0} de ${totalSteps}` : `Step ${started ? Math.min(currentStep + 1, totalSteps) : 0} of ${totalSteps}`}
                </h3>
                <button
                  onClick={reset}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {config.newLabel[lang]}
                </button>
              </div>

              {ceremony === 'daily' && !isComplete && dailyStep < TEAM.length && (
                <motion.div
                  key={dailyStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
                    {TEAM[dailyStep].emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{TEAM[dailyStep].name}</span>
                      <span className={`text-xs font-mono ${TEAM[dailyStep].color}`}>
                        {TEAM[dailyStep].role[lang]}
                      </span>
                    </div>
                    {history.length > dailyStep && (
                      <p className="text-sm text-gray-300 mt-1">{history[dailyStep].text}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {ceremony === 'planning' && !isComplete && planningStep < PLANNING_STORIES.length && (
                <motion.div
                  key={planningStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="bg-white/5 rounded-xl p-5 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">📖</span>
                      <span className="text-xs font-mono text-accent-purple">{lang === 'es' ? 'Historia de usuario' : 'User story'}</span>
                    </div>
                    <h4 className="font-semibold mb-2">{PLANNING_STORIES[planningStep].title[lang]}</h4>
                    <p className="text-sm text-gray-400 mb-4">{PLANNING_STORIES[planningStep].desc[lang]}</p>

                    <div className="bg-white/5 rounded-lg p-4 mb-3">
                      <p className="text-xs text-gray-500 mb-2">{lang === 'es' ? '🗣️ Discusión del equipo:' : '🗣️ Team discussion:'}</p>
                      <p className="text-sm text-gray-300 italic">"{PLANNING_DISCUSSIONS[planningStep][lang]}"</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-xs text-gray-500">{lang === 'es' ? 'Votos del equipo:' : 'Team votes:'}</span>
                      <div className="flex gap-1">
                        {PLANNING_STORIES[planningStep].teamVotes.map((v, i) => {
                          const colors = ['accent-purple', 'accent-blue', 'accent-emerald', 'accent-amber', 'accent-rose', 'accent-blue']
                          return (
                            <span
                              key={i}
                              className={`w-8 h-8 rounded-lg bg-${colors[i]}/10 text-${colors[i]} text-xs font-mono flex items-center justify-center`}
                            >
                              {v}
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    <AnimatePresence>
                      {planningStep < history.length && history[planningStep]?.type === 'planning' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="overflow-hidden"
                        >
                          <div className={`p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald text-sm font-semibold text-center`}>
                            {lang === 'es' ? 'Estimación final:' : 'Final estimate:'} {formatPoints(history[planningStep].average, lang)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {ceremony === 'refinement' && !isComplete && refinementIdx < refinementItems.length && (
                <motion.div
                  key={`${refinementIdx}-${refinementStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="bg-white/5 rounded-xl p-5 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">📦</span>
                      <span className="text-xs font-mono text-accent-amber">{lang === 'es' ? 'Backlog Item' : 'Backlog Item'}</span>
                    </div>
                    <h4 className="font-semibold mb-2">{refinementItems[refinementIdx].title[lang]}</h4>
                    <p className="text-sm text-gray-400 mb-4">{refinementItems[refinementIdx].desc[lang]}</p>

                    <div className="space-y-2 mb-4">
                      {refinementItems[refinementIdx].criteria?.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1.5">{lang === 'es' ? '✅ Criterios de aceptación:' : '✅ Acceptance criteria:'}</p>
                          <div className="space-y-1">
                            {refinementItems[refinementIdx].criteria.map((c, i) => (
                              <p key={i} className="text-xs text-accent-emerald flex items-start gap-1.5">
                                <span>•</span>
                                {c}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                      {refinementItems[refinementIdx].split && (
                        <p className="text-xs text-accent-amber">{lang === 'es' ? '✂️ Dividido en historias más pequeñas' : '✂️ Split into smaller stories'}</p>
                      )}
                      {refinementItems[refinementIdx].points && (
                        <p className="text-xs text-accent-blue">{lang === 'es' ? '📊 Estimado en' : '📊 Estimated at'} {formatPoints(refinementItems[refinementIdx].points, lang)}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {REFINEMENT_ACTIONS.map((action, i) => {
                        const done = history.filter(
                          h => h.type === 'refinement' && h.title === refinementItems[refinementIdx].title
                        )
                        const alreadyDone = done.some(d => d.action === action.result)

                        return (
                          <span
                            key={i}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              alreadyDone
                                ? 'bg-accent-emerald/10 text-accent-emerald line-through opacity-50'
                                : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            {action.label[lang]}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {ceremony === 'retro' && !isComplete && retroCategory < RETRO_CATEGORIES.length && (
                <motion.div
                  key={`${retroCategory}-${retroItem}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="bg-white/5 rounded-xl p-5 mb-4">
                    <div className={`text-lg mb-2 ${RETRO_CATEGORIES[retroCategory].color}`}>
                      {RETRO_CATEGORIES[retroCategory].icon} {RETRO_CATEGORIES[retroCategory].label[lang]}
                    </div>

                    {retroItem < RETRO_CATEGORIES[retroCategory].items.length && (
                      <motion.div
                        key={retroItem}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span>{TEAM.find(t => t.name === RETRO_CATEGORIES[retroCategory].items[retroItem].author)?.emoji || '👤'}</span>
                          <span className="text-sm font-semibold">{RETRO_CATEGORIES[retroCategory].items[retroItem].author}</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          "{RETRO_CATEGORIES[retroCategory].items[retroItem].text[lang]}"
                        </p>
                      </motion.div>
                    )}

                    {retroItem >= RETRO_CATEGORIES[retroCategory].items.length && (
                      <p className="text-sm text-gray-500 italic">{lang === 'es' ? 'Todos los puntos de esta categoría fueron vistos.' : 'All items in this category have been reviewed.'}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {!isComplete && (
                <button
                  onClick={advance}
                  className={`w-full py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all`}
                >
                  {config.ctaText[lang]}
                </button>
              )}

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-3">✅</div>
                  <h4 className="text-lg font-semibold text-accent-emerald mb-2">{config.completeTitle[lang]}</h4>
                  <p className="text-gray-400 text-sm mb-6">{config.completeText[lang]}</p>
                  <button
                    onClick={reset}
                    className={`px-6 py-2.5 rounded-xl text-sm font-medium bg-accent-emerald/20 text-accent-emerald hover:bg-accent-emerald/30 border border-accent-emerald/30 transition-all`}
                  >
                    {config.newLabel[lang]}
                  </button>
                </motion.div>
              )}

              {history.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    {lang === 'es' ? 'Historial' : 'History'}
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {history.map((entry, i) => {
                      if (entry.type === 'start') {
                        return (
                          <div key={i} className="text-xs p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
                            {entry.text}
                          </div>
                        )
                      }
                      if (entry.type === 'update') {
                        return (
                          <div
                            key={i}
                            className={`text-xs p-2 rounded-lg ${
                              entry.hasBlocker ? 'bg-accent-rose/10 text-accent-rose' : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            {entry.emoji} {entry.name} ({entry.role}): {entry.text}
                          </div>
                        )
                      }
                      if (entry.type === 'planning') {
                        return (
                          <div key={i} className="text-xs p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
                            📖 {entry.title[lang]} → {lang === 'es' ? 'Estimado en' : 'Estimated at'} <strong>{formatPoints(entry.average, lang)}</strong>
                          </div>
                        )
                      }
                      if (entry.type === 'refinement') {
                        return (
                          <div key={i} className="text-xs p-2 rounded-lg bg-accent-amber/10 text-accent-amber">
                            📦 {entry.title[lang]}: {entry.actionLabel[lang]}
                          </div>
                        )
                      }
                      if (entry.type === 'retro') {
                        return (
                          <div key={i} className="text-xs p-2 rounded-lg bg-accent-rose/10 text-accent-rose">
                            {entry.icon} {entry.author}: "{entry.text[lang]}"
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
