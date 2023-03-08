import { ReactElement, useEffect, useState } from "react";
import "./details.scss";
import { getUrlPath } from "../../shared/utils/router";
import { MovieService } from "../../core/services/movie.service";
import { MovieDetail } from "../../core/models/Movie/MovieDetails";
import { MovieVideo, Video } from "../../core/models/Movie/MovieVideos";
import { Backdrop, Images } from "../../core/models/ObjectImages";
import { PresentationDetails } from "../../components/PresentationDetails/PresentationDetails";

export function Details(): ReactElement {
  const movieService = new MovieService();
  const [movie, setMovie] = useState<MovieDetail>();
  const [movieImageVideos, setMovieImageVideos] = useState<
    (Video | Backdrop)[]
  >([]);
  useEffect(() => {
    const id = getUrlPath().pop()!;
    movieService.getById(id).subscribe(setMovie);
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
