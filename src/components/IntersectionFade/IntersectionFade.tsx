import './IntersectionFade.scss';
import classNames from 'classnames';
import { Component, createRef, ReactNode } from 'react';

export class IntersectionFade extends Component<{ children: ReactNode, className?: string }> {

     private isVisible: boolean;
     private hostRef = createRef<HTMLDivElement>();

     public componentDidMount(): void {
          const observer = new IntersectionObserver((entries) => {
               entries.forEach(entry => this.setState(() => this.isVisible = entry.isIntersecting))
          });
          observer.observe(this.hostRef.current!);
     }


     public render(): ReactNode {
          return (
               <div className={classNames({
                    'fade-in-section': true,
                    visible: this.isVisible,

               }) + ` ${this.props.className || ''}`}
                    ref={this.hostRef}>
                    {this.props.children}
               </div>
          )
     }
}