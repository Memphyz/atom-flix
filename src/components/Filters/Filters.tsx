import './Filters.scss';
import { Language } from '../../assets/langs/lang';
import { Switcher } from '../Switcher/Switcher';
import { Component, ReactNode } from 'react';

export class Filters extends Component<{ onFilter?: (filters: unknown) => void }> {
     public render(): ReactNode {
          return (
               <div className="filters-container">
                    <div className="title">
                         <h2>{Language.LANG.FILTERS}:</h2>
                    </div>

                    <div className="filters-wrapper">
                         <div className="search">
                              <input type="text" maxLength={80} placeholder={Language.LANG.SEARCH} />
                         </div>
                         <div className="ckeckbox">
                              <Switcher label={Language.LANG.INCLUDE_ADULT} />
                         </div>
                         <button className="success">{Language.LANG.FILTER}</button>
                    </div>
               </div>
          )
     }
}