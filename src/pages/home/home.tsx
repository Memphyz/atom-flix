import { ReactElement } from 'react';
import { Lang } from '../../shared/lang';
import './home.scss';

export function Home(): ReactElement {
  return (
    <div className="main-home-content">
      <div className="banner">
        {Lang.currentLang}
      </div>
    </div>
  );
}