import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const PRACTICES = [
  {
    id: 'visualize',
    icon: '👁️',
    title: { es: 'Visualizar el Flujo', en: 'Visualize the Flow' },
    desc: {
      es: 'Mapeá todo el workflow del equipo en un tablero físico o digital. Cada columna representa un estado del trabajo. El objetivo es que cualquier persona pueda ver el estado del proyecto de un vistazo.',
      en: 'Map the entire team workflow on a physical or digital board. Each column represents a state of work. The goal is for anyone to see the project status at a glance.',
    },
    ejemplo: {
      es: 'Columnas típicas: To Do → In Progress → Review → Done. Cada ticket se mueve de izquierda a derecha.',
      en: 'Typical columns: To Do → In Progress → Review → Done. Each ticket moves left to right.',
    },
    consejo: {
      es: 'Empezá con pocas columnas y agregá más cuando el equipo las necesite. El tablero debe reflejar la realidad, no al revés.',
      en: 'Start with few columns and add more when the team needs them. The board should reflect reality, not the other way around.',
    },
  },
  {
    id: 'wip',
    icon: '🚦',
    title: { es: 'Limitar el WIP', en: 'Limit WIP' },
    desc: {
      es: 'Establecé un límite máximo de tickets que pueden estar en cada columna simultáneamente. Esto evita la multitarea, reduce el tiempo de ciclo y expone los cuellos de botella.',
      en: 'Set a maximum limit of tickets that can be in each column simultaneously. This prevents multitasking, reduces cycle time, and exposes bottlenecks.',
    },
    ejemplo: {
      es: 'Si el límite de "In Progress" es 3, el equipo no puede empezar un 4to ticket hasta que uno se mueva a Review. Esto fuerza terminar lo empezado.',
      en: 'If the "In Progress" limit is 3, the team cannot start a 4th ticket until one moves to Review. This forces finishing what was started.',
    },
    consejo: {
      es: 'WIP bajos (2-3 por persona) suelen ser más efectivos. Parece contraintuitivo, pero producir menos en paralelo = entregar más rápido.',
      en: 'Low WIP (2-3 per person) is usually more effective. It seems counterintuitive, but producing less in parallel = delivering faster.',
    },
  },
  {
    id: 'flow',
    icon: '🌊',
    title: { es: 'Gestionar el Flujo', en: 'Manage Flow' },
    desc: {
      es: 'Monitoreá métricas como el tiempo de ciclo (cycle time) y el throughput para identificar patrones. El objetivo es hacer que los tickets fluyan de manera predecible y constante.',
      en: 'Monitor metrics like cycle time and throughput to identify patterns. The goal is to make tickets flow predictably and steadily.',
    },
    ejemplo: {
      es: 'Usá un diagrama CFD (Cumulative Flow Diagram) para ver cuánto tiempo pasa un ticket en cada etapa. Si "In Review" se acumula, hay un cuello de botella en revisión.',
      en: 'Use a CFD (Cumulative Flow Diagram) to see how long a ticket spends in each stage. If "In Review" builds up, there is a bottleneck in review.',
    },
    consejo: {
      es: 'Medí el lead time (desde que se pide hasta que se entrega) y el cycle time (desde que se empieza hasta que se termina). La diferencia es el tiempo en backlog.',
      en: 'Measure lead time (from request to delivery) and cycle time (from start to finish). The difference is the time spent in the backlog.',
    },
  },
  {
    id: 'policies',
    icon: '📜',
    title: { es: 'Hacer Políticas Explícitas', en: 'Make Policies Explicit' },
    desc: {
      es: 'Todo el equipo debe conocer y entender las reglas del proceso. Definí claramente cuándo un ticket pasa de una columna a otra, quién puede hacerlo, y qué criterios debe cumplir.',
      en: 'The whole team must know and understand the process rules. Clearly define when a ticket moves from one column to another, who can do it, and what criteria it must meet.',
    },
    ejemplo: {
      es: 'Ejemplo: "Un ticket pasa a Review solo si tiene código subido, tests pasando y descripción del MR completa." Nadie adivina.',
      en: 'Example: "A ticket moves to Review only if it has code pushed, tests passing, and a complete MR description." Nobody guesses.',
    },
    consejo: {
      es: 'Las políticas se escriben en el tablero o en un documento compartido. Se revisan y actualizan en las retrospectivas del equipo.',
      en: 'Policies are written on the board or in a shared document. They are reviewed and updated during team retrospectives.',
    },
  },
  {
    id: 'feedback',
    icon: '🔄',
    title: { es: 'Implementar Feedback Loops', en: 'Implement Feedback Loops' },
    desc: {
      es: 'Establecé reuniones regulares para revisar el proceso y mejorar: daily standup (sincronización diaria), revisión de servicios (métricas y SLAs), y reuniones de replenishment (priorización).',
      en: 'Set up regular meetings to review the process and improve: daily standup (daily sync), service delivery review (metrics and SLAs), and replenishment meetings (prioritization).',
    },
    ejemplo: {
      es: 'La daily de Kanban se enfoca en el flujo del tablero: ¿hay bloqueos? ¿alguna columna está sobre el límite de WIP? ¿necesitamos ayuda?',
      en: 'The Kanban daily focuses on board flow: are there blockers? Is any column over the WIP limit? Do we need help?',
    },
    consejo: {
      es: 'Los feedback loops deben ser frecuentes y cortos. 15 minutos para la daily, 30 para la revisión de servicios. El tiempo es valioso.',
      en: 'Feedback loops should be frequent and short. 15 minutes for daily, 30 for service delivery review. Time is valuable.',
    },
  },
  {
    id: 'kaizen',
    icon: '📈',
    title: { es: 'Mejorar Colaborativamente (Kaizen)', en: 'Improve Collaboratively (Kaizen)' },
    desc: {
      es: 'Kanban es un sistema evolutivo. El equipo experimenta con cambios pequeños, mide el impacto, y decide si los adopta. El objetivo es la mejora continua, no la perfección inmediata.',
      en: 'Kanban is an evolutionary system. The team experiments with small changes, measures the impact, and decides whether to adopt them. The goal is continuous improvement, not immediate perfection.',
    },
    ejemplo: {
      es: 'Si el equipo nota que los bugs se acumulan, puede experimentar con una columna de "Bug Fixing" con WIP 2, medir el impacto por 2 semanas, y decidir si mantenerla.',
      en: 'If the team notices bugs piling up, they can experiment with a "Bug Fixing" column with WIP 2, measure the impact for 2 weeks, and decide whether to keep it.',
    },
    consejo: {
      es: 'Usá retrospectivas para identificar un solo cambio pequeño por iteración. Implementalo, medilo, y decidí. Mejora sostenible > revolución.',
      en: 'Use retrospectives to identify one small change per iteration. Implement it, measure it, and decide. Sustainable improvement > revolution.',
    },
  },
]

