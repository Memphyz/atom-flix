/* eslint-disable jsx-a11y/alt-text */
import { ReactElement, createRef, useEffect, useState } from "react";
import "./PresentationDetails.scss";
import { Video } from "../../core/models/Movie/MovieVideos";
import { Backdrop } from "../../core/models/ObjectImages";
import { className } from "../../shared/utils/classname";
import { Subscription, interval, skip, takeWhile } from "rxjs";
import { router } from "../../App";

const PADDING_MAIN_CONTAINER_PX = 30 * 2;
const IMAGES_MAX_WIDTH_PX = 1320;

export function PresentationDetails(props: {
  data: (Video | Backdrop)[];
}): ReactElement {
  const container = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!props.data || props.data.length < 1) {
      return undefined;
    }
    interval(1000)
      .pipe(takeWhile(() => !!container?.current))
      .subscribe((): void => {
        const imgsWidth =
          window.innerWidth > IMAGES_MAX_WIDTH_PX + PADDING_MAIN_CONTAINER_PX
            ? IMAGES_MAX_WIDTH_PX
            : window.innerWidth - PADDING_MAIN_CONTAINER_PX;
        const scrollContainer = container.current!;
        console.log(scrollContainer.scrollLeft + imgsWidth);
        if (
          scrollContainer.scrollLeft + imgsWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
          return undefined;
        }
        scrollContainer.scrollTo({
          left: scrollContainer.scrollLeft + imgsWidth,
          behavior: "smooth",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  function isBackdrop(videoImage: Video | Backdrop): boolean {
    return Object.keys(videoImage).includes("aspect_ratio");
  }

  function getBackdrop(videoImage: Video | Backdrop): Backdrop {
    return videoImage as Backdrop;
  }

  function getVideo(videoImage: Video | Backdrop): Video {
    return videoImage as Video;
  }

  return (
    <div className="presentation-details-wrapper">
      <div className="presentations" ref={container}>
        {props.data?.map((videoImage, i) => (
          <figure
            key={i}
            className={className({ movie: !isBackdrop(videoImage) })}
          >
            <img
              src={
                isBackdrop(videoImage)
                  ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${
                      getBackdrop(videoImage).file_path
                    }`
                  : `https://img.youtube.com/vi/${
                      getVideo(videoImage).key
                    }/maxresdefault.jpg`
              }
              loading="lazy"
              decoding="async"
            />
            {!isBackdrop(videoImage) && <div className="play-btn" />}
          </figure>
        ))}
      </div>
    </div>
  );
}
