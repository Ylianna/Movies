import type { Movie } from "../types/Movie";
import { MovieCard } from "../../../shared/components/MovieCard";

type Props = {
    movies: Movie[];
};

export const MovieList = ({ movies }: Props) => {
    return (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};