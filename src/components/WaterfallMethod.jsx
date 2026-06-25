import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const PHASES = [
  {
    id: 'requirements',
    icon: '📋',
    title: { es: 'Requisitos', en: 'Requirements' },
    desc: {
      es: 'Se recopilan y documentan todos los requisitos del cliente. El resultado es un documento de especificación funcional que detalla qué debe hacer el sistema. En esta fase no se escribe código.',
      en: 'All client requirements are gathered and documented. The result is a functional specification document detailing what the system must do. No code is written in this phase.',
    },
    detalle: {
      es: 'Se entrevista al cliente, se analizan procesos existentes, y se define el alcance del proyecto. Toda la funcionalidad queda congelada al finalizar esta etapa.',
      en: 'The client is interviewed, existing processes are analyzed, and the project scope is defined. All functionality is frozen at the end of this stage.',
    },
    riesgo: {
      es: 'Si los requisitos cambian después, es muy costoso volver atrás. No hay entregas intermedias para validar con el cliente.',
      en: 'If requirements change later, it is very costly to go back. There are no intermediate deliveries to validate with the client.',
    },
    iconBig: '📝',
  },
  {
    id: 'design',
    icon: '🎨',
    title: { es: 'Diseño', en: 'Design' },
    desc: {
      es: 'Se diseña la arquitectura del sistema, la base de datos, la interfaz de usuario y los componentes. Se producen diagramas UML, prototipos y documentos técnicos.',
      en: 'The system architecture, database, user interface, and components are designed. UML diagrams, prototypes, and technical documents are produced.',
    },
    detalle: {
      es: 'Arquitectos y diseñadores definen la estructura del software. Se toman decisiones técnicas que impactan todo el proyecto. No se escribe código aún.',
      en: 'Architects and designers define the software structure. Technical decisions that impact the entire project are made. No code is written yet.',
    },
    riesgo: {
      es: 'Es difícil anticipar todos los problemas de diseño sin implementar nada. Los errores de diseño se descubren tarde, en la fase de implementación o pruebas.',
      en: 'It is hard to anticipate all design problems without implementing anything. Design errors are discovered late, in the implementation or testing phase.',
    },
    iconBig: '🏗️',
  },
  {
    id: 'implementation',
    icon: '💻',
    title: { es: 'Implementación', en: 'Implementation' },
    desc: {
      es: 'Los desarrolladores escriben el código siguiendo el diseño definido. Esta fase suele ser la más larga y puede durar meses. No hay visibilidad del producto funcionando hasta el final.',
      en: 'Developers write the code following the defined design. This phase is usually the longest and can take months. There is no visibility of the working product until the end.',
    },
    detalle: {
      es: 'Cada módulo se construye por separado. No hay integración continua — los módulos se conectan al final. Cualquier error de diseño detectado acá requiere volver a la fase anterior.',
      en: 'Each module is built separately. There is no continuous integration — modules are connected at the end. Any design error detected here requires going back to the previous phase.',
    },
    riesgo: {
      es: 'Sin retroalimentación temprana, el equipo puede construir algo que no es lo que el cliente quería. Se descubre recién en la fase de pruebas.',
      en: 'Without early feedback, the team might build something the client did not want. This is only discovered during the testing phase.',
    },
    iconBig: '🔨',
  },
  {
    id: 'testing',
    icon: '🧪',
    title: { es: 'Pruebas', en: 'Testing' },
    desc: {
      es: 'Se ejecutan pruebas sobre el sistema completo: unitarias, de integración, funcionales y de aceptación. QA reporta bugs que deben corregirse antes del lanzamiento.',
      en: 'Tests are run on the complete system: unit, integration, functional, and acceptance. QA reports bugs that must be fixed before release.',
    },
    detalle: {
      es: 'Se prueba todo el sistema de una vez. Corregir bugs en esta fase es costoso porque requiere modificar código ya escrito y retestar. Los bugs pueden retrasar la entrega semanas.',
      en: 'The entire system is tested at once. Fixing bugs in this phase is expensive because it requires modifying already-written code and retesting. Bugs can delay the release by weeks.',
    },
    riesgo: {
      es: 'Si hay muchos bugs, el equipo está bajo presión para entregar y puede sacrificar calidad. Las pruebas tardías son las más caras.',
      en: 'If there are many bugs, the team is under pressure to deliver and may sacrifice quality. Late testing is the most expensive.',
    },
    iconBig: '🔍',
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: { es: 'Mantenimiento', en: 'Maintenance' },
    desc: {
      es: 'El sistema se despliega y se entrega al cliente. Comienza la fase de mantenimiento: corrección de bugs post-lanzamiento, parches de seguridad y pequeñas mejoras.',
      en: 'The system is deployed and delivered to the client. The maintenance phase begins: post-release bug fixes, security patches, and minor improvements.',
    },
    detalle: {
      es: 'El equipo se disuelve o pasa a otro proyecto. Los cambios son difíciles porque requieren entender código escrito hace meses. No hay procesos establecidos para cambios rápidos.',
      en: 'The team disbands or moves to another project. Changes are difficult because they require understanding code written months ago. There are no established processes for rapid changes.',
    },
    riesgo: {
      es: 'Waterfall asume que los requisitos no cambian. En la realidad, el cliente siempre va a pedir cambios. Sin un proceso ágil, cada cambio es un proyecto nuevo.',
      en: 'Waterfall assumes requirements do not change. In reality, the client will always request changes. Without an agile process, each change becomes a new project.',
    },
    iconBig: '🚀',
  },
]

