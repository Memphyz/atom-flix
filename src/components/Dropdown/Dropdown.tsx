import './Dropdown.scss';
import { icons } from '../../assets/icons/icons';
import { DropdownItem } from '../../core/models/DropdownItem';
import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';
import { noop } from 'rxjs';

export class Dropdown extends Component<{ items: DropdownItem[], leftPx?: number, topPx?: number, children?: any }> {

     public isOpen: boolean;
     public items: DropdownItem[];
     public topPx = 0;
     public leftPx = 0;
     public elementRef = React.createRef<HTMLDivElement>();

     public toggle(): void {
          this.setState(() => this.isOpen = !this.isOpen);
     }

     private updateItems(): void {
          this.setState(() => {
               this.items = this.props.items;
               this.topPx = this.props.topPx || 0;
               this.leftPx = this.props.leftPx || 0;
          });
     }

     public componentDidMount(): void {
          this.updateItems();
     }

     public render(): ReactNode {
          return (
               <div className={classNames({
                    menu: true,
                    default: !this.props.children,
                    open: this.isOpen,
               })}
                    ref={this.elementRef}
                    onClick={this.toggle.bind(this)}>
                    {this.props.children}
                    <div className="dropdown" style={{ top: 25 + this.topPx, left: 10 + this.leftPx }}>
                         <div className="items">
                              {this.items?.map((item, index) => (
                                   <div key={index} className="item-content" onClick={item.onClick ? item.onClick : noop}>
                                        {item.icon && <div className="icon" style={{
                                             WebkitMaskImage: `url(${icons[item.icon]})`
                                        }}></div>}
                                        <span>{item.text}</span>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          )
     }
}