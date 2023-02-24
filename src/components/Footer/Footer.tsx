import { ReactElement, useEffect, useState } from 'react';
import { SelectItem } from '../../core/models/SelectProps';
import { AvaliableLangs, Lang } from '../../shared/lang';
import { PTBR } from '../../shared/lang/pt-br';
import { Select } from '../Select/Select';
import { languageMap } from './../../shared/lang';
import './Footer.scss';

interface ILangs { id: number, lang: typeof PTBR, ISO: AvaliableLangs }

export function Footer(): ReactElement {

  const languages: SelectItem<ILangs>[] = Object.entries(languageMap).map(([key, value], index) => new SelectItem(value.name, { id: index, lang: value.value, ISO: key as AvaliableLangs }, key.substring(key.indexOf('-') + 1)));

  let [lang, setLang] = useState<ILangs>(null as any as ILangs)

  const onLangChange = (option: SelectItem<ILangs>): void => {
    setLang(option.value);
    Lang.change(option.value.ISO);
  }

  useEffect(() => {
    const navigatorLang: ILangs = languages.find(lang => lang.value.ISO === localStorage.getItem('lang'))?.value!;
    setLang(navigatorLang)
  }, [])

  return (
    <footer>
      <div className="container left-content">
        <div className="wrapper">
          <span>
            <label htmlFor={Lang.LANG.DEVELOPED_BY}>
              {Lang.LANG.DEVELOPED_BY}:{" "}
            </label>
            <label htmlFor="Lucas Ribeiro" translate="no">
              Lucas Ribeiro
            </label>
          </span>
          <span>
            <label htmlFor={Lang.LANG.FRAMEWORK_USED}>
              {Lang.LANG.FRAMEWORK_USED}:{" "}
            </label>
            <label htmlFor="React" translate="no">
              React
            </label>
          </span>
        </div>
      </div>
      <div className="container middle-content">
        <span>{Lang.LANG.APPLICATION_DESC}</span>
      </div>
      <div className="container right-content">
        <Select options={languages} onSelect={onLangChange} value={[lang, setLang]} idField='id' />
      </div>
    </footer>
  );
}
