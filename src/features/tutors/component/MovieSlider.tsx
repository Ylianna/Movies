import type { Movie } from "../types/Movie";
import { MovieCard } from "../../../shared/components/MovieCard";

type Props = {
    movies?: Movie[];
};

export const MovieSlider = ({ movies = [] }: Props) => {
    return (
        <div style={{ display: "flex", overflowX: "scroll", gap: "20px" }}>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};