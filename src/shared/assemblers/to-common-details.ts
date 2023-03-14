import { CommonDetails } from "../../core/models/CommonDetails";
import { MovieDetail } from "../../core/models/Movie/MovieDetails";
import { TvShowDetails } from "../../core/models/TvShow/TvShowDetails";

export function movieDetailsToCommonDetails(movie: MovieDetail): CommonDetails {
  return {
    ...movie,
  } as unknown as CommonDetails;
}

export function tvShowDetaillToCommonDetails(tv: TvShowDetails): CommonDetails {
  return {
    ...tv,
    original_title: tv.original_name,
    adult: false,
    details_type: "tvshow",
    similar: tv.similar,
    release: tv.first_air_date,
    runtime: tv.episode_run_time.reduce((acc, curr) => (acc += curr), 0),
  } as unknown as CommonDetails;
}
