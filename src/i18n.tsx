import i18next, { t } from 'i18next'
import ptBR from './shared/translation/pt_BR.json'
import enUS from './shared/translation/en_US.json'
import { initReactI18next } from 'react-i18next'

export const resources = {
  pt_BR: {
    translation: ptBR,
    name: () => t('PORTUGUESE')
  },
  en_US: {
    translation: enUS,
    name: () => t('ENGLISH')

  }
}

i18next.use(initReactI18next)
  .init({
    resources,
    lng: 'pt_BR'
  });

export default i18next;