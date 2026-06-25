import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const STEPS = [
  {
    id: 'hr',
    icon: '📋',
    title: {
      es: 'El Filtro de RRHH (Talent Acquisition)',
      en: 'The HR Filter (Talent Acquisition)',
    },
    objective: {
      es: 'Que el recruiter entienda quién sos, qué buscás y si encajás en lo que la empresa necesita. No es técnica, es de preselección.',
      en: 'The recruiter needs to understand who you are, what you\'re looking for, and if you fit what the company needs. It\'s not technical — it\'s a pre-screening.',
    },
    items: [
      {
        label: { es: '¿Qué evalúan?', en: 'What do they evaluate?' },
        points: [
          { es: 'Fit cultural: tus valores, cómo trabajás en equipo, qué esperás del día a día', en: 'Cultural fit: your values, how you work in a team, what you expect from day-to-day' },
          { es: 'Sueldo: tu pretensión salarial y si está dentro del rango del presupuesto', en: 'Salary: your salary expectation and whether it\'s within the budget range' },
          { es: 'Disponibilidad: cuándo podés empezar, si estás en otros procesos', en: 'Availability: when you can start, if you\'re in other processes' },
        ],
      },
      {
        label: { es: 'El Filtro de Inglés', en: 'The English Filter' },
        points: [
          { es: 'Suele ser una charla de 15-20 min con un evaluador externo o el mismo recruiter', en: 'Usually a 15-20 min chat with an external evaluator or the recruiter themselves' },
          { es: 'Es conversacional, no técnico. Te preguntan sobre tu experiencia, hobbies, por qué querés el laburo', en: 'It\'s conversational, not technical. They ask about your experience, hobbies, why you want the job' },
          { es: 'Preparate: practicá respuestas cortas sobre tu stack, un proyecto que te guste, y tu experiencia en inglés', en: 'Prepare: practice short answers about your stack, a project you like, and your experience in English' },
          { es: 'No necesito hablar perfecto. Necesito que se te entienda y puedas mantener una conversación', en: 'You don\'t need to speak perfectly. They just need to understand you and you need to hold a conversation' },
        ],
      },
    ],
    tip: {
      es: 'Investiga la empresa antes: LinkedIn, Instagram, Glassdoor. Cuando te pregunten "¿por qué esta empresa?", tené una razón genuina. Eso marca la diferencia.',
      en: 'Research the company beforehand: LinkedIn, Instagram, Glassdoor. When they ask "why this company?", have a genuine reason. That makes all the difference.',
    },
  },
  {
    id: 'technical',
    icon: '💻',
    title: {
      es: 'La Instancia Técnica',
      en: 'The Technical Stage',
    },
    objective: {
      es: 'Demostrar que podés resolver problemas y pensás como dev. No esperan que sepas todo, esperan que sepas pensar.',
      en: 'Show that you can solve problems and think like a developer. They don\'t expect you to know everything — they expect you to know how to think.',
    },
    items: [
      {
        label: { es: 'Preguntas teóricas y situacionales', en: 'Theoretical & Situational Questions' },
        points: [
          { es: 'Te pueden preguntar conceptos base: diferencia entre let/var/const, cómo funciona el event loop, qué es una promesa', en: 'They might ask basic concepts: difference between let/var/const, how the event loop works, what\'s a promise' },
          { es: 'Situacionales: "¿Qué harías si te asignan una tarea que no sabés resolver?" — quieren ver cómo pensás, no que tengas la respuesta exacta', en: 'Situational: "What would you do if you\'re assigned a task you don\'t know how to solve?" — they want to see how you think, not the exact answer' },
        ],
      },
      {
        label: { es: 'Resolución de errores / Arquitectura básica', en: 'Bug Fixing / Basic Architecture' },
        points: [
          { es: 'Te muestran un código con bugs y tenés que encontrar qué está mal. Leé con calma, hacé tracing mental', en: 'They show you buggy code and you need to find what\'s wrong. Read calmly, do mental tracing' },
          { es: 'Arquitectura: "Diseñá un carrito de compras" — no necesitás microservicios, necesitás pensar en entidades, endpoints, y flujo de datos', en: 'Architecture: "Design a shopping cart" — you don\'t need microservices, you need to think about entities, endpoints, and data flow' },
        ],
      },
      {
        label: { es: 'Desafíos técnicos', en: 'Technical Challenges' },
        points: [
          { es: 'Live coding: resolvés un ejercicio en tiempo real mientras el entrevistador mira. Lo importante es que pienses en voz alta', en: 'Live coding: you solve an exercise in real-time while the interviewer watches. The key is to think out loud' },
          { es: 'Take-home task: te dan un proyectito para hacer en tu casa (24-72h). Priorizá que funcione, después la calidad', en: 'Take-home task: they give you a small project to do at home (24-72h). Prioritize making it work, then code quality' },
          { es: 'En ambos casos: preguntá todas las dudas antes de empezar. No asumas nada', en: 'In both cases: ask all your questions before starting. Don\'t assume anything' },
        ],
      },
    ],
    tip: {
      es: 'No finjas que sabés algo que no sabés. Decí "esto no lo manejo, pero lo resolvería investigando X". La honestidad + actitud de aprendizaje es lo que buscan en un Junior.',
      en: 'Don\'t pretend to know something you don\'t. Say "I\'m not familiar with that, but I\'d solve it by researching X". Honesty + learning attitude is what they look for in a Junior.',
    },
  },
  {
    id: 'final',
    icon: '🤝',
    title: {
      es: 'Entrevistas Finales (Cliente / Manager)',
      en: 'Final Interviews (Client / Manager)',
    },
    objective: {
      es: 'Validar que seas alguien con quien quieran trabajar todos los días. Buscan fit con el equipo y que entiendas cómo laburan (metodologías, ritmo, expectativas).',
      en: 'Validate that you\'re someone they want to work with every day. They\'re looking for team fit and that you understand how they work (methodologies, pace, expectations).',
    },
    items: [
      {
        label: { es: '¿Qué esperar?', en: 'What to expect?' },
        points: [
          { es: 'Suelen ser con el Tech Lead, el PM o el cliente directo (si es consultora)', en: 'Usually with the Tech Lead, PM, or the direct client (if it\'s a consultancy)' },
          { es: 'Te cuentan cómo trabaja el equipo: metodologías, herramientas, horarios, dinámica', en: 'They tell you how the team works: methodologies, tools, schedules, dynamics' },
          { es: 'Te preguntan sobre experiencias pasadas, cómo manejás el feedback, el error, los deadlines', en: 'They ask about past experiences, how you handle feedback, mistakes, deadlines' },
          { es: 'Es una conversación, no un examen. También es tu momento para ver si a VOS te gusta el equipo', en: 'It\'s a conversation, not an exam. It\'s also your chance to see if YOU like the team' },
        ],
      },
    ],
    tip: {
      es: 'Prepará 2 o 3 preguntas para hacerles: "¿Cómo es un día típico?", "¿Cómo dan y reciben feedback?", "¿Qué expectativas tienen para este rol?". Demostrá interés genuino.',
      en: 'Prepare 2-3 questions to ask them: "What\'s a typical day like?", "How do you give and receive feedback?", "What expectations do you have for this role?". Show genuine interest.',
    },
  },
]

