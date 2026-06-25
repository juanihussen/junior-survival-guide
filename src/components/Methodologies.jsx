import { useState } from 'react'
import { motion } from 'framer-motion'
import CeremonySimulator from './CeremonySimulator'
import KanbanMethod from './KanbanMethod'
import WaterfallMethod from './WaterfallMethod'
import { useLanguage } from '../context/LanguageContext'

const COMPARISON_ROWS = [
  {
    label: { es: 'Enfoque', en: 'Approach' },
    waterfall: { es: 'Predictivo', en: 'Predictive' },
    scrum: { es: 'Iterativo', en: 'Iterative' },
    kanban: { es: 'Continuo', en: 'Continuous' },
  },
  {
    label: { es: 'Gestión del cambio', en: 'Change management' },
    waterfall: { es: 'Baja', en: 'Low' },
    scrum: { es: 'Alta', en: 'High' },
    kanban: { es: 'Máxima', en: 'Maximum' },
  },
  {
    label: { es: 'Entregas al cliente', en: 'Customer deliveries' },
    waterfall: { es: 'Al final del proyecto', en: 'At project end' },
    scrum: { es: 'Por Sprint', en: 'Per Sprint' },
    kanban: { es: 'Continuas', en: 'Continuous' },
  },
  {
    label: { es: 'Planificación', en: 'Planning' },
    waterfall: { es: 'Una vez al inicio', en: 'Once at the start' },
    scrum: { es: 'Cada Sprint', en: 'Each Sprint' },
    kanban: { es: 'Continua (pull)', en: 'Continuous (pull)' },
  },
  {
    label: { es: 'Ritmo del equipo', en: 'Team rhythm' },
    waterfall: { es: 'Fechas comprometidas', en: 'Committed deadlines' },
    scrum: { es: 'Ciclos regulares', en: 'Regular cycles' },
    kanban: { es: 'Flujo constante', en: 'Steady flow' },
  },
]

export default function Methodologies() {
  const { lang } = useLanguage()
  const [activeSub, setActiveSub] = useState('scrum')

  const subTabs = [
    { id: 'scrum', label: { es: 'Scrum', en: 'Scrum' }, icon: '🏃', color: 'text-accent-purple', activeColor: 'bg-accent-purple/10 border-accent-purple/30' },
    { id: 'kanban', label: { es: 'Kanban', en: 'Kanban' }, icon: '📋', color: 'text-accent-rose', activeColor: 'bg-accent-rose/10 border-accent-rose/30' },
    { id: 'waterfall', label: { es: 'Waterfall', en: 'Waterfall' }, icon: '🌊', color: 'text-accent-blue', activeColor: 'bg-accent-blue/10 border-accent-blue/30' },
  ]

  const subComponents = {
    scrum: CeremonySimulator,
    kanban: KanbanMethod,
    waterfall: WaterfallMethod,
  }
  const SubComponent = subComponents[activeSub]

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-2">
        <div className="flex items-center justify-center gap-2">
          {subTabs.map(st => (
            <button
              key={st.id}
              onClick={() => setActiveSub(st.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                activeSub === st.id
                  ? `${st.activeColor} ${st.color}`
                  : 'text-gray-400 hover:text-gray-200 border-transparent hover:bg-white/5'
              }`}
            >
              <span>{st.icon}</span>
              {st.label[lang]}
            </button>
          ))}
        </div>
      </div>

      <SubComponent />

      <section className="min-h-screen py-24 px-4 relative flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/3 via-transparent to-transparent" />

        <div className="max-w-4xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-4">
              {{ es: 'Comparativa', en: 'Comparison' }[lang]}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {{ es: 'Cuadro Comparativo de Supervivencia', en: 'Survival Comparison Chart' }[lang]}
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              {{ es: 'Elegí tu herramienta según el contexto del proyecto. No existe la metodología perfecta — solo la que mejor se adapta.', en: 'Choose your tool based on project context. There is no perfect methodology — only the one that fits best.' }[lang]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left py-3 pr-6 text-text-muted font-semibold min-w-[140px]">
                    {{ es: 'Eje', en: 'Axis' }[lang]}
                  </th>
                  <th className="text-left py-3 pr-6 text-accent-blue font-semibold">
                    <span className="flex items-center gap-2">
                      <span>🌊</span>
                      Waterfall
                    </span>
                  </th>
                  <th className="text-left py-3 pr-6 text-accent-purple font-semibold">
                    <span className="flex items-center gap-2">
                      <span>🏃</span>
                      Scrum
                    </span>
                  </th>
                  <th className="text-left py-3 text-accent-rose font-semibold">
                    <span className="flex items-center gap-2">
                      <span>📋</span>
                      Kanban
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50">
                {COMPARISON_ROWS.map(row => (
                  <tr key={row.label.en} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-6 text-text-primary font-medium">{row.label[lang]}</td>
                    <td className="py-3 pr-6 text-text-secondary group-hover:text-accent-blue transition-colors">{row.waterfall[lang]}</td>
                    <td className="py-3 pr-6 text-text-secondary group-hover:text-accent-purple transition-colors">{row.scrum[lang]}</td>
                    <td className="py-3 text-text-secondary group-hover:text-accent-rose transition-colors">{row.kanban[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 p-5 rounded-2xl bg-surface-card border border-surface-border"
          >
            <p className="text-xs text-text-secondary leading-relaxed">
              {lang === 'es' ? (
                <>💡 <strong>En la entrevista:</strong> si te preguntan cuál preferís, no digas solo "Scrum porque es ágil". Explicá por qué: "Depende del proyecto. Waterfall funciona cuando los requisitos son fijos y el presupuesto cerrado. Scrum es ideal para productos que evolucionan con feedback constante. Y Kanban es perfecto para equipos de soporte o cuando necesitamos entregar valor de forma continua sin atarnos a sprints."</>
              ) : (
                <>💡 <strong>In the interview:</strong> if they ask which you prefer, don\'t just say "Scrum because it\'s agile." Explain why: "It depends on the project. Waterfall works when requirements are fixed and the budget is locked. Scrum is ideal for products that evolve with constant feedback. And Kanban is perfect for support teams or when we need to deliver value continuously without being tied to sprints."</>
              )}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
