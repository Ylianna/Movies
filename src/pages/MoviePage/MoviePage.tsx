import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink, Play } from "lucide-react";
import { getMovieById } from "../../features/tutors/api/movies";
import type { Movie } from "../../features/tutors/types/Movie";
import styles from "./MoviePage.module.css";
import { getLocalizedMovieTitle } from "../../shared/utils/localizedMovieTitle";
import {
    isFavoriteMovie,
    subscribeToFavorites,
    toggleFavoriteMovie,
} from "../../shared/api/favorites";

const getBetterPosterUrl = (posterUrl: string) => {
    return posterUrl.replace(/SX\d+/i, "SX1200").replace(/SY\d+/i, "SY1800");
};

export const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const loadMovie = async () => {
            if (!id) {
                setError("Фильм не найден.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");
                const data = await getMovieById(id);
                if (!isCancelled) {
                    if (data.Response === "True") {
                        setMovie(data);
                    } else {
                        setError("Не удалось загрузить фильм.");
                    }
                }
            } catch {
                if (!isCancelled) {
                    setError("Ошибка загрузки фильма.");
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        loadMovie();
        return () => {
            isCancelled = true;
        };
    }, [id]);

    useEffect(() => {
        if (!movie) {
            return;
        }
        setIsFavorite(isFavoriteMovie(movie.imdbID));
        return subscribeToFavorites(() => {
            setIsFavorite(isFavoriteMovie(movie.imdbID));
        });
    }, [movie]);

    const youtubeTrailerUrl = useMemo(() => {
        if (!movie) {
            return "#";
        }
        const query = `${movie.Title} ${movie.Year} trailer`;
        return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    }, [movie]);

    if (loading) {
        return <section className={styles.page}><p className={styles.state}>Загрузка фильма...</p></section>;
    }

    if (error || !movie) {
        return <section className={styles.page}><p className={styles.state}>{error || "Фильм не найден."}</p></section>;
    }

    const poster = movie.Poster && movie.Poster !== "N/A" ? getBetterPosterUrl(movie.Poster) : "";
    const localizedTitle = getLocalizedMovieTitle(movie);

    return (
        <section className={styles.page}>
            <article className={styles.card}>
                {poster ? <img src={poster} alt={localizedTitle} className={styles.poster} /> : <div className={styles.poster} />}

                <div className={styles.content}>
                    <h1 className={styles.title}>{localizedTitle}</h1>
                    <p className={styles.meta}>
                        {movie.imdbRating ? `★ ${movie.imdbRating} · ` : ""}
                        {movie.Year}
                        {movie.Runtime ? ` · ${movie.Runtime}` : ""}
                        {movie.Genre ? ` · ${movie.Genre}` : ""}
                    </p>

                    {movie.Plot && <p className={styles.plot}>{movie.Plot}</p>}

                    <div className={styles.facts}>
                        {movie.Director && <p className={styles.fact}><span>Режиссер:</span> {movie.Director}</p>}
                        {movie.Actors && <p className={styles.fact}><span>Актеры:</span> {movie.Actors}</p>}
                        {movie.Released && <p className={styles.fact}><span>Премьера:</span> {movie.Released}</p>}
                        {movie.Country && <p className={styles.fact}><span>Страна:</span> {movie.Country}</p>}
                        {movie.Language && <p className={styles.fact}><span>Язык:</span> {movie.Language}</p>}
                        {movie.Awards && <p className={styles.fact}><span>Награды:</span> {movie.Awards}</p>}
                    </div>

                    <div className={styles.actions}>
                        <a
                            href={youtubeTrailerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.watchBtn}
                        >
                            <Play size={18} />
                            Смотреть трейлер
                        </a>
                        <a
                            href={`https://www.imdb.com/title/${movie.imdbID}/`}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.secondaryBtn}
                        >
                            <ExternalLink size={18} />
                            Открыть IMDb
                        </a>
                        <Link to="/catalog" className={styles.secondaryBtn}>
                            Назад в каталог
                        </Link>
                        <button
                            type="button"
                            className={styles.secondaryBtn}
                            onClick={() => setIsFavorite(toggleFavoriteMovie(movie))}
                        >
                            {isFavorite ? "Убрать из избранного" : "В избранное"}
                        </button>
                    </div>
                </div>
            </article>
        </section>
    );
};