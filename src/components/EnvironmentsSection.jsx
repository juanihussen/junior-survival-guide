import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const ENVIRONMENTS = [
  { id: 'local', label: { es: 'Local', en: 'Local' }, icon: '💻', desc: { es: 'Entorno del desarrollador', en: 'Developer environment' }, color: 'text-text-secondary' },
  { id: 'dev', label: { es: 'Dev', en: 'Dev' }, icon: '🧪', desc: { es: 'Integración continua', en: 'Continuous integration' }, color: 'text-accent-amber' },
  { id: 'staging', label: { es: 'Staging', en: 'Staging' }, icon: '🔍', desc: { es: 'Pre-producción', en: 'Pre-production' }, color: 'text-accent-blue' },
  { id: 'production', label: { es: 'Producción', en: 'Production' }, icon: '🌐', desc: { es: 'Usuarios reales', en: 'Real users' }, color: 'text-accent-emerald' },
]

const ENV_DETAILS = {
  local: {
    es: 'Código fuente, Docker Compose, variables de entorno locales. Es tu sandbox personal: podés romper todo sin miedo.',
    en: 'Source code, Docker Compose, local environment variables. It\'s your personal sandbox — you can break everything without fear.',
  },
  dev: {
    es: 'Servidor compartido, CI corre automáticamente, tests rápidos. Acá el equipo integra sus cambios y detecta conflictos temprano.',
    en: 'Shared server, CI runs automatically, fast tests. The team integrates changes here and catches conflicts early.',
  },
  staging: {
    es: 'Réplica exacta de producción, QA testing, últimos cambios antes de prod. Se validan features nuevos y se hacen pruebas de regresión.',
    en: 'Exact production replica, QA testing, latest changes before prod. New features are validated and regression tests are run.',
  },
  production: {
    es: 'Usuarios reales, monitoreo, alertas, alta disponibilidad. Cualquier error acá impacta al cliente — se requiere máxima cuidado.',
    en: 'Real users, monitoring, alerts, high availability. Any error here impacts the customer — maximum care required.',
  },
}

export default function EnvironmentsSection() {
  const { lang } = useLanguage()
  const [activeEnv, setActiveEnv] = useState(0)

  return (
    <section id="entornos" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-amber/3 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-amber/10 text-accent-amber border border-accent-amber/20 mb-4">
            {{ es: 'Infraestructura', en: 'Infrastructure' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{{ es: 'Entornos', en: 'Environments' }[lang]}</h2>
          <p className="text-text-secondary">{{ es: 'Los distintos ambientes por los que viaja tu código hasta llegar a producción', en: 'The different environments your code travels through before reaching production' }[lang]}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            {ENVIRONMENTS.map((env, i) => {
              const isActive = activeEnv === i
              return (
                <button
                  key={env.id}
                  onClick={() => setActiveEnv(i)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-accent-amber/10 border border-accent-amber/30'
                      : 'bg-surface-card border border-surface-border hover:bg-surface-hover'
                  }`}
                >
                  <div className="text-xl mb-2">{env.icon}</div>
                  <h4 className={`text-sm font-semibold ${env.color}`}>{env.label[lang]}</h4>
                  <p className="text-xs text-text-muted mt-1">{env.desc[lang]}</p>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeEnv}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-surface-card rounded-xl p-5 border border-surface-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{ENVIRONMENTS[activeEnv].icon}</span>
                <div>
                  <h4 className={`text-sm font-semibold ${ENVIRONMENTS[activeEnv].color}`}>
                    {ENVIRONMENTS[activeEnv].label[lang]}
                  </h4>
                  <p className="text-xs text-text-muted">{ENVIRONMENTS[activeEnv].desc[lang]}</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {ENV_DETAILS[ENVIRONMENTS[activeEnv].id][lang]}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-2">
            {ENVIRONMENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveEnv(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeEnv ? 'bg-accent-amber w-6' : 'bg-surface-hover hover:bg-surface-hover'
                }`}
              />
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-surface-border">
            <div className="bg-accent-amber/5 rounded-xl p-4 border border-accent-amber/10">
              <div className="flex items-start gap-3">
                <span className="text-lg shrink-0">💡</span>
                <div>
                  <h5 className="text-xs font-semibold text-accent-amber mb-1">
                    {{ es: 'Flujo típico', en: 'Typical flow' }[lang]}
                  </h5>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {lang === 'es' ? (
                      <>El código viaja de <strong className="text-text-primary">Local → Dev → Staging → Producción</strong>. Cada entorno tiene menos permisos y más estabilidad. Los pipelines de CI/CD automatizan este viaje.</>
                    ) : (
                      <>Code travels from <strong className="text-text-primary">Local → Dev → Staging → Production</strong>. Each environment has fewer permissions and more stability. CI/CD pipelines automate this journey.</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
