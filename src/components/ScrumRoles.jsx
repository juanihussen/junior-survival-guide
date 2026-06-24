import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const ROLE_GROUPS = [
  {
    label: { es: 'Dirección', en: 'Management' },
    roles: [
      {
        id: 'ceo',
        title: { es: 'CEO', en: 'CEO' },
        emoji: '💼',
        color: 'accent-amber',
        desc: { es: 'Chief Executive Officer. Lidera la visión estratégica de la empresa.', en: 'Chief Executive Officer. Leads the strategic vision of the company.' },
        responsibilities: [
          { es: 'Define la visión y estrategia de la empresa', en: 'Defines company vision and strategy' },
          { es: 'Toma decisiones de alto nivel', en: 'Makes high-level decisions' },
          { es: 'Gestiona relaciones con inversores y stakeholders', en: 'Manages investor and stakeholder relations' },
          { es: 'Establece la cultura organizacional', en: 'Establishes organizational culture' },
          { es: 'Aprueba presupuestos y recursos', en: 'Approves budgets and resources' },
        ],
        tools: ['Slack', 'Notion', 'Board of Directors'],
        level: 'executive',
      },
      {
        id: 'cto',
        title: { es: 'CTO', en: 'CTO' },
        emoji: '🔬',
        color: 'accent-purple',
        desc: { es: 'Chief Technology Officer. Define la estrategia tecnológica de la organización.', en: 'Chief Technology Officer. Defines the technology strategy of the organization.' },
        responsibilities: [
          { es: 'Define la visión tecnológica de la empresa', en: 'Defines the company\'s technology vision' },
          { es: 'Lidera equipos de ingeniería', en: 'Leads engineering teams' },
          { es: 'Evalúa e incorpora nuevas tecnologías', en: 'Evaluates and adopts new technologies' },
          { es: 'Gestiona la deuda técnica organizacional', en: 'Manages organizational tech debt' },
          { es: 'Participa en decisiones estratégicas de producto', en: 'Participates in strategic product decisions' },
        ],
        tools: ['AWS', 'GitHub Enterprise', 'Architecture Diagrams'],
        level: 'executive',
      },
      {
        id: 'pm',
        title: { es: 'Product Manager', en: 'Product Manager' },
        emoji: '📊',
        color: 'accent-blue',
        desc: { es: 'Define la estrategia del producto basada en datos, mercado y necesidades del usuario.', en: 'Defines product strategy based on data, market, and user needs.' },
        responsibilities: [
          { es: 'Define la hoja de ruta del producto', en: 'Defines the product roadmap' },
          { es: 'Analiza métricas y datos de uso', en: 'Analyzes metrics and usage data' },
          { es: 'Realiza investigación de mercado', en: 'Conducts market research' },
          { es: 'Coordina con equipos de desarrollo y diseño', en: 'Coordinates with development and design teams' },
          { es: 'Toma decisiones basadas en ROI', en: 'Makes ROI-based decisions' },
        ],
        tools: ['Amplitude', 'Mixpanel', 'Figma', 'Jira'],
        level: 'management',
      },
      {
        id: 'tl',
        title: { es: 'Team Leader', en: 'Team Leader' },
        emoji: '👥',
        color: 'accent-emerald',
        desc: { es: 'Lidera un equipo de developers. Organiza el trabajo y fomenta el crecimiento profesional.', en: 'Leads a team of developers. Organizes work and fosters professional growth.' },
        responsibilities: [
          { es: 'Asigna tareas y distribuye la carga de trabajo', en: 'Assigns tasks and distributes workload' },
          { es: 'Realiza 1:1s con cada miembro del equipo', en: 'Holds 1:1s with each team member' },
          { es: 'Evalúa el desempeño del equipo', en: 'Evaluates team performance' },
          { es: 'Fomenta un ambiente de trabajo saludable', en: 'Fosters a healthy work environment' },
          { es: 'Desbloquea a su equipo para que pueda entregar', en: 'Unblocks the team to deliver' },
        ],
        tools: ['Jira', 'Notion', 'Google Calendar'],
        level: 'management',
      },
    ],
  },
  {
    label: { es: 'Producto & Diseño', en: 'Product & Design' },
    roles: [
      {
        id: 'po',
        title: { es: 'Product Owner', en: 'Product Owner' },
        emoji: '🎯',
        color: 'accent-amber',
        desc: { es: 'Dueño del producto. Define qué construir y prioriza el backlog.', en: 'Product owner. Defines what to build and prioritizes the backlog.' },
        responsibilities: [
          { es: 'Define la visión y objetivos del producto', en: 'Defines product vision and goals' },
          { es: 'Prioriza el Product Backlog', en: 'Prioritizes the Product Backlog' },
          { es: 'Toma decisiones sobre alcance', en: 'Makes scope decisions' },
          { es: 'Representa al cliente/stakeholders', en: 'Represents clients/stakeholders' },
          { es: 'Acepta o rechaza funcionalidades', en: 'Accepts or rejects features' },
        ],
        tools: ['Jira', 'Notion', 'Product Roadmap'],
        level: 'product',
      },
      {
        id: 'uxui',
        title: { es: 'UX/UI Designer', en: 'UX/UI Designer' },
        emoji: '🎨',
        color: 'accent-rose',
        desc: { es: 'Diseña la experiencia de usuario y la interfaz visual del producto.', en: 'Designs the user experience and visual interface of the product.' },
        responsibilities: [
          { es: 'Realiza investigación de usuarios', en: 'Conducts user research' },
          { es: 'Crea prototipos y wireframes', en: 'Creates prototypes and wireframes' },
          { es: 'Diseña interfaces accesibles y usables', en: 'Designs accessible and usable interfaces' },
          { es: 'Define sistemas de diseño', en: 'Defines design systems' },
          { es: 'Colabora con developers en la implementación', en: 'Collaborates with developers on implementation' },
        ],
        tools: ['Figma', 'Sketch', 'Adobe XD', 'Maze'],
        level: 'product',
      },
    ],
  },
  {
    label: { es: 'Arquitectura & Liderazgo Técnico', en: 'Architecture & Technical Leadership' },
    roles: [
      {
        id: 'architect',
        title: { es: 'Architect', en: 'Architect' },
        emoji: '🏗️',
        color: 'accent-purple',
        desc: { es: 'Diseña la arquitectura de software a gran escala y define los estándares técnicos.', en: 'Designs large-scale software architecture and defines technical standards.' },
        responsibilities: [
          { es: 'Diseña la arquitectura del sistema', en: 'Designs system architecture' },
          { es: 'Define estándares y patrones de diseño', en: 'Defines standards and design patterns' },
          { es: 'Evalúa trade-offs técnicos', en: 'Evaluates technical trade-offs' },
          { es: 'Documenta decisiones arquitectónicas (ADRs)', en: 'Documents architectural decisions (ADRs)' },
          { es: 'Asegura escalabilidad y mantenibilidad', en: 'Ensures scalability and maintainability' },
        ],
        tools: ['Draw.io', 'Notion', 'AWS Well-Architected'],
        level: 'engineering',
      },
      {
        id: 'techlead',
        title: { es: 'Tech Lead', en: 'Tech Lead' },
        emoji: '🧠',
        color: 'accent-purple',
        desc: { es: 'Líder técnico. Define arquitectura, revisa código y guía al equipo.', en: 'Technical leader. Defines architecture, reviews code, and guides the team.' },
        responsibilities: [
          { es: 'Define la arquitectura del sistema', en: 'Defines system architecture' },
          { es: 'Revisa Pull Requests críticos', en: 'Reviews critical Pull Requests' },
          { es: 'Toma decisiones técnicas', en: 'Makes technical decisions' },
          { es: 'Mentorea a devs juniors', en: 'Mentors junior devs' },
          { es: 'Garantiza calidad y buenas prácticas', en: 'Ensures quality and best practices' },
        ],
        tools: ['GitHub', 'AWS', 'SonarQube', 'Figma'],
        level: 'engineering',
      },
      {
        id: 'texpert',
        title: { es: 'Technical Expert', en: 'Technical Expert' },
        emoji: '🧪',
        color: 'accent-blue',
        desc: { es: 'Experto en tecnologías específicas. Resuelve los problemas más complejos.', en: 'Expert in specific technologies. Solves the most complex problems.' },
        responsibilities: [
          { es: 'Resuelve bugs críticos y complejos', en: 'Fixes critical and complex bugs' },
          { es: 'Investiga e implementa nuevas tecnologías', en: 'Researches and implements new technologies' },
          { es: 'Define guías y estándares técnicos', en: 'Defines technical guides and standards' },
          { es: 'Hace troubleshooting de alto nivel', en: 'Performs high-level troubleshooting' },
          { es: 'Comparte conocimiento mediante charlas y docs', en: 'Shares knowledge through talks and docs' },
        ],
        tools: ['Kibana', 'Datadog', 'Postman', 'Wireshark'],
        level: 'engineering',
      },
    ],
  },
  {
    label: { es: 'Desarrollo', en: 'Development' },
    roles: [
      {
        id: 'senior',
        title: { es: 'Senior Developer', en: 'Senior Developer' },
        emoji: '⚡',
        color: 'accent-blue',
        desc: { es: 'Dev con experiencia. Resuelve problemas complejos y revisa PRs.', en: 'Experienced dev. Solves complex problems and reviews PRs.' },
        responsibilities: [
          { es: 'Implementa features complejas', en: 'Implements complex features' },
          { es: 'Review de PRs de juniors', en: 'Reviews junior PRs' },
          { es: 'Refactoring y deuda técnica', en: 'Refactoring and tech debt' },
          { es: 'Contribuye a estándares del equipo', en: 'Contributes to team standards' },
          { es: 'Ayuda en estimaciones y planning', en: 'Helps with estimates and planning' },
        ],
        tools: ['VS Code', 'Git', 'Docker', 'Postman'],
        level: 'engineering',
      },
      {
        id: 'backend',
        title: { es: 'Back-end Developer', en: 'Back-end Developer' },
        emoji: '⚙️',
        color: 'accent-blue',
        desc: { es: 'Desarrolla la lógica del servidor, APIs y bases de datos.', en: 'Develops server logic, APIs, and databases.' },
        responsibilities: [
          { es: 'Diseña e implementa APIs REST/GraphQL', en: 'Designs and implements REST/GraphQL APIs' },
          { es: 'Modela y optimiza bases de datos', en: 'Models and optimizes databases' },
          { es: 'Escribe tests de integración y unitarios', en: 'Writes integration and unit tests' },
          { es: 'Implementa lógica de negocio', en: 'Implements business logic' },
          { es: 'Asegura rendimiento y seguridad del servidor', en: 'Ensures server performance and security' },
        ],
        tools: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
        level: 'engineering',
      },
      {
        id: 'frontend',
        title: { es: 'Front-end Developer', en: 'Front-end Developer' },
        emoji: '🖌️',
        color: 'accent-amber',
        desc: { es: 'Construye la interfaz de usuario con HTML, CSS y frameworks modernos.', en: 'Builds the user interface with HTML, CSS, and modern frameworks.' },
        responsibilities: [
          { es: 'Implementa interfaces de usuario', en: 'Implements user interfaces' },
          { es: 'Conecta frontend con APIs', en: 'Connects frontend with APIs' },
          { es: 'Optimiza rendimiento del lado del cliente', en: 'Optimizes client-side performance' },
          { es: 'Asegura accesibilidad y responsive design', en: 'Ensures accessibility and responsive design' },
          { es: 'Escribe tests de componentes', en: 'Writes component tests' },
        ],
        tools: ['React', 'Vue', 'Tailwind', 'Storybook'],
        level: 'engineering',
      },
      {
        id: 'fullstack',
        title: { es: 'Full-stack Developer', en: 'Full-stack Developer' },
        emoji: '🔄',
        color: 'accent-emerald',
        desc: { es: 'Trabaja tanto en frontend como backend, de principio a fin.', en: 'Works on both frontend and backend, end to end.' },
        responsibilities: [
          { es: 'Desarrolla features completas (front + back)', en: 'Develops complete features (front + back)' },
          { es: 'Diseña y consume APIs', en: 'Designs and consumes APIs' },
          { es: 'Trabaja con bases de datos y caché', en: 'Works with databases and cache' },
          { es: 'Despliega y monitorea aplicaciones', en: 'Deploys and monitors applications' },
          { es: 'Entiende todo el stack de principio a fin', en: 'Understands the full stack end to end' },
        ],
        tools: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
        level: 'engineering',
      },
      {
        id: 'junior',
        title: { es: 'Junior Developer', en: 'Junior Developer' },
        emoji: '🌱',
        color: 'accent-emerald',
        desc: { es: 'Dev en crecimiento. Aprende, pregunta y entrega código con supervisión.', en: 'Growing dev. Learns, asks questions, and delivers code with guidance.' },
        responsibilities: [
          { es: 'Implementa features con guidance', en: 'Implements features with guidance' },
          { es: 'Escribe tests unitarios', en: 'Writes unit tests' },
          { es: 'Aprende el stack tecnológico', en: 'Learns the tech stack' },
          { es: 'Pide ayuda cuando está bloqueado', en: 'Asks for help when blocked' },
          { es: 'Participa en ceremonias activamente', en: 'Actively participates in ceremonies' },
        ],
        tools: ['VS Code', 'Git', 'npm', 'Chrome DevTools'],
        level: 'engineering',
      },
    ],
  },
  {
    label: { es: 'Infraestructura & Calidad', en: 'Infrastructure & Quality' },
    roles: [
      {
        id: 'devops',
        title: { es: 'DevOps', en: 'DevOps' },
        emoji: '🚀',
        color: 'accent-emerald',
        desc: { es: 'Automatiza infraestructura, CI/CD y deployment de aplicaciones.', en: 'Automates infrastructure, CI/CD, and application deployment.' },
        responsibilities: [
          { es: 'Configura y mantiene pipelines de CI/CD', en: 'Configures and maintains CI/CD pipelines' },
          { es: 'Automatiza la infraestructura (IaC)', en: 'Automates infrastructure (IaC)' },
          { es: 'Gestiona contenedores y orquestación', en: 'Manages containers and orchestration' },
          { es: 'Monitorea la salud de los sistemas', en: 'Monitors system health' },
          { es: 'Optimiza costos de infraestructura', en: 'Optimizes infrastructure costs' },
        ],
        tools: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
        level: 'infra',
      },
      {
        id: 'sysadmin',
        title: { es: 'SysAdmin', en: 'SysAdmin' },
        emoji: '🖥️',
        color: 'accent-blue',
        desc: { es: 'Administra servidores, redes y sistemas operativos de la empresa.', en: 'Manages company servers, networks, and operating systems.' },
        responsibilities: [
          { es: 'Configura y mantiene servidores', en: 'Configures and maintains servers' },
          { es: 'Gestiona usuarios y permisos', en: 'Manages users and permissions' },
          { es: 'Monitorea rendimiento del sistema', en: 'Monitors system performance' },
          { es: 'Realiza backups y planes de recuperación', en: 'Performs backups and recovery plans' },
          { es: 'Mantiene la seguridad de la infraestructura', en: 'Maintains infrastructure security' },
        ],
        tools: ['Linux', 'Ansible', 'Nagios', 'Bash'],
        level: 'infra',
      },
      {
        id: 'cyber',
        title: { es: 'CyberSecurity', en: 'CyberSecurity' },
        emoji: '🔒',
        color: 'accent-rose',
        desc: { es: 'Protege sistemas y datos contra amenazas y vulnerabilidades.', en: 'Protects systems and data against threats and vulnerabilities.' },
        responsibilities: [
          { es: 'Realiza auditorías de seguridad', en: 'Performs security audits' },
          { es: 'Implementa políticas de seguridad', en: 'Implements security policies' },
          { es: 'Responde a incidentes de seguridad', en: 'Responds to security incidents' },
          { es: 'Realiza penetration testing', en: 'Performs penetration testing' },
          { es: 'Capacita al equipo en buenas prácticas', en: 'Trains the team in best practices' },
        ],
        tools: ['Burp Suite', 'Metasploit', 'Wireshark', 'Nessus'],
        level: 'infra',
      },
      {
        id: 'qa',
        title: { es: 'QA Engineer', en: 'QA Engineer' },
        emoji: '🔍',
        color: 'accent-rose',
        desc: { es: 'Aseguramiento de calidad. Prueba cada cambio antes de producción.', en: 'Quality assurance. Tests every change before production.' },
        responsibilities: [
          { es: 'Diseña casos de prueba', en: 'Designs test cases' },
          { es: 'Ejecuta pruebas manuales y automáticas', en: 'Runs manual and automated tests' },
          { es: 'Reporta bugs claramente', en: 'Reports bugs clearly' },
          { es: 'Verifica correcciones', en: 'Verifies fixes' },
          { es: 'Automatiza tests regresivos', en: 'Automates regression tests' },
        ],
        tools: ['Selenium', 'Cypress', 'Postman', 'Jira'],
        level: 'infra',
      },
    ],
  },
  {
    label: { es: 'Agilidad', en: 'Agility' },
    roles: [
      {
        id: 'sm',
        title: { es: 'Scrum Master', en: 'Scrum Master' },
        emoji: '🛡️',
        color: 'accent-emerald',
        desc: { es: 'Facilitador del equipo. Elimina blockers y protege el proceso Scrum.', en: 'Team facilitator. Removes blockers and protects the Scrum process.' },
        responsibilities: [
          { es: 'Facilita las ceremonias Scrum', en: 'Facilitates Scrum ceremonies' },
          { es: 'Elimina impedimentos del equipo', en: 'Removes team impediments' },
          { es: 'Protege al equipo de distracciones', en: 'Protects the team from distractions' },
          { es: 'Coach en agilidad y mejora continua', en: 'Coaches on agility and continuous improvement' },
          { es: 'Asegura que se sigan las reglas Scrum', en: 'Ensures Scrum rules are followed' },
        ],
        tools: ['Jira', 'Miro', 'Retrospectives'],
        level: 'agile',
      },
    ],
  },
]

