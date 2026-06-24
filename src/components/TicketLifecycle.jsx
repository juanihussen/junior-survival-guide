import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useLanguage } from '../context/LanguageContext'

const COLUMNS = [
  { id: 'BACKLOG', label: 'Backlog', color: 'text-gray-400', border: 'border-gray-500/30', bg: 'bg-gray-500/10', dot: 'bg-gray-400', desc: { es: 'Idea sin priorizar. El PO revisa acá las tareas y decide cuáles entran al sprint.', en: 'Unprioritized idea. The PO reviews tasks here and decides which go into the sprint.' }, icon: '📥' },
  { id: 'TO_DO', label: 'To Do', color: 'text-accent-amber', border: 'border-accent-amber/30', bg: 'bg-accent-amber/10', dot: 'bg-accent-amber', desc: { es: 'Ticket priorizado y listo para que un developer lo tome.', en: 'Prioritized ticket ready for a developer to pick up.' }, icon: '📋' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: 'text-accent-blue', border: 'border-accent-blue/30', bg: 'bg-accent-blue/10', dot: 'bg-accent-blue', desc: { es: 'El developer está trabajando activamente en el ticket.', en: 'The developer is actively working on the ticket.' }, icon: '👨‍💻' },
  { id: 'IN_REVIEW', label: 'In Review', color: 'text-accent-purple', border: 'border-accent-purple/30', bg: 'bg-accent-purple/10', dot: 'bg-accent-purple', desc: { es: 'Código listo. Se abre un Merge Request para que otro dev revise.', en: 'Code ready. A Merge Request is opened for another dev to review.' }, icon: '🔍' },
  { id: 'IN_QA', label: 'In QA', color: 'text-accent-emerald', border: 'border-accent-emerald/30', bg: 'bg-accent-emerald/10', dot: 'bg-accent-emerald', desc: { es: 'QA Engineer prueba el ticket: funcional, regresión, integración.', en: 'QA Engineer tests the ticket: functional, regression, integration.' }, icon: '🧪' },
  { id: 'APPROVED', label: 'Approved', color: 'text-accent-emerald', border: 'border-accent-emerald/30', bg: 'bg-accent-emerald/10', dot: 'bg-accent-emerald', desc: { es: 'QA validó el ticket. Listo para deploy a producción.', en: 'QA validated the ticket. Ready for production deploy.' }, icon: '✅' },
  { id: 'DONE', label: 'Done', color: 'text-green-400', border: 'border-green-400/30', bg: 'bg-green-400/10', dot: 'bg-green-400', desc: { es: 'Ticket desplegado en producción y funcionando correctamente.', en: 'Ticket deployed to production and working correctly.' }, icon: '🚀' },
]

const WEIGHT_OPTIONS = [1, 2, 3, 5, 8, 13, 21]

const WEIGHT_EXPLANATION = {
  1: { days: { es: '~4 horas', en: '~4 hours' }, senior: { es: '~2 horas', en: '~2 hours' }, label: { es: 'Trivial', en: 'Trivial' }, desc: { es: 'Cambio mínimo, sin riesgo.', en: 'Minimal change, no risk.' } },
  2: { days: { es: '~1 día', en: '~1 day' }, senior: { es: '~4 horas', en: '~4 hours' }, label: { es: 'Simple', en: 'Simple' }, desc: { es: 'Tarea acotada y conocida.', en: 'Well-defined, familiar task.' } },
  3: { days: { es: '~1.5 días', en: '~1.5 days' }, senior: { es: '~1 día', en: '~1 day' }, label: { es: 'Medium', en: 'Medium' }, desc: { es: 'Dificultad moderada, requiere atención.', en: 'Moderate difficulty, requires attention.' } },
  5: { days: { es: '~3 días', en: '~3 days' }, senior: { es: '~2 días', en: '~2 days' }, label: { es: 'Large', en: 'Large' }, desc: { es: 'Implica cambios en varias partes.', en: 'Involves changes across multiple areas.' } },
  8: { days: { es: '~1 semana', en: '~1 week' }, senior: { es: '~3 días', en: '~3 days' }, label: { es: 'Very Large', en: 'Very Large' }, desc: { es: 'Feature completa con integraciones.', en: 'Full feature with integrations.' } },
  13: { days: { es: '~1.5 semanas', en: '~1.5 weeks' }, senior: { es: '~1 semana', en: '~1 week' }, label: { es: 'Complex', en: 'Complex' }, desc: { es: 'Alta complejidad técnica o de dominio.', en: 'High technical or domain complexity.' } },
  21: { days: { es: '~2+ semanas', en: '~2+ weeks' }, senior: { es: '~1.5 semanas', en: '~1.5 weeks' }, label: { es: 'Very Complex', en: 'Very Complex' }, desc: { es: 'Requiere investigación y planificación.', en: 'Requires research and planning.' } },
}

