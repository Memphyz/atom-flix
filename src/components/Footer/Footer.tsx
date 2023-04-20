import i18next, { t } from 'i18next';
import { ReactElement, useEffect, useState } from 'react';
import { SelectItem } from '../../core/models/SelectProps';
import { resources } from '../../i18n';
import { Select } from '../Select/Select';
import './Footer.scss';
import { languageChange } from '../..';

export function Footer(): ReactElement {

  const languages: SelectItem<string>[] = Object.entries(resources).map(([ lang, value ]) => new SelectItem(value.name(), lang));

  let [ lang, setLang ] = useState<string>(i18next.language)

  const onLangChange = (option: SelectItem<string>): void => {
    i18next.changeLanguage(option.value, () => languageChange.next(option.value));
  }

  useEffect(() => {
    const navigatorLang: string = languages.find(lang => lang.value === localStorage.getItem('lang'))?.value!;
    setLang(navigatorLang)
  }, [])

  return (
    <footer>
      <div className="container left-content">
        <div className="wrapper">
          <span>
            <label htmlFor={t('DEVELOPED_BY')}>
              {t('DEVELOPED_BY') as string}:{" "}
            </label>
            <label htmlFor="Lucas Ribeiro" translate="no">
              Lucas Ribeiro
            </label>
          </span>
          <span>
            <label htmlFor={t('FRAMEWORK_USED')}>
              {t('FRAMEWORK_USED') as string}:{" "}
            </label>
            <label htmlFor="React" translate="no">
              React
            </label>
          </span>
        </div>
      </div>
      <div className="container middle-content">
        <span>{t('APPLICATION_DESC') as string}</span>
      </div>
      <div className="container right-content">
        <Select options={languages} onSelect={onLangChange} value={[ lang, setLang ]} />
      </div>
    </footer>
  );
}
