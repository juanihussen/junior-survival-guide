import { useLanguage } from '../context/LanguageContext'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STAGES = [
  { id: 'checkout', label: { es: 'Checkout', en: 'Checkout' }, icon: '📦' },
  { id: 'build', label: { es: 'Build', en: 'Build' }, icon: '🔨' },
  { id: 'unit_tests', label: { es: 'Tests Unitarios', en: 'Unit Tests' }, icon: '🧪' },
  { id: 'integration', label: { es: 'Tests de Integración', en: 'Integration Tests' }, icon: '🔗' },
  { id: 'code_quality', label: { es: 'Calidad de Código', en: 'Code Quality' }, icon: '📊' },
  { id: 'deploy', label: { es: 'Despliegue', en: 'Deploy' }, icon: '🚀' },
]

const FAIL_SCENARIOS = [
  { stage: 'unit_tests', msg: { es: '❌ Tests fallaron: falta cobertura en el módulo de auth', en: '❌ Tests failed: missing coverage in auth module' }, step: 2 },
  { stage: 'integration', msg: { es: '❌ Tests de integración fallaron: endpoint /users retorna 500', en: '❌ Integration tests failed: endpoint /users returns 500' }, step: 3 },
  { stage: 'code_quality', msg: { es: '❌ Code Quality: duplicación de código detectada (12% threshold)', en: '❌ Code Quality: code duplication detected (12% threshold)' }, step: 4 },
  { stage: 'unit_tests', msg: { es: '❌ Tests unitarios: 3 assertions fallaron en payment.spec.ts', en: '❌ Unit tests: 3 assertions failed in payment.spec.ts' }, step: 2 },
  { stage: 'build', msg: { es: '❌ Build failed: error de compilación en TypeScript', en: '❌ Build failed: compilation error in TypeScript' }, step: 1 },
]

const PASS_MESSAGES = [
  { es: '✅ Checkout — rama mergeada correctamente', en: '✅ Checkout — branch merged successfully' },
  { es: '✅ Build — compilación exitosa sin warnings', en: '✅ Build — successful compilation with no warnings' },
  { es: '✅ Unit Tests — 142 tests, 0 failures, 87% coverage', en: '✅ Unit Tests — 142 tests, 0 failures, 87% coverage' },
  { es: '✅ Integration Tests — 56 tests, 0 failures', en: '✅ Integration Tests — 56 tests, 0 failures' },
  { es: '✅ Code Quality — 96/100, ningún blocker', en: '✅ Code Quality — 96/100, no blockers' },
  { es: '✅ Deploy — versión 2.4.1 desplegada en producción', en: '✅ Deploy — version 2.4.1 deployed to production' },
]