const LEVEL_LABELS = {
  executive: { es: 'Ejecutivo', en: 'Executive' },
  management: { es: 'Management', en: 'Management' },
  product: { es: 'Producto & Diseño', en: 'Product & Design' },
  engineering: { es: 'Ingeniería', en: 'Engineering' },
  infra: { es: 'Infraestructura & Calidad', en: 'Infrastructure & Quality' },
  agile: { es: 'Agilidad', en: 'Agility' },
}

const LEVEL_COLORS = {
  executive: 'accent-amber',
  management: 'accent-blue',
  product: 'accent-rose',
  engineering: 'accent-purple',
  infra: 'accent-emerald',
  agile: 'accent-amber',
}

export default function ScrumRoles() {
  const { lang } = useLanguage()
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const allRoles = ROLE_GROUPS.flatMap(g => g.roles)

  const filteredGroups = filter === 'all'
    ? ROLE_GROUPS
    : ROLE_GROUPS.map(g => ({
        ...g,
        roles: g.roles.filter(r => r.level === filter),
      })).filter(g => g.roles.length > 0)

  return (
    <section id="roles" className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-emerald/3 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 mb-4">
            {lang === 'es' ? 'Módulo 2' : 'Module 2'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {lang === 'es' ? 'Roles en la Industria' : 'Roles in the Industry'}
          </h2>
          <p className="text-gray-400">
            {lang === 'es' ? 'Conocé todos los roles clave de un equipo de software' : 'Discover all the key roles in a software team'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => { setSelected(null); setFilter('all') }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-white/15 text-white'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            {lang === 'es' ? `Todos (${allRoles.length})` : `All (${allRoles.length})`}
          </button>
          {Object.entries(LEVEL_LABELS).map(([key, label]) => {
            const count = allRoles.filter(r => r.level === key).length
            return (
              <button
                key={key}
                onClick={() => { setSelected(null); setFilter(key) }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === key
                    ? 'bg-white/15 text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {label[lang]} ({count})
              </button>
            )
          })}
        </motion.div>

        {filteredGroups.map((group, gi) => (
          <div key={group.label} className="mb-10">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 px-1"
            >
              {group.label[lang]}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {group.roles.map((role, i) => (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(selected === role.id ? null : role.id)}
                  className={`glass rounded-xl p-5 text-left transition-all ${
                    selected === role.id
                      ? `ring-2 ring-offset-2 ring-offset-surface ring-${role.color}/50`
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="text-2xl shrink-0 mt-0.5">{role.emoji}</div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm">{role.title[lang]}</h3>
                      <span className={`text-[10px] font-mono text-${role.color}/70`}>
                        {LEVEL_LABELS[role.level][lang]}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed pl-11">{role.desc[lang]}</p>

                  <AnimatePresence>
                    {selected === role.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/5 pl-11">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                            {lang === 'es' ? 'Responsabilidades' : 'Responsibilities'}
                          </h4>
                          <ul className="space-y-1.5 mb-4">
                            {role.responsibilities.map((r, j) => (
                              <li key={j} className="text-xs text-gray-400 flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-current mt-1.5 shrink-0" />
                                {r[lang]}
                              </li>
                            ))}
                          </ul>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                            {lang === 'es' ? 'Herramientas' : 'Tools'}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {role.tools.map(t => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </motion.div>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-500 mt-4"
        >
          {lang === 'es' ? 'Hacé click en cada rol para ver más detalles' : 'Click on each role to see more details'}
        </motion.p>
      </div>
    </section>
  )
}
