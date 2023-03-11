import { Credits } from "./Credits";
import { ExternalIDs } from "./ExternalIds";
import { Keyword, Keywords } from "./Keywords";
import {
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "./Movie/MovieDetails";
import { SimilarMovies } from "./Movie/SimilarMovies";
import { Images } from "./ObjectImages";
import { Recomendations } from "./Recomendations";
import { TvShowSimilar } from "./TvShow/TvShowSimilar";
import { Video } from "./Video";
import { WatchProviders } from "./WatchProviders";

export interface CommonDetails {
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
  external_ids: ExternalIDs;
  genres: Genre[];
  images: Images;
  videos: Video;
  keywords: Keywords;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  recomendations: Recomendations;
  similar: SimilarMovies | TvShowSimilar;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  watch_providers: WatchProviders;
  release: string;
  runtime: number;
}