const TICKET_TEMPLATES = [
  { title: { es: 'Login con Google OAuth', en: 'Google OAuth Login' }, weight: 5, context: { es: 'El equipo definió que la autenticación via OAuth es prioridad para Q2. Ya tenemos credenciales de Google Cloud configuradas.', en: 'The team decided OAuth authentication is a priority for Q2. We already have Google Cloud credentials configured.' }, files: ['src/auth/GoogleOAuth.jsx', 'src/pages/Login.jsx', 'src/config/oauth.js'], desc: { es: 'Implementar inicio de sesión mediante Google OAuth 2.0. El usuario debe poder autenticarse con su cuenta de Google y el sistema debe crear/mapear el usuario en nuestra DB.', en: 'Implement Google OAuth 2.0 login. The user must be able to authenticate with their Google account and the system must create/map the user in our DB.' } },
  { title: { es: 'Dashboard de métricas', en: 'Metrics Dashboard' }, weight: 8, context: { es: 'Los stakeholders necesitan visibilidad del rendimiento. Actualmente no hay dashboards. Se usará Chart.js para visualizaciones.', en: 'Stakeholders need performance visibility. Currently there are no dashboards. We will use Chart.js for visualizations.' }, files: ['src/pages/Dashboard.jsx', 'src/components/ChartWidget.jsx', 'src/hooks/useMetrics.js'], desc: { es: 'Crear un dashboard con KPIs clave: usuarios activos, revenue, conversion rate. Debe ser responsive y actualizarse cada 5 minutos.', en: 'Create a dashboard with key KPIs: active users, revenue, conversion rate. Must be responsive and refresh every 5 minutes.' } },
  { title: { es: 'Exportar reportes a PDF', en: 'Export Reports to PDF' }, weight: 3, context: { es: 'Muchos clientes pidieron poder descargar reportes. Ya tenemos jsPDF como dependencia.', en: 'Many clients requested the ability to download reports. We already have jsPDF as a dependency.' }, files: ['src/utils/pdfGenerator.js', 'src/components/ExportButton.jsx'], desc: { es: 'Agregar botón de exportar a PDF en las vistas de reportes. El PDF debe incluir tablas, gráficos y metadata.', en: 'Add export to PDF button in report views. The PDF must include tables, charts, and metadata.' } },
  { title: { es: 'Notificaciones push', en: 'Push Notifications' }, weight: 13, context: { es: 'Feature solicitada por Producto para mejorar engagement. Requiere service worker y configuración de Firebase Cloud Messaging.', en: 'Feature requested by Product to improve engagement. Requires service worker and Firebase Cloud Messaging setup.' }, files: ['src/service-worker.js', 'src/hooks/usePushNotifications.js', 'src/api/notifications.js'], desc: { es: 'Implementar notificaciones push para eventos: nuevo mensaje, alerta de sistema, recordatorios. Debe funcionar en mobile y desktop.', en: 'Implement push notifications for events: new message, system alert, reminders. Must work on mobile and desktop.' } },
  { title: { es: 'Modo oscuro', en: 'Dark Mode' }, weight: 5, context: { es: 'Issue reportado por usuarios. Queremos soporte completo de tema oscuro usando CSS variables.', en: 'Issue reported by users. We want full dark theme support using CSS variables.' }, files: ['src/styles/themes.js', 'src/hooks/useTheme.js', 'src/components/ThemeToggle.jsx'], desc: { es: 'Implementar modo oscuro con persistencia en localStorage. Todos los componentes deben respetar el tema actual.', en: 'Implement dark mode with localStorage persistence. All components must respect the current theme.' } },
  { title: { es: 'Filtros avanzados', en: 'Advanced Filters' }, weight: 3, context: { es: 'Los usuarios reportan que la búsqueda básica no es suficiente. Queremos filtros combinables.', en: 'Users report that basic search is not enough. We want combinable filters.' }, files: ['src/components/FilterBar.jsx', 'src/hooks/useFilters.js'], desc: { es: 'Agregar filtros por fecha, categoría, estado y búsqueda por texto. Los filtros deben ser combinables y persistir en la URL.', en: 'Add filters by date, category, status, and text search. Filters must be combinable and persist in the URL.' } },
  { title: { es: 'Arreglar bug de login', en: 'Fix Login Bug' }, weight: 2, context: { es: 'Bug reportado en producción: el login falla con usuarios que tienen caracteres especiales en el email.', en: 'Bug reported in production: login fails for users with special characters in their email.' }, files: ['src/api/auth.js', 'src/utils/validation.js'], desc: { es: 'El endpoint de login no escapa correctamente caracteres especiales en el email. Reproducirlo y aplicar fix.', en: 'The login endpoint does not properly escape special characters in the email. Reproduce and apply fix.' } },
  { title: { es: 'Integración con Stripe', en: 'Stripe Integration' }, weight: 13, context: { es: 'Feature crítica para el negocio. Necesitamos procesar pagos con Stripe. El equipo de backend ya preparó los webhooks.', en: 'Critical business feature. We need to process payments with Stripe. The backend team already prepared webhooks.' }, files: ['src/api/payments.js', 'src/components/CheckoutForm.jsx', 'src/pages/PaymentSuccess.jsx'], desc: { es: 'Integrar Stripe Elements para checkout. Manejar subscripciones, pagos únicos y webhooks de confirmación.', en: 'Integrate Stripe Elements for checkout. Handle subscriptions, one-time payments, and confirmation webhooks.' } },
  { title: { es: 'Refactor de componentes', en: 'Component Refactor' }, weight: 8, context: { es: 'Deuda técnica acumulada. Varios componentes tienen más de 500 líneas y lógica mezclada.', en: 'Accumulated technical debt. Several components have over 500 lines and mixed logic.' }, files: ['src/components/UserList.jsx', 'src/components/UserForm.jsx', 'src/components/UserCard.jsx'], desc: { es: 'Dividir componentes monolíticos en piezas más pequeñas y reutilizables. Aplicar patrones de composición.', en: 'Split monolithic components into smaller, reusable pieces. Apply composition patterns.' } },
  { title: { es: 'Testing E2E del checkout', en: 'Checkout E2E Testing' }, weight: 5, context: { es: 'El flujo de checkout es crítico y no tiene cobertura de tests. Usaremos Cypress.', en: 'The checkout flow is critical and has no test coverage. We will use Cypress.' }, files: ['cypress/e2e/checkout.cy.js', 'cypress/fixtures/payment-mock.js'], desc: { es: 'Escribir tests E2E del flujo completo de checkout: carrito, formulario de pago, confirmación y errores.', en: 'Write E2E tests for the full checkout flow: cart, payment form, confirmation, and errors.' } },
  { title: { es: 'Migrar a TypeScript', en: 'Migrate to TypeScript' }, weight: 21, context: { es: 'Iniciativa del equipo para mejorar la calidad del código. Se migrarán los archivos gradualmente.', en: 'Team initiative to improve code quality. Files will be migrated gradually.' }, files: ['tsconfig.json', 'src/**/*.{js,jsx}'], desc: { es: 'Configurar TypeScript en el proyecto y migrar los componentes principales. Empezar por tipos compartidos y utils.', en: 'Set up TypeScript in the project and migrate main components. Start with shared types and utils.' } },
]

