import { ReactElement, useEffect, useState } from "react";
import { PresentationDetails } from "../../components/PresentationDetails/PresentationDetails";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { CommonDetails, Similar } from "../../core/models/CommonDetails";
import { Video } from "../../core/models/ModelVideo";
import {
  MovieDetail,
  MovieDetailsSimilar,
} from "../../core/models/Movie/MovieDetails";
import { Backdrop } from "../../core/models/ObjectImages";
import {
  TvShowDetails,
  TvShowSimilarResult,
} from "../../core/models/TvShow/TvShowDetails";
import { MovieService } from "../../core/services/movie.service";
import { TvShowService } from "../../core/services/tv-show.service";
import {
  movieDetailsToCommonDetails,
  tvShowDetaillToCommonDetails,
} from "../../shared/assemblers/to-common-details";
import { Lang } from "../../shared/lang";
import { toHoursAndMinutes } from "../../shared/utils/commons";
import { getUrlPath } from "../../shared/utils/router";
import "./details.scss";
import { Observable } from "rxjs";

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
  const [similar, setSimilar] = useState<Similar>();
  const [id, setId] = useState<string>();
  const [service, setService] = useState<TvShowService | MovieService>();
  const [movieImageVideos, setMovieImageVideos] = useState<
    (Video | Backdrop)[]
  >([]);
  const [hoursMinutes, setHourMinute] = useState({ hours: 0, minutes: 0 });
  const [LANG, setLang] = useState(Lang.LANG);
  const [similarTop, setSimilarScrollTop] = useState(0);
  useEffect(() => {
    const [type, idDetails] = getUrlPath().slice(1)!;
    setId(idDetails);
    Lang.langListener().subscribe(setLang);
    setService(new SERVICE_CONFIG[type]());
    new SERVICE_CONFIG[type]().getById(idDetails).subscribe(convert);
  }, []);

  useEffect(() => {
    if (!commonDetails) {
      return undefined;
    }
    const backDropsVideos = [
      ...(commonDetails.videos?.results || []),
      ...(commonDetails.images?.backdrops || []),
    ];
    setSimilar(commonDetails.similar);
    setMovieImageVideos(backDropsVideos);
    setHourMinute(toHoursAndMinutes(commonDetails.runtime || 0));
  }, [commonDetails]);

  useEffect(() => {
    if (!similar) {
      return undefined;
    }
    const container = document.getElementById("similar-container")!;
    container.scrollTo({
      top: similarTop,
    });
  }, [similar]);

  function convert(details: MovieDetail | TvShowDetails): void {
    const type = getUrlPath().slice(1).shift()! as "tv" | "movie";
    const common = ASSEMBLERS[type](details as MovieDetail & TvShowDetails);
    setCommonDetails(common);
  }

  function fetchSimilar(): void {
    setSimilarScrollTop(
      document.getElementById("similar-container")!.scrollTop
    );
    (
      service?.getSimilar(id!, {
        page: similar!.page + 1,
      }) as unknown as Observable<Similar>
    ).subscribe((response) =>
      setSimilar({
        ...response,
        results: [...similar!.results, ...response.results],
      })
    );
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
              <Skeleton classElements="duration">
                <div className="time">
                  <span>
                    {new Date(
                      commonDetails?.release || commonDetails?.release_date!
                    ).getFullYear()}
                  </span>
                  <span>{`${hoursMinutes.hours}h ${hoursMinutes.minutes}m`}</span>
                </div>
              </Skeleton>
              <Skeleton classElements="tagline">
                <span className="tagline">{commonDetails?.tagline}</span>
              </Skeleton>
            </div>
            <h4 className="description-title">{LANG.DESCRIPTION}</h4>
            <Skeleton classElements="overview">
              <span className="overview">&nbsp;{commonDetails?.overview}</span>
            </Skeleton>
          </div>
        </div>
        <div className="movies-for-you-wrapper">
          <Skeleton classElements="title-loading">
            <h4>{LANG.SIMILAR}</h4>
          </Skeleton>
          <div className="similar-wrapper" id="similar-container">
            <div className="similar-container">
              <Skeleton
                classElements="similar-card"
                quantityMock={similar?.results.length || 8}
              >
                {similar?.results.map((similar) => (
                  <div
                    key={similar.id}
                    className="similar-card"
                    card-title={similar.name || similar.title}
                    style={{
                      backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face/${similar.poster_path})`,
                    }}
                  />
                ))}
              </Skeleton>
              {similar && similar.total_pages !== similar.page && (
                <div className="see-more" onClick={fetchSimilar}>
                  <span>{LANG.SEE_MORE}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
