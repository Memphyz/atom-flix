import { ReactElement, useEffect, useState } from "react";
import { PresentationDetails } from "../../components/PresentationDetails/PresentationDetails";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { CommonDetails } from "../../core/models/CommonDetails";
import { Video } from "../../core/models/ModelVideo";
import { MovieDetail } from "../../core/models/Movie/MovieDetails";
import { Backdrop } from "../../core/models/ObjectImages";
import { TvShowDetails } from "../../core/models/TvShow/TvShowDetails";
import { MovieService } from "../../core/services/movie.service";
import { TvShowService } from "../../core/services/tv-show.service";
import {
  movieDetailsToCommonDetails,
  tvShowDetaillToCommonDetails,
} from "../../shared/assemblers/to-common-details";
import { getUrlPath } from "../../shared/utils/router";
import "./details.scss";
import { Lang } from "../../shared/lang";
import { toHoursAndMinutes } from "../../shared/utils/commons";

const SERVICE_CONFIG = {
  tv: TvShowService,
  movie: MovieService,
};

const ASSEMBLERS = {
  movie: movieDetailsToCommonDetails,
  tv: tvShowDetaillToCommonDetails,
};

export function Details(): ReactElement {
  const [commonDetails, setCommonDetails] = useState<CommonDetails>();
  const [movieImageVideos, setMovieImageVideos] = useState<
    (Video | Backdrop)[]
  >([]);
  const [hoursMinutes, setHourMinute] = useState({ hours: 0, minutes: 0 });
  const [LANG, setLang] = useState(Lang.LANG);
  useEffect(() => {
    const [type, id] = getUrlPath().slice(1)!;
    Lang.langListener().subscribe(setLang);
    new SERVICE_CONFIG[type]().getById(id).subscribe(convert);
  }, []);

  useEffect(() => {
    console.log(commonDetails);
    if (!commonDetails) {
      return undefined;
    }
    const backDropsVideos = [
      ...(commonDetails.videos?.results || []),
      ...(commonDetails.images?.backdrops || []),
    ];
    setMovieImageVideos(backDropsVideos);
    setHourMinute(toHoursAndMinutes(commonDetails.runtime || 0));
  }, [commonDetails]);

  function convert(details: MovieDetail | TvShowDetails): void {
    const type = getUrlPath().slice(1).shift()! as "tv" | "movie";
    const common = ASSEMBLERS[type](details as MovieDetail & TvShowDetails);
    setCommonDetails(common);
  }

  return (
    <div className="main-details-wrapper">
      <div className="movie-main-details">
        <div className="movie-overview">
          <div className="images-videos">
            <PresentationDetails data={movieImageVideos} />
          </div>
          <div className="title-overview">
            <Skeleton classElements="title">
              <h4 className="title">{commonDetails?.name}</h4>
            </Skeleton>
            <div className="year-time-detail">
              <div className="time">
                <span>
                  {new Date(commonDetails?.release || "").getFullYear()}
                </span>
                <span>{`${hoursMinutes.hours}h ${hoursMinutes.minutes}m`}</span>
              </div>
              <span className="tagline">{commonDetails?.tagline}</span>
            </div>
            <h4 className="description-title">{LANG.DESCRIPTION}</h4>
            <Skeleton classElements="overview">
              <span className="overview">&nbsp;{commonDetails?.overview}</span>
            </Skeleton>
          </div>
        </div>
        <div className="movies-for-you-wrapper"></div>
      </div>
    </div>
  );
}
