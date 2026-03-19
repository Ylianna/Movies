import type { Movie } from "../../features/tutors/types/Movie";
import { getLocalizedMovieTitle } from "../utils/localizedMovieTitle";
import { Link } from "react-router-dom";

type Props = {
    movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
    const img = movie.Poster !== "N/A" ? movie.Poster : undefined;
    const title = getLocalizedMovieTitle(movie);

    return (
        <Link
            to={`/movie/${movie.imdbID}`}
            style={{
                width: "200px",
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "8px",
                textDecoration: "none",
                color: "inherit",
                display: "block",
            }}
        >
            {img ? (
                <img src={img} style={{ width: "100%", borderRadius: "4px" }} alt={title} />
            ) : (
                <div
                    style={{
                        width: "100%",
                        aspectRatio: "2 / 3",
                        borderRadius: "4px",
                        background: "#eee",
                    }}
                />
            )}

            <h3>{title}</h3>

            <p>{movie.Year}</p>
        </Link>
    );
};