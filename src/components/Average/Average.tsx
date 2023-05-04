import { CSSProperties, ReactElement, createRef, useEffect, useState } from 'react';
import './Average.scss';

export function Average(props: { average: number }): ReactElement {
  const [ rounded, setRounded ] = useState(Math.round(props.average * 10))
  const [ percentage, setPergentage ] = useState(0);
  const ref = createRef<HTMLDivElement>();

  function getAverageColor() {
    const averagePercent = props.average * 100;
    if (averagePercent <= 30) {
      return 'red';
    }
    return averagePercent > 30 && averagePercent < 70 ? 'orange' : 'green';
  }


  useEffect(() => {
    const round = Math.round(props.average * 10);
    if (round !== rounded) {
      setRounded(round);
    }
    let percent = 0
    const intervalId = setInterval(() => {
      const diff = (props.average * 0.02);
      percent += diff;
      setPergentage(Math.round(percent))
    }, 1);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 2000)
  }, [ props.average ])


  return props.average !== null && props.average !== undefined && <div className='average-wrapper' ref={ref} average-value={`${ rounded }%`} style={{ '--percentage': percentage + '%', '--color': getAverageColor() } as CSSProperties} >
  </div>
}