export default function InterviewProcess() {
  const { lang } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="entrevistas" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/3 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-4">
            {{ es: 'Bonus', en: 'Bonus' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {{ es: 'Proceso de Entrevistas', en: 'Interview Process' }[lang]}
          </h2>
          <p className="text-text-secondary">
            {{ es: 'Todo lo que necesitás saber para pasar cada etapa y conseguir tu primer trabajo IT', en: 'Everything you need to know to pass each stage and land your first IT job' }[lang]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex gap-2 mb-8">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(i)}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  i === activeStep
                    ? 'bg-accent-purple'
                    : i < activeStep
                      ? 'bg-accent-purple/30'
                      : 'bg-surface-card'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{STEPS[activeStep].icon}</span>
                <h3 className="text-lg font-bold">{STEPS[activeStep].title[lang]}</h3>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-sm text-text-secondary leading-relaxed bg-surface-card rounded-xl p-4">
                  {STEPS[activeStep].objective[lang]}
                </p>

                {STEPS[activeStep].items.map((item, i) => (
                  <div key={i} className="bg-surface-card rounded-xl p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-3">
                      {item.label[lang]}
                    </h4>
                    <ul className="space-y-2">
                      {item.points.map((p, j) => (
                        <li key={j} className="text-sm text-text-secondary flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent-purple mt-2 shrink-0" />
                          {p[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-accent-purple/5 rounded-xl p-4 border border-accent-purple/10">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0">💡</span>
                  <div>
                    <h5 className="text-xs font-semibold text-accent-purple mb-1">
                      {{ es: 'Pro Tip de Supervivencia', en: 'Survival Pro Tip' }[lang]}
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {STEPS[activeStep].tip[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeStep === 0
                  ? 'text-text-disabled cursor-not-allowed'
                  : 'bg-surface-card text-text-secondary hover:bg-surface-hover'
              }`}
            >
              ← {{ es: 'Anterior', en: 'Back' }[lang]}
            </button>
            <div className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeStep ? 'bg-accent-purple w-6' : 'bg-surface-hover hover:bg-surface-hover'
                  }`}
                />
              ))}
            </div>
            {activeStep < STEPS.length - 1 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30 border border-accent-purple/30 transition-all"
              >
                {{ es: 'Siguiente →', en: 'Next →' }[lang]}
              </button>
            ) : (
              <button
                onClick={() => setActiveStep(0)}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30 border border-accent-purple/30 transition-all"
              >
                {{ es: 'Volver a empezar', en: 'Start over' }[lang]}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
