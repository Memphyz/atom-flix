import './Login.scss';
import { Panda } from '../../../components/Panda/Panda';
import { Component, ReactNode } from 'react';

export class Login extends Component {

     public focusPassword: boolean;

     public render(): ReactNode {
          return (<div className="login-page">
               <Panda hide={this.focusPassword}>
                    <div className="login-content">
                         <input type="text" placeholder='Username' />
                         <input type="password"
                              onBlur={() => this.setState(() => this.focusPassword = false)}
                              onFocus={() => this.setState(() => this.focusPassword = true)} placeholder='Password' />
                         <button>Login</button>
                    </div>
               </Panda>
          </div>)
     }
}