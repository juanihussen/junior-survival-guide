import { useLanguage } from '../context/LanguageContext'

export const sections = [
  { id: 'tickets', label: { es: 'Tickets', en: 'Tickets' } },
  { id: 'roles', label: { es: 'Roles', en: 'Roles' } },
  { id: 'metodologias', label: { es: 'Metodologías', en: 'Methodologies' } },
  { id: 'pipeline', label: { es: 'CI/CD', en: 'CI/CD' } },
  { id: 'entornos', label: { es: 'Entornos', en: 'Environments' } },
  { id: 'entrevistas', label: { es: 'Entrevistas', en: 'Interviews' } },
]

export default function SectionTabs({ activeSection, onSelect }) {
  const { lang } = useLanguage()

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="glass rounded-xl px-2 py-1.5 flex flex-wrap items-center justify-center gap-1">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === s.id
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            {s.label[lang]}
          </button>
        ))}
      </div>
    </div>
  )
}
