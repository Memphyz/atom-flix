import { ReactElement, createRef, useEffect } from 'react';
import './List.scss'
import { PTBR } from '../../shared/lang/pt-br';
import { SyntheticEvent } from 'react';
import { useState } from 'react';
import { className } from '../../shared/utils/classname';

export function List(props: {
  customClass?: string,
  title: string,
  id: string,
  component: (props: { listContainerId: string }) => ReactElement,
}): ReactElement {
  const listContainer = createRef<HTMLDivElement>();
  const [ scrolledRightFinal, setScrolledRightFinal ] = useState(false)

  function onScroll(event: SyntheticEvent): void {
    const container = event.nativeEvent.target as HTMLDivElement;
    const percentAfter = listContainer.current.offsetWidth * 0.24
    const scrollWidth = container.scrollWidth - container.offsetWidth - percentAfter;
    setScrolledRightFinal(scrollWidth <= container.scrollLeft)
  }

  function click(event: SyntheticEvent<HTMLDivElement, PointerEvent>) {
    scrollRight(event);
  }

  function scrollRight(event: SyntheticEvent<HTMLDivElement, PointerEvent>): void {
    if (scrolledRightFinal) {
      return undefined;
    }
    const SCROLL_LENGTH = listContainer.current.clientWidth + 23;
    const container = (event.nativeEvent.target as HTMLElement).querySelector(`#${ props.id }`) as HTMLElement;
    if (container.scrollLeft + SCROLL_LENGTH < container.scrollWidth) {
      container.scroll({
        left: container.scrollLeft + SCROLL_LENGTH, behavior: 'smooth'
      });
      return undefined;
    }
    container.scroll({
      left: container.scrollWidth, behavior: 'smooth'
    });
  }

  return (
    <div ref={listContainer} className={className({
      list: true,
      [ props.customClass ]: props.customClass,
      'final-right': scrolledRightFinal
    })} onClick={click as any}>
      <h3>{props.title}</h3>
      <div className='cards' onScroll={onScroll} id={props.id}>
        {props.component({ listContainerId: props.id })}
      </div>
    </div>)
}