export default function PipelineView() {
  const { lang } = useLanguage()
  const [running, setRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [logs, setLogs] = useState([])
  const [finished, setFinished] = useState(false)
  const [failScenario, setFailScenario] = useState(null)

  const runPipeline = useCallback(() => {
    setRunning(true)
    setCurrentStep(-1)
    setLogs([])
    setFinished(false)
    setFailScenario(null)

    const shouldFail = Math.random() < 0.4
    const scenario = shouldFail
      ? FAIL_SCENARIOS[Math.floor(Math.random() * FAIL_SCENARIOS.length)]
      : null

    STAGES.forEach((stage, i) => {
      setTimeout(() => {
        setCurrentStep(i)

        if (shouldFail && scenario && i === scenario.step) {
          setFailScenario(scenario)
          setLogs(prev => [...prev, { type: 'step', stage: stage.id, text: `⚙️ ${stage.icon} ${stage.label[lang]}...` }])
          setTimeout(() => {
            setLogs(prev => [...prev, { type: 'fail', text: scenario.msg[lang] }])
            setRunning(false)
          }, 800)
          return
        }

        setLogs(prev => [...prev, { type: 'success', text: PASS_MESSAGES[i][lang] }])

        if (i === STAGES.length - 1) {
          setTimeout(() => {
            setRunning(false)
            setFinished(true)
          }, 500)
        }
      }, (i + 1) * 700)
    })
  }, [lang])

  const retryPipeline = () => {
    setRunning(false)
    setCurrentStep(-1)
    setLogs([])
    setFinished(false)
    setFailScenario(null)
  }

  return (
    <section id="pipeline" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/3 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-4">
            {{ es: 'Módulo 3', en: 'Module 3' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{{ es: 'CI/CD', en: 'CI/CD' }[lang]}</h2>
          <p className="text-gray-400">{{ es: 'Pipeline de integración y despliegue automatizado', en: 'Automated integration and deployment pipeline' }[lang]}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono text-gray-500">{{ es: 'Estado del Pipeline', en: 'Pipeline Status' }[lang]}</h3>
            {!running && !finished && !failScenario && (
              <button
                onClick={runPipeline}
                className="px-5 py-2 rounded-xl text-sm font-medium bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30 border border-accent-purple/30 transition-all"
              >
                ▶ {{ es: 'Ejecutar Pipeline', en: 'Run Pipeline' }[lang]}
              </button>
            )}
            {(finished || failScenario) && (
              <button
                onClick={retryPipeline}
                className="px-5 py-2 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
              >
                🔄 {{ es: 'Reiniciar', en: 'Reset' }[lang]}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {STAGES.map((stage, i) => {
              const isActive = i === currentStep && !failScenario
              const isPast = i < currentStep && !failScenario
              const isFail = failScenario && i === failScenario.step
              const isPastFail = failScenario && i <= failScenario.step
              const isPending = !isPast && !isActive && !isFail && !isPastFail

              return (
                <div key={stage.id} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
                      isActive
                        ? 'bg-accent-purple/20 border-accent-purple/40 text-accent-purple animate-pulse'
                        : isFail
                        ? 'bg-accent-rose/20 border-accent-rose/40 text-accent-rose'
                        : isPast || isPastFail
                        ? 'bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald'
                        : 'bg-gray-800/50 border-gray-700/30 text-gray-500'
                    }`}
                  >
                    <span>{stage.icon}</span>
                    <span>{stage.label[lang]}</span>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className={`w-3 h-px ${isPast || (failScenario && i < failScenario.step) ? 'bg-accent-emerald/50' : 'bg-gray-700/50'}`} />
                  )}
                </div>
              )
            })}
          </div>

          {running && (
            <div className="flex items-center gap-2 text-xs text-accent-purple mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping" />
              {{ es: 'Ejecutando pipeline...', en: 'Running pipeline...' }[lang]}
            </div>
          )}

          {failScenario && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30 text-accent-rose text-sm mb-4"
            >
              <div className="font-semibold mb-1">{{ es: 'Pipeline Falló', en: 'Pipeline Failed' }[lang]}</div>
              <div>{failScenario.msg[lang]}</div>
              <div className="mt-2 text-xs text-gray-400">
                {{ es: 'Tip: Revisá los logs, corregí el error y ejecutá el pipeline de nuevo.', en: 'Tip: Check the logs, fix the error, and run the pipeline again.' }[lang]}
              </div>
            </motion.div>
          )}

          {finished && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald text-sm mb-4"
            >
              <div className="font-semibold mb-1">{{ es: '✅ Pipeline Exitoso', en: '✅ Pipeline Successful' }[lang]}</div>
              <div>{{ es: 'Versión 2.4.1 desplegada en producción.', en: 'Version 2.4.1 deployed to production.' }[lang]}</div>
            </motion.div>
          )}

          {logs.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">{{ es: 'Registros', en: 'Logs' }[lang]}</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto font-mono text-xs">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-1.5 rounded ${
                        log.type === 'fail'
                          ? 'text-accent-rose bg-accent-rose/5'
                          : log.type === 'step'
                          ? 'text-accent-purple'
                          : 'text-accent-emerald'
                      }`}
                    >
                      $ {new Date().toLocaleTimeString()} — {log.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
