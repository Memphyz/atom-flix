import './Modal.scss';
import { icons } from '../../assets/icons/icons';
import { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export class Modal extends Component<{ open: boolean, children: ReactNode, onClose: () => any }> {


     public render(): ReactNode {
          return this.props.open ? ReactDOM.createPortal((
               <div className="atom-modal">
                    <div className="content">
                         <span className='close' onClick={this.props.onClose}><div className="icon" style={{
                              WebkitMaskImage: `url(${icons.close})`
                         }}></div></span>
                         {this.props.children}

                    </div>
               </div>
          ), document.body) : <></>
     }
}