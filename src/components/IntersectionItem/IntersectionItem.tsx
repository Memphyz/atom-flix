import {
  MouseEventHandler,
  ReactElement,
  createRef,
  useEffect,
  useState,
} from "react";
import { className } from "../../shared/utils/classname";
import "./IntersectionItem.scss";

export function IntersectionItem(props: {
  children?: any;
  id?: any;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseOver?: MouseEventHandler<HTMLDivElement>;
}): ReactElement {
  const ref = createRef<HTMLDivElement>();
  const [visible, setVisible] = useState(true);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setVisible(entry.isIntersecting));
  });
  useEffect(() => {
    observer.observe(ref.current!);
  }, [ref]);
  return (
    <div
      ref={ref}
      id={props.id}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      className={`${className({
        intersection: true,
        visible,
      })} ${props.className}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
