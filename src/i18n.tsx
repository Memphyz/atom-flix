import i18next, { t } from 'i18next'
import ptBR from './shared/translation/pt_BR.json'
import enUS from './shared/translation/en_US.json'
import { initReactI18next } from 'react-i18next'

export const resources = {
  'pt-BR': {
    translation: ptBR,
    name: () => t('PORTUGUESE')
  },
  'en-US': {
    translation: enUS,
    name: () => t('ENGLISH')

  }
}

i18next.use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || navigator.language,
  });

export default i18next;