export default function WaterfallMethod() {
  const { lang } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const phase = PHASES[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === PHASES.length - 1

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
    <section id="waterfall" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/3 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-blue/10 text-accent-blue border border-accent-blue/20 mb-4">
            {{ es: 'Metodología', en: 'Methodology' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{{ es: 'Waterfall', en: 'Waterfall' }[lang]}</h2>
          <p className="text-text-secondary">{{ es: 'Modelo secuencial clásico — cada fase debe completarse antes de pasar a la siguiente', en: 'Classic sequential model — each phase must be completed before moving to the next' }[lang]}</p>
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
                {PHASES.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentStep(i)}
                    className={`h-1.5 rounded-full transition-all flex-1 ${
                      i === currentStep
                        ? 'bg-accent-blue'
                        : i < currentStep
                        ? 'bg-accent-blue/50'
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
                    <span className="text-3xl">{phase.icon}</span>
                    <div>
                      <span className="text-xs font-mono text-accent-blue/70 mb-1 block">
                        {currentStep + 1} / {PHASES.length}
                      </span>
                      <h3 className="text-xl font-bold">{phase.title[lang]}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-4 bg-surface-card rounded-xl p-4">
                    {phase.desc[lang]}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-accent-blue/5 rounded-xl p-4 border border-accent-blue/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{phase.iconBig}</span>
                        <span className="text-xs font-semibold text-accent-blue">
                          {{ es: '¿Qué pasa acá?', en: 'What happens here?' }[lang]}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{phase.detalle[lang]}</p>
                    </div>

                    <div className="bg-accent-rose/5 rounded-xl p-4 border border-accent-rose/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span>⚠️</span>
                        <span className="text-xs font-semibold text-accent-rose">
                          {{ es: 'Riesgo', en: 'Risk' }[lang]}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{phase.riesgo[lang]}</p>
                    </div>
                  </div>

                  {currentStep < PHASES.length - 1 && (
                    <div className="bg-surface-card rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span>⬇️</span>
                        <span className="text-xs font-semibold text-text-muted">
                          {{ es: 'Salida de esta fase', en: 'Output of this phase' }[lang]}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {currentStep === 0 && (lang === 'es' ? 'Documento de Requisitos (SRS) — firmado por el cliente.' : 'Software Requirements Specification (SRS) — signed by the client.')}
                        {currentStep === 1 && (lang === 'es' ? 'Documento de Diseño de Arquitectura (ADD) — planos del sistema.' : 'Architecture Design Document (ADD) — system blueprints.')}
                        {currentStep === 2 && (lang === 'es' ? 'Código fuente completo — módulos sin integrar.' : 'Complete source code — unintegrated modules.')}
                        {currentStep === 3 && (lang === 'es' ? 'Informe de pruebas y producto listo para deploy.' : 'Test report and product ready for deployment.')}
                      </p>
                    </div>
                  )}
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
                  {phase.title[lang]}
                </span>

                <button
                  onClick={next}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 border border-accent-blue/30 transition-all"
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
              <h3 className="text-xl font-bold mb-2">{{ es: '¡Waterfall completado!', en: 'Waterfall completed!' }[lang]}</h3>
              <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
                {lang === 'es' ? (
                  <>Conocés las 5 fases del modelo Waterfall. Es útil para proyectos con requisitos estables pero inflexible ante el cambio. Comparalo con las metodologías ágiles para ver las diferencias.</>
                ) : (
                  <>You now know the 5 phases of the Waterfall model. It is useful for projects with stable requirements but inflexible to change. Compare it with agile methodologies to see the differences.</>
                )}
              </p>
              <button
                onClick={reset}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 border border-accent-blue/30 transition-all"
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
            <span>⚖️</span>
            <h3 className="text-sm font-semibold">{{ es: 'Waterfall vs Agile', en: 'Waterfall vs Agile' }[lang]}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left py-2 pr-4 text-text-muted font-semibold">{{ es: 'Aspecto', en: 'Aspect' }[lang]}</th>
                  <th className="text-left py-2 pr-4 text-accent-blue font-semibold">Waterfall</th>
                  <th className="text-left py-2 text-accent-emerald font-semibold">{{ es: 'Ágil (Scrum/Kanban)', en: 'Agile (Scrum/Kanban)' }[lang]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {[
                  { aspect: { es: 'Entrega', en: 'Delivery' }, waterfall: { es: 'Al final del proyecto', en: 'At the end of the project' }, agile: { es: 'Continua, cada iteración', en: 'Continuous, each iteration' } },
                  { aspect: { es: 'Cambios', en: 'Changes' }, waterfall: { es: 'Muy costosos', en: 'Very costly' }, agile: { es: 'Bienvenidos y baratos', en: 'Welcome and cheap' } },
                  { aspect: { es: 'Cliente', en: 'Client' }, waterfall: { es: 'Solo al inicio y al final', en: 'Only at the start and end' }, agile: { es: 'Involucrado todo el tiempo', en: 'Involved all the time' } },
                  { aspect: { es: 'Riesgo', en: 'Risk' }, waterfall: { es: 'Alto — se descubre tarde', en: 'High — discovered late' }, agile: { es: 'Bajo — se mitiga temprano', en: 'Low — mitigated early' } },
                  { aspect: { es: 'Equipo', en: 'Team' }, waterfall: { es: 'Roles rígidos y aislados', en: 'Rigid, isolated roles' }, agile: { es: 'Auto-organizado y multidisciplinario', en: 'Self-organized and cross-functional' } },
                ].map(row => (
                  <tr key={row.aspect.en}>
                    <td className="py-2 pr-4 text-text-secondary font-medium">{row.aspect[lang]}</td>
                    <td className="py-2 pr-4 text-text-secondary">{row.waterfall[lang]}</td>
                    <td className="py-2 text-text-secondary">{row.agile[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
