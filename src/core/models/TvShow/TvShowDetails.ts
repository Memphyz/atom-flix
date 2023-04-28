export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
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

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface Videos {
  results: Result[];
}

export interface Images {
  backdrops: any[];
  logos: any[];
  posters: any[];
}

export interface EpisodesSeason {
  _id: string
  air_date: string
  episodes: Episode[]
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
}

export interface Episode {
  air_date: string
  episode_number: number
  crew: Crew[]
  guest_stars: GuestStar[]
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
}

export interface GuestStar {
  credit_id: string
  order: number
  character: string
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Role {
  credit_id: string;
  character: string;
  episode_count: number;
}

export interface Cast2 {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: Role[];
  total_episode_count: number;
  order: number;
}

export interface Job {
  credit_id: string;
  job: string;
  episode_count: number;
}

export interface Crew2 {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  jobs: Job[];
  department: string;
  total_episode_count: number;
}

export interface AggregateCredits {
  cast: Cast2[];
  crew: Crew2[];
}

export interface Item {
  id: string;
  action: string;
  time: string;
  iso_639_1: string;
  iso_3166_1: string;
  value: any;
  original_value: any;
}

export interface Change {
  key: string;
  items: Item[];
}

export interface Changes {
  changes: Change[];
}

export interface Result2 {
  descriptors: any[];
  iso_3166_1: string;
  rating: string;
}

export interface ContentRatings {
  results: Result2[];
}

export interface EpisodeGroups {
  results: any[];
}

export interface ExternalIds {
  imdb_id: string;
  freebase_mid?: any;
  freebase_id?: any;
  tvdb_id: number;
  tvrage_id?: any;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface Result3 {
  name: string;
  id: number;
}

export interface Keywords {
  results: Result3[];
}

export interface TvShowRecomendations {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface Recommendations {
  page: number;
  results: TvShowRecomendations[];
  total_pages: number;
  total_results: number;
}

export interface Reviews {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export interface ScreenedTheatrically {
  results: any[];
}

export interface TvShowSimilarResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TvShowSimilar {
  page: number;
  results: TvShowSimilarResult[];
  total_pages: number;
  total_results: number;
}

export interface TvShowDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air?: any;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  images: Images;
  credits: Credits;
  aggregate_credits: AggregateCredits;
  changes: Changes;
  content_ratings: ContentRatings;
  episode_groups: EpisodeGroups;
  external_ids: ExternalIds;
  keywords: Keywords;
  recommendations: Recommendations;
  reviews: Reviews;
  screened_theatrically: ScreenedTheatrically;
  similar: TvShowSimilar;
}
