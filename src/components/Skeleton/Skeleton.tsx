import React from "react";
import { ReactElement, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { className } from "../../shared/utils/classname";
import "./Skeleton.scss";

export function Skeleton(props: {
  activated?: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
  classElements?: string;
  quantityMock?: number;
}): ReactElement {
  const quantity = props.quantityMock || 10;

  return (
    <>
      {props.activated ? (
        <>
          {Array(quantity)
            .fill(undefined)
            .map((_v, i) => (
              <div
                style={props.style}
                key={i}
                className={className({
                  [props.classElements || ""]: true,
                  skeleton: true,
                })}
              ></div>
            ))}
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}
