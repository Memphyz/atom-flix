import {
  ReactElement,
  SyntheticEvent,
  createRef,
  useEffect,
  useState,
} from "react";
import { loaderService } from "../..";
import { className } from "../../shared/utils/classname";
import { IntersectionItem } from "../IntersectionItem/IntersectionItem";
import { Skeleton } from "../Skeleton/Skeleton";
import "./Card.scss";
import { ICardProps } from "./CardProps";
import { noop } from "rxjs";
import { Link } from "react-router-dom";
import { router } from "../../App";
import { t } from "i18next";

const MAX_WIDTH = 1920;
const CARD_WIDTH_SPACING = 70;
const GAP = 20;

export function ItemCard<T extends { id: any }>(
  props: ICardProps<T> & { item?: T; seeMore?: boolean }
) {
  const [ showDetails, setDetails ] = useState(false);
  const [ minWidth, setMinWidth ] = useState(props.width || 150);

  const detailsListeners = () => {
    if (window.innerWidth < (props.width || 0) * 3.5) {
      return undefined;
    }
    props.onMouseOver && props.onMouseOver(props.item?.id);
    setDetails(true);
  };

  useEffect((): void => {
    let width = props.width || 150;
    if (width + CARD_WIDTH_SPACING > window.innerWidth) {
      width = window.innerWidth - CARD_WIDTH_SPACING;
    }
    setMinWidth(width);
  }, []);

  const closeDetailsListeners = (event: SyntheticEvent) => {
    setDetails(false);
  };

  const cardContent = () => {
    if (props.seeMore) {
      return (
        <div className="see-more" onClick={props.onClickMore}>
          <label htmlFor={t('SEE_MORE') as string}>
            {t('SEE_MORE') as string} <span>↣</span>
          </label>
        </div>
      );
    }
    return (
      <>
        <div className="name">
          <label htmlFor={props.item![ props.title as any ] + 'test'}>
            {props.item![ props.title as any ]}
          </label>
        </div>
        <div className="shadow" />
      </>
    );
  };

  return (
    <IntersectionItem
      id={props.item?.id || "see-more"}
      className={className({
        card: true,
        details: showDetails,
        "show-more": props.seeMore,
      })}
      onMouseOver={!props.seeMore ? detailsListeners : noop}
      onMouseLeave={!props.seeMore ? closeDetailsListeners : noop}
      onClick={() => {
        props.onclick && props.onclick();
        !props.seeMore &&
          router.next(`details/${ props.type }/${ props.item?.id }`);
      }}
      style={{
        minWidth: showDetails
          ? minWidth * (props.widthDetailsMultiplier || 3)
          : minWidth,
        minHeight: props.height || 200,
        backgroundImage: showDetails
          ? ""
          : `url(${ props.backgroundImage || "" }${ props.item
            ? props.item![ (props.backgroundImageSuffix as any) || "" ]
            : null
          })`,
      }}
    >
      {showDetails ? props.children : cardContent()}
    </IntersectionItem>
  );
}

export function Cards<T extends { id: any }>(
  props: ICardProps<T>
): ReactElement {
  const [ SKELETON_SIZE, setSkeletonSize ] = useState(1);

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
      {props.totalItems! > props.items?.length ? (
        <ItemCard {...props} seeMore={true} />
      ) : null}
    </>
  ) : (
    <Skeleton
      quantityMock={SKELETON_SIZE}
      classElements="card"
      style={{
        minWidth: props.width || 150,
        minHeight: props.height || 200,
      }}
    />
  );
}
