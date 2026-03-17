import { useEffect, useState } from "react";
import { getPopularMovies } from "../../features/tutors/api/movies"; // должен вернуть { Search: Movie[] }
import { MovieList } from "../../features/tutors/component/MovieList";
import type { Movie } from "../../features/tutors/types/Movie";
import { Container } from "../../shared/components/Container";

export const HomePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getPopularMovies().then((data) => {
            if (data.Response === "True" && data.Search) {
                setMovies(data.Search); // берём массив Search из OMDb
            }
        });
    }, []);

    return (
        <Container>
            <h1>Популярные фильмы</h1>
            <MovieList movies={movies} /> {/* передаём состояние */}
        </Container>
    );
};