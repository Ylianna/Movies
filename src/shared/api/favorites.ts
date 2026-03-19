import type { Movie } from "../../features/tutors/types/Movie";

const FAVORITES_STORAGE_KEY = "movie_favorites_v1";
const FAVORITES_UPDATED_EVENT = "favorites:updated";

const readFavorites = (): Movie[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as Movie[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeFavorites = (favorites: Movie[]) => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
};

export const getFavoriteMovies = () => readFavorites();

export const isFavoriteMovie = (imdbID: string) =>
  readFavorites().some((movie) => movie.imdbID === imdbID);

export const addFavoriteMovie = (movie: Movie) => {
  const favorites = readFavorites();
  if (favorites.some((item) => item.imdbID === movie.imdbID)) {
    return;
  }
  writeFavorites([movie, ...favorites]);
};

export const removeFavoriteMovie = (imdbID: string) => {
  const favorites = readFavorites();
  writeFavorites(favorites.filter((movie) => movie.imdbID !== imdbID));
};

export const toggleFavoriteMovie = (movie: Movie) => {
  if (isFavoriteMovie(movie.imdbID)) {
    removeFavoriteMovie(movie.imdbID);
    return false;
  }
  addFavoriteMovie(movie);
  return true;
};

export const subscribeToFavorites = (listener: () => void) => {
  window.addEventListener(FAVORITES_UPDATED_EVENT, listener);
  return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, listener);
};
