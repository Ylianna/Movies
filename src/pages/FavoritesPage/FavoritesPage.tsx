import { useEffect, useState } from "react";
import { MovieList } from "../../features/tutors/component/MovieList";
import type { Movie } from "../../features/tutors/types/Movie";
import { getFavoriteMovies, subscribeToFavorites } from "../../shared/api/favorites";
import { Container } from "../../shared/components/Container";

export const FavoritesPage = () => {
    const [movies, setMovies] = useState<Movie[]>(() => getFavoriteMovies());

    useEffect(() => {
        const sync = () => setMovies(getFavoriteMovies());
        sync();
        return subscribeToFavorites(sync);
    }, []);

    return (
        <Container>
            <h1>Избранное</h1>
            {movies.length === 0 ? (
                <p>Вы пока не добавили фильмы в избранное.</p>
            ) : (
                <MovieList movies={movies} />
            )}
        </Container>
    );
};
