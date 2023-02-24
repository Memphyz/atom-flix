import React from "react";
import { ReactElement, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { className } from "../../shared/utils/classname";
import "./Skeleton.scss";

export function Skeleton(props: {
  classElements?: string;
  quantityMock?: number;
}): ReactElement {
  const quantity = props.quantityMock || 10;

  return (
    <>
      {Array(quantity)
        .fill(undefined)
        .map((_v, i) => (
          <div
            className={className({
              [props.classElements || ""]: true,
              skeleton: true,
            })}
          ></div>
        ))}
    </>
  );
}
