export interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: Date;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}

export interface MovieVideo {
  id: number;
  results: Result[];
}