export default function KanbanMethod() {
  const { lang } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const practice = PRACTICES[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === PRACTICES.length - 1

  const next = useCallback(() => {
    if (isLast) {
      setCompleted(true)
      return
    }
    setCurrentStep(prev => prev + 1)
  }, [isLast])

  const prev = useCallback(() => {
    if (isFirst) return
    setCurrentStep(prev => prev - 1)
  }, [isFirst])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setCompleted(false)
  }, [])

  return (
    <section id="kanban" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-rose/3 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-rose/10 text-accent-rose border border-accent-rose/20 mb-4">
            {{ es: 'Metodología', en: 'Methodology' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{{ es: 'Kanban', en: 'Kanban' }[lang]}</h2>
          <p className="text-text-secondary">{{ es: 'Metodología pull basada en flujo continuo y mejora incremental', en: 'Pull-based methodology based on continuous flow and incremental improvement' }[lang]}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          {!completed ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                {PRACTICES.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentStep(i)}
                    className={`h-1.5 rounded-full transition-all flex-1 ${
                      i === currentStep
                        ? 'bg-accent-rose'
                        : i < currentStep
                        ? 'bg-accent-rose/50'
                        : 'bg-surface-card'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{practice.icon}</span>
                    <div>
                      <span className="text-xs font-mono text-accent-rose/70 mb-1 block">
                        {currentStep + 1} / {PRACTICES.length}
                      </span>
                      <h3 className="text-xl font-bold">{practice.title[lang]}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-4 bg-surface-card rounded-xl p-4">
                    {practice.desc[lang]}
                  </p>

                  <div className="bg-accent-rose/5 rounded-xl p-4 border border-accent-rose/10 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span>📌</span>
                      <span className="text-xs font-semibold text-accent-rose">
                        {{ es: 'Ejemplo', en: 'Example' }[lang]}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{practice.ejemplo[lang]}</p>
                  </div>

                  <div className="bg-surface-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span>💡</span>
                      <span className="text-xs font-semibold text-text-muted">
                        {{ es: 'Consejo', en: 'Tip' }[lang]}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{practice.consejo[lang]}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-border">
                <button
                  onClick={prev}
                  disabled={isFirst}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    isFirst
                      ? 'text-text-disabled cursor-not-allowed'
                      : 'bg-surface-card hover:bg-surface-hover text-text-secondary'
                  }`}
                >
                  ← {{ es: 'Anterior', en: 'Previous' }[lang]}
                </button>

                <span className="text-xs text-text-muted">
                  {practice.title[lang]}
                </span>

                <button
                  onClick={next}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-accent-rose/20 text-accent-rose hover:bg-accent-rose/30 border border-accent-rose/30 transition-all"
                >
                  {isLast ? ({ es: 'Finalizar', en: 'Finish' }[lang]) : ({ es: 'Siguiente →', en: 'Next →' }[lang])}
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <span className="text-5xl mb-4 block">🎉</span>
              <h3 className="text-xl font-bold mb-2">{{ es: '¡Kanban completado!', en: 'Kanban completed!' }[lang]}</h3>
              <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
                {lang === 'es' ? (
                  <>Conocés las 6 prácticas fundamentales de Kanban. Recordá: es un sistema evolutivo — mejorá de a poco, medí todo, y adaptate continuamente.</>
                ) : (
                  <>You now know the 6 fundamental Kanban practices. Remember: it\'s an evolutionary system — improve little by little, measure everything, and adapt continuously.</>
                )}
              </p>
              <button
                onClick={reset}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-accent-rose/20 text-accent-rose hover:bg-accent-rose/30 border border-accent-rose/30 transition-all"
              >
                🔄 {{ es: 'Volver a empezar', en: 'Start over' }[lang]}
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span>📊</span>
            <h3 className="text-sm font-semibold">{{ es: 'Tablero Kanban de ejemplo', en: 'Example Kanban Board' }[lang]}</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: { es: 'Pendiente', en: 'Backlog' }, color: 'bg-gray-500/20', border: 'border-gray-500/30', tickets: ['Login OAuth', 'Dashboard'], icon: '📥' },
              { label: { es: 'En Progreso', en: 'In Progress' }, color: 'bg-accent-blue/20', border: 'border-accent-blue/30', tickets: ['Exportar PDF'], icon: '👨‍💻', wip: '2/3' },
              { label: { es: 'Revisión', en: 'Review' }, color: 'bg-accent-purple/20', border: 'border-accent-purple/30', tickets: [], icon: '🔍', wip: '0/2' },
              { label: { es: 'Terminado', en: 'Done' }, color: 'bg-accent-emerald/20', border: 'border-accent-emerald/30', tickets: ['Fix login bug'], icon: '✅' },
            ].map(col => (
              <div key={col.label.en} className={`rounded-xl p-3 ${col.color} border ${col.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-text-secondary">{col.icon} {col.label[lang]}</span>
                  {col.wip && <span className="text-[10px] font-mono text-accent-rose">{col.wip}</span>}
                </div>
                <div className="space-y-1">
                  {col.tickets.length > 0 ? col.tickets.map(t => (
                    <div key={t} className="text-[10px] bg-surface-card rounded-lg px-2 py-1 text-text-secondary">
                      {t}
                    </div>
                  )) : (
                    <div className="text-[10px] text-text-disabled italic">—</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-text-muted text-center">
            {lang === 'es' ? (
              <>Límite WIP en <strong className="text-accent-rose">Review: 2</strong>. Si se llena, el equipo no puede mover más tickets hasta que se libere.</>
            ) : (
              <>WIP limit on <strong className="text-accent-rose">Review: 2</strong>. If it fills up, the team cannot move more tickets until it frees up.</>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
