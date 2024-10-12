import i18next from 'i18next'
// import LngDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

export const i18n = i18next
  // .use(LngDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: false,
    resources: {
      en: {
        translation: {
          Reversi: 'Reversi',
          'Play with friend': 'Play with friend',
          Restart: 'Restart',
          'Play Again?': 'Play Again?',
          Score: 'Score',
          Hint: 'Hint',
          'Allow Retract': 'Allow Retract',
          'AI Version': 'AI Version',
        },
      },
      'zh-TW': {
        translation: {
          Reversi: '黑白棋',
          'Play with friend': '跟朋友同樂',
          Restart: '重新',
          'Play Again?': '再來一局？',
          Score: '記分板',
          Hint: '顯示提示',
          'Allow Retract': '允許悔棋',
          'AI Version': 'AI 版本',
        },
      },
    },
  })
