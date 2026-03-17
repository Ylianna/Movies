export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;

  // Эти поля есть только у "детального" ответа по `?i=...`
  imdbRating?: string;
};