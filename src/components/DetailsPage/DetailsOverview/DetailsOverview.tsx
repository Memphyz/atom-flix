import { ReactElement, useEffect, useState } from "react";
import "./DetailsOverview.scss";
import { PresentationDetails } from "../../PresentationDetails/PresentationDetails";
import { Skeleton } from "../../Skeleton/Skeleton";
import { CommonDetails } from "../../../core/models/CommonDetails";
import { toHoursAndMinutes } from "../../../shared/utils/commons";
import { Video } from "../../../core/models/ModelVideo";
import { Backdrop } from "../../../core/models/ObjectImages";
import { DetailsCrewCast } from "../DetailsCrewCast/DetailsCrewCast";
import { t } from "i18next";

export function DetailsOverview(props: {
  commonDetails: CommonDetails;
}): ReactElement {
  const [ hoursMinutes, setHourMinute ] = useState({ hours: 0, minutes: 0 });
  const [ movieImageVideos, setMovieImageVideos ] = useState<
    (Video | Backdrop)[]
  >([]);

  useEffect(() => {
    if (!props.commonDetails) {
      return undefined;
    }
    const backDropsVideos = [
      ...(props.commonDetails.videos?.results || []),
      ...(props.commonDetails.images?.backdrops || []),
    ];
    setMovieImageVideos(backDropsVideos);
    setHourMinute(toHoursAndMinutes(props.commonDetails.runtime || 0));
  }, [ props.commonDetails ]);

  return (
    <div className="movie-overview">
      <div className="images-videos">
        <PresentationDetails
          data={movieImageVideos}
          placeholder={`https://www.themoviedb.org/t/p/w1920_and_h1080_multi_faces/${ props.commonDetails?.backdrop_path }`}
        />
      </div>
      <div className="title-overview">
        <Skeleton classElements="title">
          <h4 className="title">{props.commonDetails?.name || props.commonDetails?.original_name || props.commonDetails?.title || props.commonDetails?.original_title}</h4>
        </Skeleton>
        <div className="year-time-detail">
          <Skeleton classElements="duration">
            <div className="time">
              <span>
                {new Date(
                  props.commonDetails?.release ||
                  props.commonDetails?.release_date!
                ).getFullYear()}
              </span>
              <span>{`${ hoursMinutes.hours }h ${ hoursMinutes.minutes }m`}</span>
            </div>
          </Skeleton>
          <Skeleton classElements="tagline">
            <span className="tagline">{props.commonDetails?.tagline}</span>
          </Skeleton>
        </div>
        <h4 className="description-title">{t('DESCRIPTION') as string}</h4>
        <Skeleton classElements="overview">
          <span className="overview">
            &nbsp;{props.commonDetails?.overview}
          </span>
        </Skeleton>
        <DetailsCrewCast {...props} />
      </div>
    </div>
  );
}
