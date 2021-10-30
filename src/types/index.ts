export interface ISearch {
  find: string;
}

export interface IAnime {
  airing: boolean;
  end_date: string;
  episodes: number;
  image_url: string;
  mal_id: number;
  members: number;
  rated: string;
  score: number;
  start_date: string;
  synopsis: string;
  title: string;
  type: string;
  url: string;
}

export interface IAnimeResults {
  results: IAnime[];
}
