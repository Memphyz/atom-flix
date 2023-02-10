import './Switcher.scss';
import classNames from 'classnames';
import { Component, ReactNode } from 'react';
import { AbstractControl, FormControl } from 'react-reactive-form';

export class Switcher extends Component<{ label?: string, control?: AbstractControl | FormControl }>  {

     private active = !!this.props.control?.value;

     public componentDidUpdate(prevProps: Readonly<{ label?: string | undefined; control?: AbstractControl | FormControl | undefined; }>, prevState: Readonly<{}>, snapshot?: any): void {
          this.props.control?.setValue(this.active);
     }

     public render(): ReactNode {
          return (
               <div className={classNames({
                    'switcher-container': true,
                    active: this.active
               })}>
                    <div className="switch-wrapper" onClick={() => this.setState(() => this.active = !this.active)}>
                         <div className="pill" >
                              <div className="round"></div>
                         </div>
                    </div>
                    <label htmlFor={this.props.label}>{this.props.label}</label>
               </div>
          )
     }
}