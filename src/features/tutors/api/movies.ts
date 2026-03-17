import { apiClient } from "../../../shared/api/apiClient";

export const getPopularMovies = () => {
  // В OMDb нет "popular", поэтому используем поиск по дефолтному запросу
  return apiClient("?s=guardians&type=movie");
};

export const getMovieById = (id: string) => {
  return apiClient(`?i=${encodeURIComponent(id)}`);
};