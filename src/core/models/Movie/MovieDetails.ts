import { Keywords } from "../Keywords";
import { Images } from "../ObjectImages";
import { Credits } from "../Credits";
import { ExternalIDs } from "../ExternalIds";
import { MovieList } from "./MovieList";
import { Recomendations } from "../Recomendations";
import { ModelVideo } from "../ModelVideo";
import { WatchProviders } from "../WatchProviders";
import { SimilarMovies } from "./SimilarMovies";

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  images: Images;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  lists: MovieList;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  external_ids: ExternalIDs;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits;
  videos: ModelVideo;
  keywords: Keywords;

  recomendations: Recomendations;
  watch_providers: WatchProviders;
  similar: SimilarMovies;
}
