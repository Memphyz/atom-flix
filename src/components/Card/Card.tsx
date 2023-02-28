import { ReactElement, useEffect, useState } from "react";
import { ICardProps } from "./CardProps";
import "./Card.scss";
import React from "react";
import { Skeleton } from "../Skeleton/Skeleton";
import { loaderService } from "../..";
import { IntersectionItem } from "../IntersectionItem/IntersectionItem";

const MAX_WIDTH = 1920;
const GAP = 20;
export function Cards<T extends { id: any }>(
  props: ICardProps<T>
): ReactElement {
  const [SKELETON_SIZE, setSkeletonSize] = useState(1);

  useEffect(() => {
    updateSkeletonSize();
    window.onresize = (): void => {
      updateSkeletonSize();
    };
  }, []);

  const updateSkeletonSize = () => {
    const width = window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
    setSkeletonSize(Math.round(width / ((props.width || 150) + GAP)));
  };
  return !loaderService.value ? (
    <>
      {props.items.map((item) => (
        <IntersectionItem
          key={item.id}
          className="card"
          onClick={props.onclick}
          style={{
            minWidth: props.width || 150,
            minHeight: props.height || 200,
            backgroundImage: `url(${props.backgroundImage || ""}${
              item[(props.backgroundImageSuffix as any) || ""]
            })`,
          }}
        >
          <label htmlFor={item[props.title as any]}>
            {item[props.title as any]}
          </label>
          <div className="shadow" />
        </IntersectionItem>
      ))}
    </>
  ) : (
    <Skeleton
      quantityMock={SKELETON_SIZE}
      activated={loaderService.value}
      classElements="card"
      style={{
        minWidth: props.width || 150,
        minHeight: props.height || 200,
      }}
    />
  );
}
