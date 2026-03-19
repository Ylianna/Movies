import type { Movie } from "../types/Movie";
import { MovieCard } from "../../../shared/components/MovieCard";
import styles from "./MovieList.module.css";

type Props = {
    movies: Movie[];
};

export const MovieList = ({ movies }: Props) => {
    return (
        <div className={styles.grid}>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};