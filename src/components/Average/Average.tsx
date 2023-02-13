import './Average.scss';
import { Component, ReactNode } from 'react';

export class Average extends Component<{ average: number }> {

     private averageColor(): string {
          if (!this.props.average) {
               return 'N/A';
          }
          if (this.props.average < 40) {
               return 'red';
          }

          return this.props.average < 80 ? 'orange' : 'green'
     }

     public render(): ReactNode {
          return (
               <div className="average" average-vote={this.props.average ? Math.round(this.props.average) + '%' : 'N/A'} >
                    <svg>
                         <circle className="track"></circle>
                         <circle className="indicator" style={{ strokeDashoffset: 251.2 * ((100 - (this.props.average)) / 100) + 'px', stroke: this.averageColor() }}></circle>
                    </svg>
               </div>
          )
     }
}