import { pipe, Record } from 'effect'
import i18next from 'i18next'
import { basename } from 'pathe'
// import LngDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = pipe(
  import.meta.glob<{ default: Record<string, string> }>('./i18n/*.json', { eager: true }),
  Record.mapKeys((key) => basename(key, '.json')),
  Record.map((mod) => Record.singleton('translation', mod.default)),
)

export const i18n = i18next
  // .use(LngDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    lng: 'en',
    fallbackLng: 'en',
    resources,
  })
