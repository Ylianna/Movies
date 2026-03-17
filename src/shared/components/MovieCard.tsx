import type { Movie } from "../../features/tutors/types/Movie";

type Props = {
    movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
    const img = movie.Poster !== "N/A" ? movie.Poster : undefined;

    return (
        <div style={{ width: "200px", border: "1px solid #ccc", padding: "8px", borderRadius: "8px" }}>
            {img ? (
                <img src={img} style={{ width: "100%", borderRadius: "4px" }} alt={movie.Title} />
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

            <h3>{movie.Title}</h3>

            <p>{movie.Year}</p>
        </div>
    );
};