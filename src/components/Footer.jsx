import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { lang } = useLanguage()

  const brand = { es: 'Junior Survival Guide', en: 'Junior Survival Guide' }
  const tagline = {
    es: 'Hecho por un dev, para devs. — Proyecto de Portfolio',
    en: 'Made by a dev, for devs. — Portfolio Project',
  }

  return (
    <footer className="border-t border-white/5 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 rounded-full bg-accent-blue" />
          {brand[lang]}
        </div>
        <p className="text-xs text-gray-600">
          {tagline[lang]}
        </p>
      </div>
    </footer>
  )
}
