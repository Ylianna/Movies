import { Info, Play } from "lucide-react";
import type { Movie } from "../types/Movie";
import styles from "./HeroMovieCard.module.css";
import { useNavigate } from "react-router-dom";

type HeroMovie = Movie & {
  Plot?: string;
  Genre?: string;
  Runtime?: string;
  imdbRating?: string;
};

type Props = {
  movie: HeroMovie | null;
};

const getBetterPosterUrl = (posterUrl: string) => {
  // OMDb often returns an Amazon image with SX300 in URL.
  // Replacing it with a bigger size usually gives a sharper image.
  return posterUrl
    .replace(/SX\d+/i, "SX1400")
    .replace(/SY\d+/i, "SY2000");
};

export const HeroMovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();

  if (!movie) {
    return <section className={styles.placeholder}>Загрузка фильма...</section>;
  }

  const hasPoster = movie.Poster && movie.Poster !== "N/A";
  const posterUrl = hasPoster ? getBetterPosterUrl(movie.Poster) : "";
  const bgStyle = hasPoster ? { backgroundImage: `url(${posterUrl})` } : undefined;

  return (
    <section className={styles.hero} style={bgStyle}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>{movie.Title}</h1>

        <p className={styles.meta}>
          {movie.imdbRating ? `★ ${movie.imdbRating}` : "★ -"} · {movie.Year}
          {movie.Runtime ? ` · ${movie.Runtime}` : ""}
        </p>

        {movie.Genre && <p className={styles.description}>{movie.Genre}</p>}

        {movie.Plot && <p className={styles.description}>{movie.Plot}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.watchBtn}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
          >
            <Play size={20} />
            Смотреть
          </button>
          <button
            type="button"
            className={styles.detailsBtn}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
          >
            <Info size={20} />
            Подробнее
          </button>
        </div>
      </div>
    </section>
  );
};
