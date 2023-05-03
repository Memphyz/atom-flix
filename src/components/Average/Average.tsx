import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import './Average.scss';

export function Average(props: { average: number }): ReactElement {

  function getAverageColor() {
    const averagePercent = props.average * 100;
    if (averagePercent <= 30) {
      return 'red';
    }
    return averagePercent > 30 && averagePercent < 70 ? 'orange' : 'green';
  }

  const [ percentage, setPergentage ] = useState(0);

  return <div className='average-wrapper' style={{ '--percentage': (props.average * 10) + '%', '--color': getAverageColor() } as CSSProperties}>
  </div>
}