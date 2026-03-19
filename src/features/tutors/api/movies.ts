import { apiClient } from "../../../shared/api/apiClient";

type MovieSearchParams = {
  query: string;
  page?: number;
};

export const searchMovies = ({ query, page = 1 }: MovieSearchParams) => {
  return apiClient(`?s=${encodeURIComponent(query)}&type=movie&page=${page}`);
};

export const getPopularMovies = (page = 1) => {
  // В OMDb нет "popular", поэтому используем дефолтный популярный запрос.
  return searchMovies({ query: "guardians", page });
};

export const getMovieById = (id: string) => {
  return apiClient(`?i=${encodeURIComponent(id)}`);
};