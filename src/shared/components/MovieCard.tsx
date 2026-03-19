import type { Movie } from "../../features/tutors/types/Movie";
import { getLocalizedMovieTitle } from "../utils/localizedMovieTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    isFavoriteMovie,
    subscribeToFavorites,
    toggleFavoriteMovie,
} from "../api/favorites";
import styles from "./MovieCard.module.css";

type Props = {
    movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
    const img = movie.Poster !== "N/A" ? movie.Poster : undefined;
    const title = getLocalizedMovieTitle(movie);
    const [isFavorite, setIsFavorite] = useState(() => isFavoriteMovie(movie.imdbID));

    useEffect(() => {
        setIsFavorite(isFavoriteMovie(movie.imdbID));
        return subscribeToFavorites(() => {
            setIsFavorite(isFavoriteMovie(movie.imdbID));
        });
    }, [movie.imdbID]);

    return (
        <div className={styles.card}>
            <Link
                to={`/movie/${movie.imdbID}`}
                className={styles.link}
            >
                {img ? (
                    <img src={img} className={styles.poster} alt={title} />
                ) : (
                    <div className={styles.poster} />
                )}

                <h3 className={styles.title}>{title}</h3>

                <p className={styles.year}>{movie.Year}</p>
            </Link>

            <button
                type="button"
                onClick={() => setIsFavorite(toggleFavoriteMovie(movie))}
                className={`${styles.favBtn} ${isFavorite ? styles.favBtnActive : ""}`}
            >
                {isFavorite ? "Убрать из избранного" : "В избранное"}
            </button>
        </div>
    );
};