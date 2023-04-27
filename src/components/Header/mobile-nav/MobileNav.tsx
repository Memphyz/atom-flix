import { ReactElement, useEffect, useState } from 'react';
import './MobileNav.scss';
import { Navigation } from '../../../core/models/Navigation';
import { BehaviorSubject } from 'rxjs';
import { className } from '../../../shared/utils/classname';
import { isMobile } from '../../..';
import { isMobileBrowser } from '../../../shared/utils/regex';

const BOTTOM_TIMEOUT = 4000;

export function MobileNav(props: {
  navigations: Navigation[],
  router: BehaviorSubject<string>
}): ReactElement {
  const [ show, setShow ] = useState(false);
  const [ timeoutId, setTimeoutId ] = useState(0);

  useEffect(() => {
    const root = document.getElementById('main-container') as HTMLDivElement;
    if (isMobileBrowser()) {
      root.ontouchstart = showWrapper;
      root.ontouchend = hideWrapper;
      return undefined;
    }
    root.onmouseenter = showWrapper;
    root.onmouseleave = hideWrapper;

  }, []);

  function showWrapper(): void {
    timeoutId && clearTimeout(timeoutId);
    setTimeoutId(0);
    setShow(true);
  }
  function hideWrapper(): void {
    setTimeoutId(setTimeout(() => {
      setTimeoutId(0);
      setShow(false);
    }, BOTTOM_TIMEOUT) as any as number);
  }

  return <div className={className({
    'mobile-component-wrapper': true,
    show
  })}>
    <div className="items-list-wrapper">
      {props.navigations.map((nav, i) => (
        <div className="item-mobile" style={{ order: nav.order }} key={i} onClick={() => props.router.next(nav.link)}>
          <div
            className="icon"
            style={{ WebkitMaskImage: `url(${ nav.icon })` }}
          />
          <label htmlFor={nav.text}>{nav.text}</label>
        </div>
      ))}
    </div>
  </div>
}