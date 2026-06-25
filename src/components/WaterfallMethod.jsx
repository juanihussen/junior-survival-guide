import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function WaterfallMethod() {
  const { lang } = useLanguage()

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
            {{ es: 'Metodología Tradicional', en: 'Traditional Methodology' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Waterfall</h2>
          <p className="text-text-secondary">
            {{ es: 'Modelo secuencial — diseño, desarrollo, testing y despliegue en etapas rígidas', en: 'Sequential model — design, development, testing, and deployment in rigid stages' }[lang]}
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
              <span className="text-2xl">🏗️</span>
              <h3 className="text-lg font-bold">
                {{ es: '¿Qué es en cristiano?', en: 'What is it in plain English?' }[lang]}
              </h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {lang === 'es' ? (
                <>Imaginate construir una casa. Primero dibujás todos los planos (<strong>diseño</strong>), después comprás los materiales (<strong>planificación</strong>), después construís (<strong>desarrollo</strong>), después revisás que todo esté bien (<strong>testing</strong>), y finalmente te mudás (<strong>despliegue</strong>). No podés cambiar de opinión a mitad de obra sin que salga carísimo. Eso es Waterfall: una etapa atrás de la otra, sin vuelta atrás.</>
              ) : (
                <>Imagine building a house. First you draw all the blueprints (<strong>design</strong>), then you buy materials (<strong>planning</strong>), then you build (<strong>development</strong>), then you check everything (<strong>testing</strong>), and finally you move in (<strong>deployment</strong>). You can't change your mind halfway through without it costing a fortune. That's Waterfall: one stage after another, no going back.</>
              )}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">👨‍💻</span>
              <h3 className="text-lg font-bold">
                {{ es: 'El día a día para un Junior', en: 'Day to day for a Junior' }[lang]}
              </h3>
            </div>
            <ul className="space-y-2">
              {[
                { es: 'Vas a leer mucha documentación antes de escribir una línea de código. Requisitos, especificaciones, diseños aprobados.', en: 'You will read a lot of documentation before writing a line of code. Requirements, specs, approved designs.' },
                { es: 'El código que escribas hoy puede que no se ejecute hasta dentro de meses, cuando todo esté integrado.', en: 'The code you write today may not run for months, until everything is integrated.' },
                { es: 'Los cambios de último momento son traumáticos. Si un requisito cambia, puede implicar rediseñar y reescribir todo.', en: 'Last-minute changes are traumatic. If a requirement changes, it may mean redesigning and rewriting everything.' },
                { es: 'Vas a depender de otros equipos: los que diseñaron antes que vos, los que testean después. Hay mucha espera.', en: 'You will depend on other teams: those who designed before you, those who test after. Lots of waiting.' },
              ].map((item, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0" />
                  {item[lang]}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏛️</span>
              <h3 className="text-lg font-bold">
                {{ es: '¿Cuándo se usa?', en: 'When is it used?' }[lang]}
              </h3>
            </div>
            <ul className="space-y-2">
              {[
                { es: 'Proyectos gubernamentales: licitaciones con alcance y presupuesto cerrado, donde los requisitos están definidos por ley.', en: 'Government projects: tenders with fixed scope and budget, where requirements are defined by law.' },
                { es: 'Sistemas bancarios legacy: proyectos de migración donde cada cambio requiere aprobación regulatoria y no se puede iterar rápido.', en: 'Legacy banking systems: migration projects where every change requires regulatory approval and you cannot iterate fast.' },
                { es: 'Proyectos con presupuesto fijo: cuando el cliente necesita saber exactamente cuánto va a costar todo antes de empezar.', en: 'Fixed-budget projects: when the client needs to know exactly how much everything will cost before starting.' },
                { es: 'Equipos tercerizados con contratos cerrados: alcance inamovible, entregas pactadas y penalizaciones por cambios.', en: 'Outsourced teams with closed contracts: fixed scope, agreed deliveries, and penalties for changes.' },
              ].map((item, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0" />
                  {item[lang]}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-accent-blue/5 rounded-2xl p-6 md:p-8 border border-accent-blue/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">💡</span>
              <div>
                <h4 className="text-sm font-semibold text-accent-blue mb-2">
                  {{ es: 'Pro-Tip de Entrevista', en: 'Interview Pro-Tip' }[lang]}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {lang === 'es' ? (
                    <>Si te preguntan por Waterfall en una entrevista, no digas que es "malo". Decí: <strong className="text-white">"Es un modelo predictivo útil cuando los requisitos son estables y el alcance está cerrado. Su riesgo principal es que los errores se descubren tarde, porque no hay retroalimentación temprana del cliente. Hoy se usa en proyectos con regulaciones estrictas o presupuestos fijos."</strong> Esto muestra que entendés el contexto, no solo la teoría.</>
                  ) : (
                    <>If asked about Waterfall in an interview, don't say it's "bad". Say: <strong className="text-white">"It's a predictive model useful when requirements are stable and scope is fixed. Its main risk is that errors are discovered late because there's no early client feedback. Today it's used in projects with strict regulations or fixed budgets."</strong> This shows you understand context, not just theory.</>
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
