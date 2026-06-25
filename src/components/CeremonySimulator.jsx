import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const EVENTS = [
  {
    id: 'planning',
    icon: '📋',
    title: { es: 'Sprint Planning', en: 'Sprint Planning' },
    desc: {
      es: 'El equipo se reúne al inicio de cada sprint para definir qué se va a construir. El PO presenta las historias priorizadas del backlog y el equipo estima el esfuerzo. El resultado es el Sprint Backlog: el compromiso del equipo para el sprint.',
      en: 'The team meets at the start of each sprint to define what will be built. The PO presents prioritized backlog stories and the team estimates effort. The result is the Sprint Backlog: the team\'s commitment for the sprint.',
    },
    junior: {
      es: 'Como Junior, escuchás activamente, preguntás si una historia no está clara, y participás en la estimación. No tengas miedo de decir que una tarea te parece más grande de lo que parece.',
      en: 'As a Junior, you listen actively, ask if a story is unclear, and participate in estimation. Don\'t be afraid to say a task seems bigger than it looks.',
    },
    color: 'accent-purple',
  },
  {
    id: 'daily',
    icon: '👥',
    title: { es: 'Daily Standup', en: 'Daily Standup' },
    desc: {
      es: 'Reunión de 15 minutos todas las mañanas. Cada miembro responde tres preguntas: ¿Qué hice ayer? ¿Qué voy a hacer hoy? ¿Tengo algún bloqueo? No es un reporte al jefe — es una sincronización entre pares.',
      en: '15-minute meeting every morning. Each member answers three questions: What did I do yesterday? What will I do today? Do I have any blockers? It\'s not a report to the boss — it\'s a peer-to-peer sync.',
    },
    junior: {
      es: 'Sé breve y concreto. Si estás bloqueado, decilo claramente. Si no tenes nada que decir, decí "estoy continuando con lo mismo". No inventes cosas para sonar productivo.',
      en: 'Be brief and concrete. If you\'re blocked, say it clearly. If you have nothing new to say, say "continuing with the same task". Don\'t make things up to sound productive.',
    },
    color: 'accent-blue',
  },
  {
    id: 'review',
    icon: '🎯',
    title: { es: 'Sprint Review / Demo', en: 'Sprint Review / Demo' },
    desc: {
      es: 'Al final del sprint, el equipo muestra al cliente y stakeholders lo que construyó. No es una presentación formal — es una demostración en vivo del producto funcionando. Se recibe feedback que puede ir al backlog.',
      en: 'At the end of the sprint, the team shows the client and stakeholders what they built. It\'s not a formal presentation — it\'s a live demo of the working product. Feedback is collected for the backlog.',
    },
    junior: {
      es: 'Si tenés algo que mostrar, animate a hacerlo. No necesitas que sea perfecto. Mostrá lo que funciona y si algo no salió, decilo con honestidad. El cliente valora más ver progreso real que una demo perfecta.',
      en: 'If you have something to show, go for it. It doesn\'t need to be perfect. Show what works and if something didn\'t work out, be honest. The client values real progress more than a perfect demo.',
    },
    color: 'accent-emerald',
  },
  {
    id: 'retro',
    icon: '🔄',
    title: { es: 'Retrospectiva', en: 'Retrospective' },
    desc: {
      es: 'La reunión más importante del sprint. El equipo reflexiona sobre qué salió bien, qué se puede mejorar, y define acciones concretas para el próximo sprint. Sin señalar culpables — el objetivo es mejorar el proceso, no criticar personas.',
      en: 'The most important meeting of the sprint. The team reflects on what went well, what can be improved, and defines concrete actions for the next sprint. No blaming — the goal is to improve the process, not criticize people.',
    },
    junior: {
      es: 'Participá activamente. Tu perspectiva como Junior es valiosa: si algo no se entendió, si el onboarding fue difícil, si necesitás más ayuda. Las retrospectivas existen para que el equipo mejore, y tu opinión es parte de eso.',
      en: 'Participate actively. Your perspective as a Junior is valuable: if something wasn\'t clear, if onboarding was hard, if you need more help. Retrospectives exist for the team to improve, and your opinion is part of that.',
    },
    color: 'accent-rose',
  },
]

const ROLES = [
  {
    emoji: '🎯',
    name: { es: 'Product Owner', en: 'Product Owner' },
    desc: {
      es: 'Dueño del producto. Define qué construir y en qué orden. Prioriza el backlog basado en valor de negocio. Es la voz del cliente dentro del equipo.',
      en: 'Product owner. Defines what to build and in what order. Prioritizes the backlog based on business value. Is the voice of the client within the team.',
    },
    color: 'accent-amber',
  },
  {
    emoji: '🛡️',
    name: { es: 'Scrum Master', en: 'Scrum Master' },
    desc: {
      es: 'Facilitador del equipo. Se asegura de que Scrum se entienda y se aplique bien. Elimina impedimentos, protege al equipo de distracciones y fomenta la mejora continua.',
      en: 'Team facilitator. Ensures Scrum is understood and applied correctly. Removes impediments, protects the team from distractions, and fosters continuous improvement.',
    },
    color: 'accent-emerald',
  },
  {
    emoji: '👨‍💻',
    name: { es: 'Development Team', en: 'Development Team' },
    desc: {
      es: 'Quienes construyen el producto. Devs, designers, QA. Son auto-organizados: deciden cómo hacer el trabajo. No hay "yo" en el equipo — el Sprint Backlog es de todos.',
      en: 'Those who build the product. Devs, designers, QA. They are self-organized: they decide how to do the work. There is no "I" in the team — the Sprint Backlog belongs to everyone.',
    },
    color: 'accent-blue',
  },
]

