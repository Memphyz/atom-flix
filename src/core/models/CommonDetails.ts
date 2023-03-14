import { Credits } from "./Credits";
import { Keywords } from "./Keywords";
import {
  BelongsToCollection,
  Genre,
  MovieDetail,
  MovieDetails,
  MovieDetailsLists,
  MovieRecomendations,
  ProductionCompany,
  ProductionCountry,
  ReleaseDates,
  SpokenLanguage,
} from "./Movie/MovieDetails";
import { Images } from "./ObjectImages";
import { Recomendations } from "./Recomendations";
import {
  AggregateCredits,
  Changes,
  ContentRatings,
  CreatedBy,
  EpisodeGroups,
  ExternalIds,
  LastEpisodeToAir,
  Network,
  Reviews,
  ScreenedTheatrically,
  Season,
  TvShowDetails,
  TvShowRecomendations,
  TvShowSimilarResult,
} from "./TvShow/TvShowDetails";
import { Video } from "./Video";
import { WatchProviders } from "./WatchProviders";

export class CommonDetails
  implements
    Omit<
      MovieDetails,
      | "production_companies"
      | "keywords"
      | "similar"
      | "recommendations"
      | "videos"
    >,
    Omit<
      TvShowDetails,
      | "production_companies"
      | "keywords"
      | "similar"
      | "recommendations"
      | "videos"
    >
{
  belongs_to_collection: BelongsToCollection;
  budget: number;
  imdb_id: string;
  revenue: number;
  lists: MovieDetailsLists;
  release_dates: ReleaseDates;
  genre_ids: number[];
  release_date: string;
  title: string;
  video: boolean;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  next_episode_to_air?: any;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  production_companies: ProductionCompany[];
  seasons: Season[];
  type: string;
  aggregate_credits: AggregateCredits;
  changes: Changes;
  content_ratings: ContentRatings;
  episode_groups: EpisodeGroups;
  external_ids: ExternalIds;
  keywords: Keywords;
  recommendations: Recommendations<MovieRecomendations | TvShowRecomendations>;
  reviews: Reviews;
  screened_theatrically: ScreenedTheatrically;
  name: string;
  original_title: string;
  id: number;
  backdrop_path: string;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  overview: string;
  popularity: number;
  details_type: "movie" | "tvshow";
  poster_path: string;
  original_language: string;
  homepage: string;
  credits: Credits;
  genres: Genre[];
  images: Images;
  videos: Video;
  production_countries: ProductionCountry[];
  recomendations: Recomendations;
  similar: Similar;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  watch_providers: WatchProviders;
  release: string;
  runtime: number;
}

export interface Similar {
  page: number;
  results: CommonDetails[];
  total_pages: number;
  total_results: number;
}

export interface Recommendations<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
