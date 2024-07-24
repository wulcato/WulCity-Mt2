import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import languageEN from './localization/en.json'
import languageTR from './localization/tr.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: languageEN,
            tr: languageTR
        },
        supportedLngs: ['en', 'tr'],
        fallbackLng: 'tr',
        debug: process.env.NODE_ENV === 'development',
        keySeparator: '.',
        interpolation: {
            formatSeparator: ','
        },
        react: {
            wait: true,
            bindI18n: 'languageChanged loaded',
            bindI18nStore: 'added removed',
            nsMode: 'default',
            useSuspense: true,
        }
    })

export default i18n
