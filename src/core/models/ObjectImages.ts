export interface Images {
  backdrops: Backdrop[];
  id: number;
  logos: any[];
  posters: Poster[];
}

export interface Backdrop {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1?: any;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Poster {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

