import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const BOARD_COLUMNS = [
  { id: 'todo', label: { es: 'To Do', en: 'To Do' }, icon: '📥', color: 'text-accent-amber', tickets: 4 },
  { id: 'progress', label: { es: 'In Progress', en: 'In Progress' }, icon: '👨‍💻', color: 'text-accent-blue', tickets: 2, wip: 3 },
  { id: 'review', label: { es: 'Code Review', en: 'Code Review' }, icon: '🔍', color: 'text-accent-purple', tickets: 1, wip: 2 },
  { id: 'testing', label: { es: 'Testing', en: 'Testing' }, icon: '🧪', color: 'text-accent-rose', tickets: 1, wip: 2 },
  { id: 'done', label: { es: 'Done', en: 'Done' }, icon: '✅', color: 'text-accent-emerald', tickets: 8 },
]

export default function KanbanMethod() {
  const { lang } = useLanguage()

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
            {{ es: 'Metodología de Flujo Continuo', en: 'Continuous Flow Methodology' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{{ es: 'Kanban', en: 'Kanban' }[lang]}</h2>
          <p className="text-text-secondary">
            {{ es: 'Visualización del trabajo, límites claros y mejora continua sin sprints fijos', en: 'Work visualization, clear limits, and continuous improvement without fixed sprints' }[lang]}
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
              <span className="text-2xl">🎯</span>
              <h3 className="text-lg font-bold">
                {{ es: '¿Qué es en cristiano?', en: 'What is it in plain English?' }[lang]}
              </h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {lang === 'es' ? (
                <>Kanban es como una lista de compras que nunca se vacía del todo. En vez de dividir el trabajo en sprints (como Scrum), tenés un flujo continuo de tareas que entran por un lado y salen por el otro. El objetivo es que el trabajo fluya sin atascos. Usás un <strong>tablero visual</strong> con columnas que representan el estado de cada tarea. Lo más importante: <strong>limitás cuántas tareas se pueden hacer al mismo tiempo</strong> (WIP) para no saturarte. Si algo se acumula, parás el flujo y resolvés el cuello de botella antes de seguir.</>
              ) : (
                <>Kanban is like a shopping list that never really empties. Instead of dividing work into sprints (like Scrum), you have a continuous flow of tasks that come in one side and go out the other. The goal is for work to flow without jams. You use a <strong>visual board</strong> with columns representing each task's status. Most importantly: <strong>you limit how many tasks can be done at once</strong> (WIP) to avoid overload. If something piles up, you stop the flow and resolve the bottleneck before continuing.</>
              )}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📊</span>
              <h3 className="text-lg font-bold">
                {{ es: 'El Tablero', en: 'The Board' }[lang]}
              </h3>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {BOARD_COLUMNS.map(col => (
                <div key={col.id} className={`bg-${col.color.replace('text-', '')}/10 rounded-xl p-2 border border-${col.color.replace('text-', '')}/20`}>
                  <div className="text-center">
                    <span className="text-lg block mb-1">{col.icon}</span>
                    <span className={`text-[10px] font-semibold ${col.color} block leading-tight`}>{col.label[lang]}</span>
                    {col.wip && (
                      <span className="text-[10px] text-accent-rose font-mono block mt-1">
                        WIP {col.wip}
                      </span>
                    )}
                    <span className="text-xs text-text-secondary font-bold block mt-1">{col.tickets}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-text-primary">
                {{ es: 'Cómo funciona:', en: 'How it works:' }[lang]}
              </p>
              <ul className="space-y-2">
                {[
                  { es: 'Cada tarea es un ticket que viaja de izquierda a derecha por el tablero.', en: 'Each task is a ticket that travels left to right across the board.' },
                  { es: 'El equipo define cuántos tickets puede tener cada columna como máximo (límite WIP). Si una columna se llena, nadie puede mover más tickets hasta que se libere.', en: 'The team defines how many tickets each column can have at most (WIP limit). If a column fills up, no one can move more tickets until it frees up.' },
                  { es: 'Los tickets en "Done" representan trabajo terminado y listo para producción.', en: 'Tickets in "Done" represent completed work ready for production.' },
                  { es: 'No hay fechas fijas — los tickets se priorizan continuamente según la necesidad del negocio.', en: 'There are no fixed dates — tickets are continuously prioritized based on business needs.' },
                ].map((item, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-rose mt-2 shrink-0" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface-card rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span>🚦</span>
                <span className="text-xs font-semibold text-text-muted">
                  {{ es: 'WIP (Work In Progress)', en: 'WIP (Work In Progress)' }[lang]}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {lang === 'es' ? (
                  <>El WIP es el límite de tareas que pueden estar en una columna al mismo tiempo. Si "Code Review" tiene WIP 2, solo puede haber 2 tickets en revisión simultáneamente. Esto obliga al equipo a <strong>terminar lo que empezó</strong> antes de agarrar algo nuevo. Menos multitasking = más entregas.</>
                ) : (
                  <>WIP is the limit of tasks that can be in a column at the same time. If "Code Review" has WIP 2, only 2 tickets can be in review simultaneously. This forces the team to <strong>finish what they started</strong> before picking up something new. Less multitasking = more deliveries.</>
                )}
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-bold">
                {{ es: 'Diferencia clave con Scrum', en: 'Key difference from Scrum' }[lang]}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="text-left py-2 pr-4 text-text-muted font-semibold">{{ es: 'Aspecto', en: 'Aspect' }[lang]}</th>
                    <th className="text-left py-2 pr-4 text-accent-rose font-semibold">Kanban</th>
                    <th className="text-left py-2 text-accent-purple font-semibold">Scrum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {[
                    { aspect: { es: 'Ciclos', en: 'Cycles' }, kanban: { es: 'Flujo continuo, sin sprints', en: 'Continuous flow, no sprints' }, scrum: { es: 'Sprints fijos (2-4 semanas)', en: 'Fixed sprints (2-4 weeks)' } },
                    { aspect: { es: 'Roles', en: 'Roles' }, kanban: { es: 'No hay roles definidos', en: 'No defined roles' }, scrum: { es: 'PO, SM, Dev Team', en: 'PO, SM, Dev Team' } },
                    { aspect: { es: 'Cambios', en: 'Changes' }, kanban: { es: 'Se pueden agregar en cualquier momento', en: 'Can be added at any time' }, scrum: { es: 'No se cambia el alcance del sprint', en: 'Sprint scope is fixed' } },
                    { aspect: { es: 'Métrica clave', en: 'Key metric' }, kanban: { es: 'Cycle time y throughput', en: 'Cycle time and throughput' }, scrum: { es: 'Velocity por sprint', en: 'Velocity per sprint' } },
                    { aspect: { es: 'Entrega', en: 'Delivery' }, kanban: { es: 'Continua, cuando está listo', en: 'Continuous, when ready' }, scrum: { es: 'Al final de cada sprint', en: 'At the end of each sprint' } },
                  ].map(row => (
                    <tr key={row.aspect.en}>
                      <td className="py-2 pr-4 text-text-secondary font-medium">{row.aspect[lang]}</td>
                      <td className="py-2 pr-4 text-text-secondary">{row.kanban[lang]}</td>
                      <td className="py-2 text-text-secondary">{row.scrum[lang]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-accent-rose/5 rounded-2xl p-6 md:p-8 border border-accent-rose/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">💡</span>
              <div>
                <h4 className="text-sm font-semibold text-accent-rose mb-2">
                  {{ es: 'Pro-Tip de Entrevista', en: 'Interview Pro-Tip' }[lang]}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {lang === 'es' ? (
                    <>Si te preguntan por Kanban, evitá decir solo "es un tablero con columnas". Decí: <strong className="text-white">"Kanban es un sistema de gestión de flujo que se enfoca en visualizar el trabajo, limitar el WIP y mejorar continuamente. A diferencia de Scrum, no tiene ciclos fijos — los cambios se pueden priorizar y entregar en cualquier momento. Es ideal para equipos de soporte, mantenimiento o productos con prioridades que cambian constantemente."</strong> Si mencionás que entendés la diferencia con Scrum, das la impresión de que trabajaste con ambos enfoques.</>
                  ) : (
                    <>If asked about Kanban, avoid just saying "it\'s a board with columns". Say: <strong className="text-white">"Kanban is a flow management system focused on visualizing work, limiting WIP, and continuous improvement. Unlike Scrum, it has no fixed cycles — changes can be prioritized and delivered at any time. It\'s ideal for support teams, maintenance, or products with constantly shifting priorities."</strong> If you mention you understand the difference from Scrum, you give the impression you\'ve worked with both approaches.</>
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
