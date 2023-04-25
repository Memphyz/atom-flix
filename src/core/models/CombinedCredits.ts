
export interface CombinedCredits {
  cast: Cast[]
  crew: Crew[]
}

export interface Cast {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  overview: string
  popularity: number
  poster_path: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  character: string
  credit_id: string
  order?: number
  media_type: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
}

export interface Crew {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
  credit_id: string
  department: string
  episode_count: number
  job: string
  media_type: string
}

export interface ExternalIds {
  freebase_mid: string
  freebase_id: any
  imdb_id: string
  tvrage_id: any
  wikidata_id: string
  facebook_id: string
  instagram_id: any
  tiktok_id: any
  twitter_id: string
  youtube_id: any
}

export interface Images {
  profiles: Profile[]
}

export interface Profile {
  aspect_ratio: number
  height: number
  iso_639_1: any
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}
