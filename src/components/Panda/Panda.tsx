import './Panda.scss';
import classNames from 'classnames';
import { Component, ReactNode } from 'react';

export class Panda extends Component<{ children?: ReactNode, hide?: boolean, eyeDown?: boolean }> {

     public render(): ReactNode {
          return (
               <div className={classNames({
                    'panda-container': true,
                    hide: this.props.hide,
                    down: this.props.eyeDown
               })}>
                    <div className="face">
                         <div className="face-container">
                              <div className="eyes">
                                   <div className="eye-detail">
                                        <div className="eye"></div>
                                   </div>
                                   <div className="eye-detail">
                                        <div className="eye"></div>
                                   </div>
                              </div>
                              <div className="nose"></div>

                         </div>
                    </div>
                    <div className="content">
                         {this.props.children}
                    </div>
                    <div className="feets">
                         <div className="feet">
                              <div className="base"></div>
                              <div className="main-base"></div>
                         </div>
                         <div className="feet">
                              <div className="base"></div>
                              <div className="main-base"></div>
                         </div>
                    </div>
               </div>
          );
     }
}