import { DropdownItem } from '../../core/models/DropdownItem';
import classNames from 'classnames';
import { Component, ReactNode } from 'react';
import { noop } from 'rxjs';

export class Dropdown extends Component<{ items: DropdownItem[], children?: any }> {

     public isOpen: boolean;
     public items: DropdownItem[];

     public toggle(): void {
          this.setState(() => this.isOpen = !this.isOpen);
     }

     private updateItems(): void {
          this.setState(() => this.items = this.props.items);
     }

     public componentDidMount(): void {
          this.updateItems();
     }

     public render(): ReactNode {
          return (
               <div className={classNames({
                    menu: true,
                    open: this.isOpen
               })}
                    onClick={this.toggle.bind(this)}>
                    {this.props.children}
                    <div className="dropdown">
                         <div className="items">
                              {this.items?.map(item => (
                                   <div className="item-content" onClick={item.onClick ? item.onClick : noop}>
                                        <span>{item.text}</span>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          )
     }
}