import React, { useState } from "react";
import { ReactElement, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { className } from "../../shared/utils/classname";
import "./Skeleton.scss";
import { loaderService } from "../..";

export function Skeleton(props: {
  activated?: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
  classElements?: string;
  quantityMock?: number;
}): ReactElement {
  const quantity = props.quantityMock || 1;
  const [isActivatedFlag, setActivated] = useState(true);

  useEffect((): void => {
    loaderService.subscribe(setActivated);
  }, []);

  function isActivated(): boolean {
    return props.activated === undefined || props.activated === null
      ? isActivatedFlag
      : props.activated;
  }

  return (
    <>
      {isActivated() ? (
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
