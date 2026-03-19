type MovieTitleSource = {
  imdbID?: string;
  Title?: string;
};

import movieTitlesRu from "../data/movieTitles.ru.json";

const RU_TITLE_BY_IMDB_ID = movieTitlesRu.byImdbId as Record<string, string>;
const RU_TITLE_BY_ORIGINAL = movieTitlesRu.byOriginalTitle as Record<string, string>;
const missingTitleLogs = new Set<string>();

export const getLocalizedMovieTitle = ({ imdbID, Title }: MovieTitleSource) => {
  if (imdbID && RU_TITLE_BY_IMDB_ID[imdbID]) {
    return RU_TITLE_BY_IMDB_ID[imdbID];
  }

  if (Title && RU_TITLE_BY_ORIGINAL[Title]) {
    return RU_TITLE_BY_ORIGINAL[Title];
  }

  if (import.meta.env.DEV) {
    const key = imdbID ? `${imdbID} | ${Title ?? "Без названия"}` : `no-id | ${Title ?? "Без названия"}`;
    if (!missingTitleLogs.has(key)) {
      missingTitleLogs.add(key);
      console.info(`[i18n] Missing RU title: ${key}`);
    }
  }

  return Title ?? "Без названия";
};
