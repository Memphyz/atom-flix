/* eslint-disable jsx-a11y/alt-text */
import {
  MouseEventHandler,
  ReactElement,
  SyntheticEvent,
  createRef,
  useEffect,
  useState,
} from "react";
import { interval, noop, takeWhile } from "rxjs";
import { Video } from "../../core/models/ModelVideo";
import { Backdrop } from "../../core/models/ObjectImages";
import { className } from "../../shared/utils/classname";
import "./PresentationDetails.scss";
import { isMobile } from "../..";

const PADDING_MAIN_CONTAINER_PX = 30 * 2;
const IMAGES_MAX_WIDTH_PX = 1320;
const PRESENTATION_SLIDE_TIME = 5000;

export function PresentationDetails(props: {
  data: (Video | Backdrop)[];
}): ReactElement {
  const container = createRef<HTMLDivElement>();
  const [imgIndex, setImageIndex] = useState(0);
  const [stopInterval, setStopInterval] = useState(false);
  const [showControls, setShowControls] = useState({
    left: false,
    right: false,
  });

  useEffect(() => {
    if (!props.data || props.data.length <= 1) {
      return undefined;
    }
    interval(PRESENTATION_SLIDE_TIME)
      .pipe(takeWhile(() => !stopInterval && !!container?.current))
      .subscribe((): void => {
        const imgsWidth =
          window.innerWidth > IMAGES_MAX_WIDTH_PX + PADDING_MAIN_CONTAINER_PX
            ? IMAGES_MAX_WIDTH_PX
            : window.innerWidth - PADDING_MAIN_CONTAINER_PX;
        const scrollContainer = container.current!;
        if (
          scrollContainer.scrollLeft + imgsWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollTo({ left: 0 });
          setImageIndex(0);
          return undefined;
        }
        setImageIndex(imgIndex + 1);
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

  function onClickDot(index: number): void {
    setStopInterval(true);
    const scrollContainer = container?.current!;
    if (!scrollContainer) {
      return undefined;
    }
    if (!index) {
      scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      setImageIndex(index);
      return undefined;
    }
    const imgsWidth =
      window.innerWidth > IMAGES_MAX_WIDTH_PX + PADDING_MAIN_CONTAINER_PX
        ? IMAGES_MAX_WIDTH_PX
        : window.innerWidth - PADDING_MAIN_CONTAINER_PX;

    scrollContainer.scrollTo({
      left:
        index > imgIndex
          ? scrollContainer.scrollLeft + imgsWidth
          : scrollContainer.scrollLeft - imgsWidth,
      behavior: "smooth",
    });
    setImageIndex(index);
  }

  function shouldShowControls(event: SyntheticEvent): void {
    const positionX: number = event.nativeEvent["pageX"];
    const scrollContainer = container?.current!;

    if (positionX < 200) {
      setShowControls({ left: true, right: false });
      return undefined;
    }
    if (positionX > scrollContainer.offsetWidth - 200) {
      setShowControls({ left: false, right: true });
      return undefined;
    }
    setShowControls({ left: false, right: false });
  }

  function openVideo(): void {
    // do something
  }

  return (
    <div
      className="presentation-details-wrapper"
      onMouseMove={shouldShowControls}
    >
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
              onClick={!isBackdrop(videoImage) ? openVideo : noop}
            />
            {!isBackdrop(videoImage) && <div className="play-btn" />}
          </figure>
        ))}
      </div>
      {props.data?.length > 1 && (
        <>
          <div
            className="index-nav"
            style={
              { "--data-length": props.data.length } as React.CSSProperties
            }
          >
            {Array(props.data.length)
              .fill(null)
              .map((_value, index) => (
                <div
                  onClick={() => onClickDot(index)}
                  className={className({
                    dot: true,
                    active: index === imgIndex,
                  })}
                />
              ))}
          </div>
          {!!imgIndex && (
            <div
              className={className({
                "control-left": true,
                show: showControls.left || isMobile,
              })}
              onClick={() => onClickDot(imgIndex - 1)}
            />
          )}
          {imgIndex !== props.data.length - 1 && (
            <div
              onClick={() => onClickDot(imgIndex + 1)}
              className={className({
                "control-right": true,
                show: showControls.right || isMobile,
              })}
            />
          )}
        </>
      )}
    </div>
  );
}
