export interface EpisodeDetails {
  air_date: string;
  crew: Crew[];
  episode_number: number;
  guest_stars: GuestStar[];
  name: string;
  overview: string;
  id: number;
  runtime: number;
  images: Images;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Images {
  stills: Still[]
}

export interface Still {
  aspect_ratio: number
  height: number
  iso_639_1: any
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}


export interface Crew {
  id: number
  credit_id: string
  name: string
  department: string
  job: string
  profile_path?: string
}

export interface GuestStar {
  id: number
  name: string
  credit_id: string
  character: string
  order: number
  profile_path: string
}
