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
import { isMobile, loaderService } from "../..";
import { Modal } from "../Modal/Modal";
import { Skeleton } from "../Skeleton/Skeleton";

const PADDING_MAIN_CONTAINER_PX = 30 * 2;
const IMAGES_MAX_WIDTH_PX = 1320;
const PRESENTATION_SLIDE_TIME = 5000;

export function PresentationDetails(props: {
  data: (Video | Backdrop)[];
  placeholderSkeleton?: boolean;
  placeholder?: string;
}): ReactElement {
  const container = createRef<HTMLDivElement>();
  const [ imgIndex, setImageIndex ] = useState(0);
  const [ isLoading, setLoading ] = useState(false);
  const [ stopInterval, setStopInterval ] = useState(false);
  const [ modals, setModals ] = useState<boolean[]>([]);
  const [ loadingImages, setLoadingImage ] = useState<boolean[]>([]);
  const [ showControls, setShowControls ] = useState({
    left: false,
    right: false,
  });

  useEffect(() => {
    loaderService.subscribe(setLoading);
    load();
  }, []);

  useEffect(load, [ props.data, props.placeholder ]);

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
  }, [ container ]);

  function load(): void {
    setModals(
      props.data
        ?.filter((data) => !isBackdrop(data))
        .map((_details, i) => false)
    );
    if (props.data?.length) {
      setLoadingImage(
        Array.from(props.data.filter((data) => isBackdrop(data))).map(
          () => false
        )
      );
      return undefined;
    } else if (props.placeholder || props.placeholderSkeleton) {
      setLoadingImage([ false ]);
    }
  }

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

    const multiplier = index > imgIndex ? index - imgIndex : imgIndex - index;
    scrollContainer.scrollTo({
      left:
        index > imgIndex
          ? scrollContainer.scrollLeft + imgsWidth * multiplier
          : scrollContainer.scrollLeft - imgsWidth * multiplier,
      behavior: "smooth",
    });
    setImageIndex(index);
  }

  function shouldShowControls(event: SyntheticEvent): void {
    const positionX: number = event.nativeEvent[ "pageX" ];
    const scrollContainer = container?.current!;
    const main = document.getElementById("main-container")!;
    const root = document.getElementById("root")!;
    const spacing = (root.offsetWidth - main.offsetWidth) / 2;
    if (positionX - spacing < 200) {
      setShowControls({ left: true, right: false });
      return undefined;
    }
    if (positionX > scrollContainer.offsetWidth - 200) {
      setShowControls({ left: false, right: true });
      return undefined;
    }
    setShowControls({ left: false, right: false });
  }

  function openVideo(index: number): void {
    setModals(
      props.data
        .filter((data) => !isBackdrop(data))
        .map((_details, i) => i === index)
    );
  }

  return (
    <div
      className="presentation-details-wrapper"
      onMouseMove={shouldShowControls}
    >
      <Skeleton activated={isLoading} classElements="presentations skeleton">
        <div className="presentations" ref={container}>
          {props.data.length
            ? props.data.map((videoImage, i) => (
              <figure
                key={i}
                className={className({
                  movie: !isBackdrop(videoImage),
                  "skeleton-figure": loadingImages.length && !loadingImages[ i ],
                })}
              >
                {!isBackdrop(videoImage) && (
                  <Modal
                    open={modals[ i ]}
                    onClose={() => openVideo(undefined!)}
                  >
                    <div className="frame">
                      <iframe
                        src={`https://www.youtube.com/embed/${ getVideo(videoImage).key
                          }?autoplay=1&modestbranding=0&fs=1&autohide=1`}
                        allowFullScreen={false}
                        title={getVideo(videoImage).name}
                        id={getVideo(videoImage).id}
                        loading="lazy"
                        allow="accelerometer; autoplay;
                  encrypted-media; gyroscope;
                  picture-in-picture; fullscreen"
                      ></iframe>
                    </div>
                  </Modal>
                )}
                <img
                  onLoad={() => {
                    setLoadingImage([
                      ...loadingImages.map((value, index) =>
                        index === i ? true : value
                      ),
                    ]);
                  }}
                  src={
                    isBackdrop(videoImage)
                      ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${ getBackdrop(videoImage).file_path
                      }`
                      : `https://img.youtube.com/vi/${ getVideo(videoImage).key
                      }/maxresdefault.jpg`
                  }
                  loading="lazy"
                  decoding="async"
                  onClick={
                    !isBackdrop(videoImage) ? () => openVideo(i) : noop
                  }
                />
                {!isBackdrop(videoImage) && (
                  <div onClick={() => openVideo(i)} className="play-btn" />
                )}
              </figure>
            ))
            : (props.placeholder || props.placeholderSkeleton) && (
              <Skeleton
                awaysRenderChild={true}
                classElements="presentations"
                activated={!loadingImages[ 0 ]}
              >
                <figure
                  className={className({
                    "skeleton-figure": !loadingImages[ 0 ],
                  })}
                >
                  <img
                    onLoad={() => {
                      setLoadingImage([ true ]);
                    }}
                    id="placeholder-image-presentation"
                    src={props.placeholder}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Skeleton>
            )}
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
                    key={index}
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
      </Skeleton>
    </div>
  );
}