const EXAMPLE_BRANCHES = {
  feature: 'feat/TICKET-42-login-google-oauth',
  bugfix: 'fix/TICKET-17-email-validation',
  hotfix: 'hotfix/TICKET-8-critical-auth-fix',
  refactor: 'refactor/TICKET-23-component-split',
}

let ticketCounter = 0

function generateTicket(lang) {
  const template = TICKET_TEMPLATES[ticketCounter % TICKET_TEMPLATES.length]
  ticketCounter++
  const num = ticketCounter
  const id = `TICKET-${num}`
  const slug = (typeof template.title === 'string' ? template.title : template.title[lang])
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return {
    id: `ticket-${num}`,
    number: num,
    ticketId: id,
    title: template.title,
    weight: template.weight,
    description: template.desc,
    context: template.context,
    files: [...template.files],
    column: 'BACKLOG',
    relatedTickets: num > 1 ? [`TICKET-${Math.max(1, num - 2)}`, `TICKET-${Math.max(1, num - 1)}`].filter((v, i, a) => a.indexOf(v) === i) : [],
    mr: null,
    branch: `feat/${id}-${slug}`,
  }
}

function generateMR(ticket, lang) {
  const title = typeof ticket.title === 'string' ? ticket.title : ticket.title[lang]
  const context = typeof ticket.context === 'string' ? ticket.context : ticket.context[lang]
  const desc = {
    es: `## ¿Qué hace este MR?\n\nImplementa ${title}.\n\n## ¿Por qué?\n\n${context.split('.')[0]}.\n\n## ¿Cómo se probó?\n\n- [ ] Tests unitarios pasan\n- [ ] Test manual en staging\n- [ ] No rompe features existentes`,
    en: `## What does this MR do?\n\nImplements ${title}.\n\n## Why?\n\n${context.split('.')[0]}.\n\n## How was it tested?\n\n- [ ] Unit tests pass\n- [ ] Manual test on staging\n- [ ] Does not break existing features`,
  }
  const evidenceLabel = {
    es: 'Captura de pantalla — Vista principal',
    en: 'Screenshot — Main view',
  }
  const evidenceTest = {
    es: 'Tests unitarios — Todos verdes',
    en: 'Unit tests — All green',
  }
  const evidenceResult = {
    es: 'Linter — Sin errores',
    en: 'Linter — No errors',
  }
  return {
    branch: ticket.branch,
    description: desc[lang],
    evidence: [
      { type: 'image', label: evidenceLabel[lang], src: '📸' },
      { type: 'test', label: evidenceTest[lang], src: '✅' },
      { type: 'result', label: evidenceResult[lang], src: '✅' },
    ],
    relatedTickets: ticket.relatedTickets,
    reviewers: ['@tech-lead', '@senior-dev'],
  }
}

