export enum eOMDBType {
  ALL = "all",
  MOVIE = "movie",
  SERIES = "series",
  EPISODE = "episode",
}
export type searchResponseType = {
  Search: SearchItemType[];
  totalResults: string;
  Response: string;
  Error?: string;
};

export type SearchItemType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: eOMDBType;
  Poster: string;
};

export type Rating = {
  Source: string;
  Value: string;
};
export type SearchOptionsType = {
  searchTerm: string;
  year?: number;
  type?: eOMDBType;
  page?: number;
};
