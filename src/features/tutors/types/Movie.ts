export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;

  // Эти поля есть только у "детального" ответа по `?i=...`
  imdbRating?: string;
  Genre?: string;
  Runtime?: string;
  Plot?: string;
  imdbVotes?: string;
  Released?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Country?: string;
  Language?: string;
  Awards?: string;
};