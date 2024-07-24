import i18n from 'i18next'
import * as isDev from 'electron-is-dev'

import * as languageEN from '../src/localization/en.json'
import * as languageTR from '../src/localization/tr.json'

i18n.init({
    resources: {
        en: languageEN,
        tr: languageTR
    },
    supportedLngs: ['en', 'tr'],
    fallbackLng: 'tr',
    debug: isDev,
    keySeparator: '.',
    interpolation: {
        formatSeparator: ','
    },
})

export default i18n
