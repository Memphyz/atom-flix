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
  animation?: "default" | "to-top" | "to-left";
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseOver?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}): ReactElement {
  const ref = createRef<HTMLDivElement>();
  const [visible, setVisible] = useState(true);
  let intsersected = false;
  const observer = new IntersectionObserver((entries) => {
    const animation = props.animation === "default";
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intsersected = true;
      }
      setVisible(animation ? entry.isIntersecting : intsersected);
    });
  });
  useEffect(() => {
    observer.observe(ref.current!);
  }, [ref]);
  return (
    <div
      ref={ref}
      id={props.id}
      onClick={props.onClick}
      onMouseEnter={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      className={`${className({
        intersection: true,
        [props.animation || "default"]: true,
        visible,
      })} ${props.className || ""}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
