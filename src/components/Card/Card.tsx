import {
  BaseSyntheticEvent,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { ICardProps } from "./CardProps";
import "./Card.scss";
import React from "react";
import { Skeleton } from "../Skeleton/Skeleton";
import { loaderService } from "../..";
import { IntersectionItem } from "../IntersectionItem/IntersectionItem";
import ReactDOM, { createPortal, render } from "react-dom";
import { className } from "../../shared/utils/classname";

const MAX_WIDTH = 1920;
const GAP = 20;

function ItemCard<T extends { id: any }>(props: ICardProps<T> & { item: T }) {
  const [showDetails, setDetails] = useState(false);

  const detailsListeners = (event: SyntheticEvent) => {
    setDetails(true);
    (event.target as HTMLElement).onmouseout = () => {
      changeDetails(false);
    };
  };

  const changeDetails = (flag: boolean) => {
    setTimeout(() => setDetails(flag), 100);
  };

  return (
    <IntersectionItem
      id={props.item.id}
      className={className({
        card: true,
        details: showDetails,
      })}
      onMouseOver={detailsListeners}
      onClick={props.onclick}
      style={{
        minWidth: showDetails ? (props.width || 0) * 3 : props.width || 150,
        minHeight: props.height || 200,
        backgroundImage: showDetails
          ? ""
          : `url(${props.backgroundImage || ""}${
              props.item[(props.backgroundImageSuffix as any) || ""]
            })`,
      }}
    >
      {showDetails ? (
        props.children
      ) : (
        <>
          <label htmlFor={props.item[props.title as any]}>
            {props.item[props.title as any]}
          </label>
          <div className="shadow" />
        </>
      )}
    </IntersectionItem>
  );
}

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
        <ItemCard key={item.id} {...props} item={item} />
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
