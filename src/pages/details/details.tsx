import { ReactElement, useEffect, useState } from "react";
import "./details.scss";
import { getUrlPath } from "../../shared/utils/router";
import { MovieService } from "../../core/services/movie.service";
import { MovieDetail } from "../../core/models/Movie/MovieDetails";
import { ModelVideo, Video } from "../../core/models/ModelVideo";
import { Backdrop, Images } from "../../core/models/ObjectImages";
import { PresentationDetails } from "../../components/PresentationDetails/PresentationDetails";
import { TvShowService } from "../../core/services/tv-show.service";

const SERVICE_CONFIG = {
  tv: TvShowService,
  movie: MovieService,
};

export function Details(): ReactElement {
  const [movie, setMovie] = useState<MovieDetail>();
  const [movieImageVideos, setMovieImageVideos] = useState<
    (Video | Backdrop)[]
  >([]);
  useEffect(() => {
    const [_details, type, id] = getUrlPath()!;
    new SERVICE_CONFIG[type]().getById(id).subscribe(setMovie);
  }, []);

  useEffect(() => {
    if (!movie) {
      return undefined;
    }
    const backDropsVideos = [
      ...(movie.videos?.results || []),
      ...(movie.images?.backdrops || []),
    ];
    setMovieImageVideos(backDropsVideos);
  }, [movie]);

  return (
    <div className="main-details-wrapper">
      <div className="movie-main-details">
        <div className="movie-overview">
          <div className="images-videos">
            <PresentationDetails data={movieImageVideos} />
          </div>
        </div>
        <div className="movies-for-you-wrapper"></div>
      </div>
    </div>
  );
}
