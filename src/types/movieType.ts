export interface Movie {
  id: number;
  title: string;
  release_date: string;
}

export interface MovieApiResponse {
  results: Movie[];
}