export default function TicketLifecycle() {
  const { lang } = useLanguage()
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showWeightGuide, setShowWeightGuide] = useState(false)

  const createTicket = useCallback(() => {
    const newTicket = generateTicket(lang)
    setTickets(prev => [...prev, newTicket])
  }, [lang])

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return

    const { draggableId, destination } = result
    const destColumn = destination.droppableId

    setTickets(prev => {
      const updated = prev.map(t => {
        if (t.id === draggableId) {
          const newTicket = { ...t, column: destColumn }
          if (destColumn === 'IN_REVIEW' && !newTicket.mr) {
            newTicket.mr = generateMR(newTicket, lang)
          }
          return newTicket
        }
        return t
      })
      return updated
    })
  }, [])

  useEffect(() => {
    if (selectedTicket) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedTicket])

  const openTicket = useCallback((ticket) => {
    setSelectedTicket(ticket)
  }, [])

  const closeTicket = useCallback(() => {
    setSelectedTicket(null)
  }, [])

  const deleteTicket = useCallback((e, ticketId) => {
    e.stopPropagation()
    setTickets(prev => prev.filter(t => t.id !== ticketId))
    if (selectedTicket?.id === ticketId) setSelectedTicket(null)
  }, [selectedTicket])

  const ticketsByColumn = COLUMNS.reduce((acc, col) => {
    acc[col.id] = tickets.filter(t => t.column === col.id)
    return acc
  }, {})

  return (
    <section id="tickets" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/3 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-blue/10 text-accent-blue border border-accent-blue/20 mb-4">
            {{ es: 'Módulo 1 — Interactivo', en: 'Module 1 — Interactive' }[lang]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{{ es: 'Tablero Kanban', en: 'Kanban Board' }[lang]}</h2>
          <p className="text-gray-400">{{ es: 'Creá tickets y arrastralos por las columnas para simular el flujo de trabajo', en: 'Create tickets and drag them across columns to simulate the workflow' }[lang]}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <button
            onClick={createTicket}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 border border-accent-blue/30 transition-all flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            {{ es: 'Crear Ticket', en: 'Create Ticket' }[lang]}
          </button>
          {tickets.length > 0 && (
            <span className="text-xs text-gray-500 font-mono">
              {tickets.length} {lang === 'es' ? `ticket${tickets.length !== 1 ? 's' : ''} en el board` : `ticket${tickets.length !== 1 ? 's' : ''} on the board`}
            </span>
          )}
        </motion.div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
            {COLUMNS.map(col => {
              const colTickets = ticketsByColumn[col.id] || []
              return (
                <div
                  key={col.id}
                  className="min-w-[220px] w-[220px] md:min-w-[240px] md:w-[240px] lg:min-w-[260px] lg:w-[260px] shrink-0 snap-start"
                >
                  <div className={`glass rounded-xl p-3 h-full flex flex-col`}>
                    <div className="group/tooltip relative flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                        <span className={`text-xs font-semibold ${col.color}`}>{col.label}</span>
                        <span className="text-[11px] opacity-0 group-hover/tooltip:opacity-60 transition-opacity">{col.icon}</span>
                      </div>
                      <span className={`text-[10px] font-mono ${col.color} opacity-60`}>
                        {colTickets.length}
                      </span>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-20 w-56">
                        <div className="bg-surface-card border border-white/10 rounded-xl px-4 py-3 shadow-xl text-center">
                          <p className="text-xs text-gray-300 leading-relaxed">{col.desc[lang]}</p>
                        </div>
                      </div>
                    </div>

                    <Droppable droppableId={col.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 min-h-[120px] space-y-2 rounded-lg p-1 transition-colors ${
                            snapshot.isDraggingOver ? 'bg-white/5' : ''
                          }`}
                        >
                          {colTickets.map((ticket, index) => (
                            <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                              {(provided, snapshot) => {
                                const ticketCard = (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => openTicket(ticket)}
                                    className={`rounded-lg p-3 cursor-pointer transition-all group ${
                                      snapshot.isDragging
                                        ? 'shadow-2xl shadow-accent-blue/20 scale-105'
                                        : 'hover:bg-white/[0.08]'
                                    } ${
                                      snapshot.isDragging ? 'bg-surface-card border border-white/10' : 'glass'
                                    }`}
                                    style={{
                                      ...provided.draggableProps.style,
                                      zIndex: snapshot.isDragging ? 9999 : undefined,
                                      width: snapshot.isDragging ? provided.draggableProps.style?.width : undefined,
                                    }}
                                  >
                                    <div className="flex items-start justify-between gap-2 mb-1.5">
                                      <span className="text-[10px] font-mono text-gray-500 shrink-0">
                                        {ticket.ticketId}
                                      </span>
                                      <button
                                        onClick={(e) => deleteTicket(e, ticket.id)}
                                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-accent-rose transition-all text-xs leading-none p-0.5"
                                          title={{ es: 'Eliminar ticket', en: 'Delete ticket' }[lang]}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                      <h4 className="text-xs font-semibold leading-snug mb-2 line-clamp-2">
                                        {typeof ticket.title === 'string' ? ticket.title : ticket.title[lang]}
                                      </h4>
                                    <div className="flex items-center gap-2">
                                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                        ticket.weight <= 3 ? 'bg-accent-emerald/10 text-accent-emerald' :
                                        ticket.weight <= 8 ? 'bg-accent-amber/10 text-accent-amber' :
                                        'bg-accent-rose/10 text-accent-rose'
                                      }`}>
                                        {ticket.weight}pt
                                      </span>
                                      {ticket.mr && (
                                        <span className="text-[10px] text-accent-purple/70">🔀 MR</span>
                                      )}
                                    </div>
                                  </div>
                                )

                                if (snapshot.isDragging) {
                                  return createPortal(ticketCard, document.body)
                                }
                                return ticketCard
                              }}
                            </Draggable>
                          ))}
                          {tickets.length === 0 && col.id === 'TODO' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex flex-col items-center justify-center py-8 text-center"
                            >
                              <div className="text-3xl mb-2">📋</div>
                              <h3 className="text-sm font-semibold mb-1">{{ es: 'No hay tickets todavía', en: 'No tickets yet' }[lang]}</h3>
                              <p className="text-gray-400 text-xs max-w-[180px] leading-relaxed">
                                {lang === 'es' ? (
                                  <>Hacé click en <strong className="text-accent-blue">"Crear Ticket"</strong> para empezar</>
                                ) : (
                                  <>Click <strong className="text-accent-blue">"Create Ticket"</strong> to get started</>
                                )}
                              </p>
                            </motion.div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              )
            })}
          </div>
        </DragDropContext>

        <AnimatePresence>
          {selectedTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-20 overflow-y-auto"
              onClick={closeTicket}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative glass rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-500">{selectedTicket.ticketId}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        COLUMNS.find(c => c.id === selectedTicket.column)?.dot || 'bg-gray-400'
                      }`} />
                      <span className={`text-[10px] font-mono ${
                        COLUMNS.find(c => c.id === selectedTicket.column)?.color || 'text-gray-400'
                      }`}>
                        {COLUMNS.find(c => c.id === selectedTicket.column)?.label || selectedTicket.column}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold">{typeof selectedTicket.title === 'string' ? selectedTicket.title : selectedTicket.title[lang]}</h3>
                  </div>
                  <button
                    onClick={closeTicket}
                    className="text-gray-500 hover:text-gray-200 transition-colors text-lg leading-none p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="bg-white/5 rounded-xl p-4">
                    <button
                      onClick={() => setShowWeightGuide(!showWeightGuide)}
                      className="flex items-center gap-2 w-full"
                    >
                      <span className="text-sm">📊</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {{ es: `Weight: ${selectedTicket.weight} puntos`, en: `Weight: ${selectedTicket.weight} points` }[lang]}
                      </span>
                      <span className="text-[10px] text-gray-500 ml-auto">
                        {showWeightGuide ? '▼' : '▶'} {{ es: '¿Qué significa?', en: 'What does it mean?' }[lang]}
                      </span>
                    </button>
                    <AnimatePresence>
                      {showWeightGuide && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-white/5 space-y-3">
                            <p className="text-xs text-gray-400 leading-relaxed">
                              {lang === 'es' ? (
                                <>El <strong className="text-accent-blue">Weight</strong> (o peso) representa la complejidad y esfuerzo estimado del ticket. Se basa en la secuencia de Fibonacci (1, 2, 3, 5, 8, 13, 21) porque la diferencia entre valores crece con la complejidad — es más fácil acordar entre 3 y 5 que entre 17 y 18.</>
                              ) : (
                                <>The <strong className="text-accent-blue">Weight</strong> represents the estimated complexity and effort of the ticket. It's based on the Fibonacci sequence (1, 2, 3, 5, 8, 13, 21) because the gap between values grows with complexity — it's easier to agree on 3 vs 5 than 17 vs 18.</>
                              )}
                            </p>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              {lang === 'es' ? (
                                <>Una misma tarea puede ser <strong className="text-accent-amber">3 puntos</strong> para un Senior que ya conoce el código, pero <strong className="text-accent-amber">5 u 8 puntos</strong> para un Junior que recién se incorpora. El weight no es tiempo exacto, es <em>complejidad relativa</em>.</>
                              ) : (
                                <>The same task could be <strong className="text-accent-amber">3 points</strong> for a Senior who knows the codebase, but <strong className="text-accent-amber">5 or 8 points</strong> for a Junior who just joined. Weight is not exact time, it's <em>relative complexity</em>.</>
                              )}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {WEIGHT_OPTIONS.map(w => {
                                const info = WEIGHT_EXPLANATION[w]
                                const isCurrent = w === selectedTicket.weight
                                return (
                                  <div
                                    key={w}
                                    className={`text-[11px] p-2 rounded-lg ${
                                      isCurrent
                                        ? 'bg-accent-blue/15 ring-1 ring-accent-blue/30'
                                        : 'bg-white/5'
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                      <span className={`font-mono font-semibold ${
                                        isCurrent ? 'text-accent-blue' : 'text-gray-400'
                                      }`}>
                                        {w}pt
                                      </span>
                                      <span className="text-gray-500">— {info.label[lang]}</span>
                                      {isCurrent && <span className="text-accent-blue text-[10px]">{{ es: '← actual', en: '← current' }[lang]}</span>}
                                    </div>
                                    <p className="text-gray-500">{info.desc[lang]}</p>
                                    <p className="text-gray-500 mt-0.5">
                                      <span className="text-accent-emerald/70">{{ es: 'Senior:', en: 'Senior:' }[lang]}</span> {info.senior[lang]}
                                      {' · '}
                                      <span className="text-accent-amber/70">{{ es: 'Junior:', en: 'Junior:' }[lang]}</span> {info.days[lang]}
                                    </p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">📝</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {{ es: 'Descripción', en: 'Description' }[lang]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.03] rounded-lg p-3">
                      {typeof selectedTicket.description === 'string' ? selectedTicket.description : selectedTicket.description[lang]}
                    </p>
                    <div className="mt-2 text-[10px] text-gray-500 px-3">
                      {lang === 'es' ? (
                        <>Describe <em>qué</em> hay que hacer y <em>cómo se espera que funcione</em>. Una buena descripción incluye el comportamiento esperado y criterios de aceptación.</>
                      ) : (
                        <>Describe <em>what</em> needs to be done and <em>how it should work</em>. A good description includes expected behavior and acceptance criteria.</>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">🗺️</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {{ es: 'Contexto', en: 'Context' }[lang]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.03] rounded-lg p-3">
                      {typeof selectedTicket.context === 'string' ? selectedTicket.context : selectedTicket.context[lang]}
                    </p>
                    <div className="mt-2 text-[10px] text-gray-500 px-3">
                      {lang === 'es' ? (
                        <>Explica el <em>por qué</em> de este ticket: qué problema resuelve, qué lo motivó, y cómo se relaciona con el producto.</>
                      ) : (
                        <>Explain the <em>why</em> of this ticket: what problem it solves, what motivated it, and how it relates to the product.</>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">📁</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {{ es: 'Archivos a tocar', en: 'Files to touch' }[lang]}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {selectedTicket.files.map((file, i) => (
                        <div key={i} className="text-xs font-mono text-gray-400 bg-white/[0.03] rounded-lg px-3 py-1.5 flex items-center gap-2">
                          <span className="text-accent-blue/70">└─</span>
                          {file}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-[10px] text-gray-500 px-3">
                      {lang === 'es' ? (
                        <>Archivos que <em>probablemente</em> necesiten cambios. Sirve para estimar el alcance y planificar la implementación.</>
                      ) : (
                        <>Files that will <em>likely</em> need changes. Helps estimate scope and plan implementation.</>
                      )}
                    </div>
                  </div>

                  {selectedTicket.relatedTickets.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">🔗</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {{ es: 'Tickets relacionados', en: 'Related Tickets' }[lang]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTicket.relatedTickets.map((rt, i) => (
                          <span key={i} className="px-2 py-1 rounded text-xs font-mono bg-accent-blue/10 text-accent-blue">
                            {rt}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 text-[10px] text-gray-500 px-3">
                        {lang === 'es' ? (
                          <>Tickets que están <em>relacionados</em> (bloquean, son bloqueados, o comparten alcance). Ayuda a entender el impacto del cambio.</>
                        ) : (
                          <>Tickets that are <em>related</em> (block, are blocked by, or share scope). Helps understand the impact of the change.</>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedTicket.mr ? (
                    <div className="border-t border-white/5 pt-5">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm">🔀</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">
                          {{ es: 'Merge Request — En revisión', en: 'Merge Request — In review' }[lang]}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-accent-purple/5 rounded-xl p-4 border border-accent-purple/10">
                          <div className="flex items-center gap-2 mb-2">
                            <span>🌿</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                              {{ es: 'Rama', en: 'Branch' }[lang]}
                            </span>
                          </div>
                          <code className="text-xs font-mono text-accent-purple bg-white/5 rounded-lg px-3 py-2 block">
                            {selectedTicket.mr.branch}
                          </code>
                          <div className="mt-2 text-[10px] text-gray-500">
                            {lang === 'es' ? (
                              <>La rama sigue el formato{' '}<code className="text-[10px] font-mono text-accent-purple/70">tipo/TICKET-N-descripcion</code>. Ejemplos:</>
                            ) : (
                              <>The branch follows the format{' '}<code className="text-[10px] font-mono text-accent-purple/70">type/TICKET-N-description</code>. Examples:</>
                            )}
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {Object.entries(EXAMPLE_BRANCHES).map(([type, branch]) => (
                                <span key={type} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                                  {branch}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span>📝</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                              {{ es: 'Descripción del MR', en: 'MR Description' }[lang]}
                            </span>
                          </div>
                          <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap bg-black/30 rounded-lg p-3 leading-relaxed">
                            {selectedTicket.mr.description}
                          </pre>
                          <div className="mt-2 text-[10px] text-gray-500">
                            {lang === 'es' ? (
                              <>Un buen MR explica el <em>qué</em>, <em>por qué</em>, y <em>cómo se probó</em>. Facilita la revisión y acelera el approval.</>
                            ) : (
                              <>A good MR explains the <em>what</em>, <em>why</em>, and <em>how it was tested</em>. It makes review easier and speeds up approval.</>
                            )}
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <span>📸</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                              {{ es: 'Evidencia', en: 'Evidence' }[lang]}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {selectedTicket.mr.evidence.map((ev, i) => (
                              <div key={i} className="flex items-center gap-3 text-xs bg-white/[0.03] rounded-lg p-3">
                                <span className="text-base">{ev.src}</span>
                                <div>
                                  <p className="text-gray-300">{ev.label}</p>
                                  <p className="text-[10px] text-gray-500">
                                    {{ es: {
                                      image: 'Captura de pantalla que muestra el resultado visual.',
                                      test: 'Resultado de los tests automatizados.',
                                      result: 'Output de herramientas de calidad.',
                                    }, en: {
                                      image: 'Screenshot showing the visual result.',
                                      test: 'Automated test results.',
                                      result: 'Quality tool output.',
                                    } }[lang][ev.type]}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 text-[10px] text-gray-500">
                            {lang === 'es' ? (
                              <>La evidencia puede incluir screenshots, videos, logs de tests, o resultados de herramientas (linter, cobertura, etc.). Ayuda al revisor a validar sin tener que correr el código.</>
                            ) : (
                              <>Evidence can include screenshots, videos, test logs, or tool results (linter, coverage, etc.). Helps the reviewer validate without having to run the code.</>
                            )}
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <span>👥</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                              {{ es: 'Revisores', en: 'Reviewers' }[lang]}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedTicket.mr.reviewers.map((r, i) => (
                              <span key={i} className="px-2 py-1 rounded text-xs font-mono bg-accent-purple/10 text-accent-purple">
                                {r}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2 text-[10px] text-gray-500">
                            {lang === 'es' ? (
                              <>Los revisores son developers senior que revisan el código, sugieren cambios y finalmente aprueban (o rechazan) el MR.</>
                            ) : (
                              <>Reviewers are senior developers who review the code, suggest changes, and ultimately approve (or reject) the MR.</>
                            )}
                          </div>
                        </div>

                        <div className="bg-accent-blue/5 rounded-xl p-4 border border-accent-blue/10">
                          <div className="flex items-center gap-2 mb-2">
                            <span>💡</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                              {{ es: '¿Qué es un Merge Request?', en: 'What is a Merge Request?' }[lang]}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {lang === 'es' ? (
                              <>Un <strong>Merge Request</strong> (MR) o <strong>Pull Request</strong> (PR) es una solicitud para integrar tu código a la rama principal del proyecto. No es solo código: es una <em>conversación</em> donde explicas qué hiciste, por qué, y otros developers lo revisan. Es la instancia más importante de <em>code review</em>.</>
                            ) : (
                              <>A <strong>Merge Request</strong> (MR) or <strong>Pull Request</strong> (PR) is a request to merge your code into the project's main branch. It's not just code: it's a <em>conversation</em> where you explain what you did, why, and other developers review it. It's the most important instance of <em>code review</em>.</>
                            )}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                            <div className="bg-white/[0.03] rounded-lg p-2.5">
                              <p className="text-[11px] font-semibold text-accent-emerald mb-1">{{ es: '✅ Buen MR', en: '✅ Good MR' }[lang]}</p>
                              <p className="text-[10px] text-gray-400">{{ es: 'Cambios pequeños, mensaje claro, tests incluidos', en: 'Small changes, clear message, tests included' }[lang]}</p>
                            </div>
                            <div className="bg-white/[0.03] rounded-lg p-2.5">
                              <p className="text-[11px] font-semibold text-accent-rose mb-1">{{ es: '❌ Mal MR', en: '❌ Bad MR' }[lang]}</p>
                              <p className="text-[10px] text-gray-400">{{ es: '500 archivos cambiados, sin descripción, sin tests', en: '500 files changed, no description, no tests' }[lang]}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedTicket.column === 'IN_REVIEW' ? (
                    <div className="border-t border-white/5 pt-5 text-center py-6">
                      <div className="text-3xl mb-2">🔄</div>
                      <p className="text-sm text-gray-400">
                        {{ es: 'Generando Merge Request...', en: 'Generating Merge Request...' }[lang]}
                      </p>
                    </div>
                  ) : (
                    <div className="border-t border-white/5 pt-4">
                      <div className="bg-white/[0.03] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span>🔀</span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {{ es: 'Merge Request', en: 'Merge Request' }[lang]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {lang === 'es' ? (
                            <>El Merge Request se genera automáticamente cuando arrastres este ticket a la columna <span className="text-accent-purple">"In Review"</span>. Incluirá la rama, descripción, evidencia y revisores.</>
                          ) : (
                            <>The Merge Request is automatically generated when you drag this ticket to the <span className="text-accent-purple">"In Review"</span> column. It will include the branch, description, evidence, and reviewers.</>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
