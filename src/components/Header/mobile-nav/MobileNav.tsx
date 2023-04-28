import { ReactElement, useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { Navigation } from '../../../core/models/Navigation';
import { className } from '../../../shared/utils/classname';
import './MobileNav.scss';

const BOTTOM_TIMEOUT = 10000;

export function MobileNav(props: {
  navigations: Navigation[],
  router: BehaviorSubject<string>
}): ReactElement {
  const [ show, setShow ] = useState(false);
  const [ timeoutId, setTimeoutId ] = useState(0);

  useEffect(() => {
    const root = document.getElementById('root') as HTMLDivElement;
    showWrapper();
    root.onscroll = (): void => {
      if (root.scrollTop <= (root.scrollHeight * 0.60)) {
        showWrapper();
      } else {
        hideWrapper();
      }
    };
    hideWrapper();
  }, []);

  function showWrapper(): void {
    if (timeoutId) {
      return undefined;
    }
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