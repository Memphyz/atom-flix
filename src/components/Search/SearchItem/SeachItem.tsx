import { ReactElement } from "react";
import './SearchItem.scss';

export function SearchItem(props: {
  title: string,
  backdround: string;
  vingette?: boolean
}): ReactElement {
  return (
    <div className="card-search-item" style={{ backgroundImage: `url(${ props.backdround })` }}>
      <label htmlFor={props.title}>{props.title}</label>
    </div>
  )
}