export default function CeremonySimulator() {
  const { lang } = useLanguage()

  return (
    <section id="ceremonias" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/3 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-4">
            {{ es: 'Metodología Ágil', en: 'Agile Methodology' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{{ es: 'Scrum', en: 'Scrum' }[lang]}</h2>
          <p className="text-text-secondary">
            {{ es: 'Enfoque iterativo basado en Sprints — ciclos de 2 a 4 semanas con entregas continuas', en: 'Iterative approach based on Sprints — 2 to 4 week cycles with continuous delivery' }[lang]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏃</span>
              <h3 className="text-lg font-bold">
                {{ es: '¿Qué es en cristiano?', en: 'What is it in plain English?' }[lang]}
              </h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {lang === 'es' ? (
                <>En vez de planificar todo el proyecto de una vez y ejecutarlo en meses (como Waterfall), Scrum divide el trabajo en ciclos cortos llamados <strong>Sprints</strong> (generalmente de 2 semanas). Al final de cada Sprint, tenés una versión del producto que funciona y se puede mostrar al cliente. Recibís feedback rápido, ajustás, y repetís. Es como cocinar: no preparás el menú de todo el año de una vez — cocinás plato por plato, probás, y corregís la receta para el próximo.</>
              ) : (
                <>Instead of planning the entire project at once and executing it over months (like Waterfall), Scrum divides the work into short cycles called <strong>Sprints</strong> (usually 2 weeks). At the end of each Sprint, you have a working version of the product to show the client. You get fast feedback, adjust, and repeat. It\'s like cooking: you don\'t plan the whole year\'s menu at once — you cook dish by dish, taste, and adjust the recipe for the next one.</>
              )}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📅</span>
              <h3 className="text-lg font-bold">
                {{ es: 'Los Eventos Clave (Rituales)', en: 'Key Events (Ceremonies)' }[lang]}
              </h3>
            </div>
            <div className="space-y-4">
              {EVENTS.map(e => (
                <div key={e.id} className={`bg-${e.color}/5 rounded-xl p-4 border border-${e.color}/10`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span>{e.icon}</span>
                    <h4 className={`text-sm font-semibold text-${e.color}`}>{e.title[lang]}</h4>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{e.desc[lang]}</p>
                  <div className="bg-surface-card rounded-lg p-3">
                    <span className="text-xs font-semibold text-text-muted block mb-1">
                      🧑‍💻 {{ es: 'Junior tip:', en: 'Junior tip:' }[lang]}
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed">{e.junior[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">👤</span>
              <h3 className="text-lg font-bold">
                {{ es: 'Los Roles Básicos', en: 'Basic Roles' }[lang]}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ROLES.map(r => (
                <div key={r.name.en} className={`bg-${r.color}/5 rounded-xl p-4 border border-${r.color}/10`}>
                  <div className="text-2xl mb-2">{r.emoji}</div>
                  <h4 className={`text-sm font-semibold text-${r.color} mb-2`}>{r.name[lang]}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{r.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent-purple/5 rounded-2xl p-6 md:p-8 border border-accent-purple/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">💡</span>
              <div>
                <h4 className="text-sm font-semibold text-accent-purple mb-2">
                  {{ es: 'Pro-Tip de Entrevista', en: 'Interview Pro-Tip' }[lang]}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {lang === 'es' ? (
                    <>Si te preguntan por Scrum, no te limites a enumerar los roles y eventos. Decí: <strong className="text-white">"Scrum es un framework ágil que aporta transparencia al proceso de desarrollo. Su fortaleza está en los feedback loops cortos: retrospectivas para mejorar el proceso, reviews para validar con el cliente, y dailies para sincronizar al equipo. Como Junior, valoro que las dailies me permiten pedir ayuda rápido sin sentir que estoy molestando."</strong> Eso muestra que entendiste el propósito, no solo la mecánica.</>
                  ) : (
                    <>If asked about Scrum, don\'t just list the roles and events. Say: <strong className="text-white">"Scrum is an agile framework that brings transparency to the development process. Its strength lies in short feedback loops: retrospectives to improve the process, reviews to validate with the client, and dailies to sync the team. As a Junior, I value that dailies let me ask for help quickly without feeling like I\'m bothering anyone."</strong> This shows you understand the purpose, not just the mechanics.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
