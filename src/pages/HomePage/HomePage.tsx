import { useEffect, useState } from "react";
import { getMovieById, getPopularMovies } from "../../features/tutors/api/movies";
import { HeroMovieCard } from "../../features/tutors/component/HeroMovieCard";
import { MovieList } from "../../features/tutors/component/MovieList";
import type { Movie } from "../../features/tutors/types/Movie";
import { Container } from "../../shared/components/Container";

export const HomePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [heroMovie, setHeroMovie] = useState<Movie | null>(null);

    useEffect(() => {
        getPopularMovies().then(async (data) => {
            if (data.Response === "True" && data.Search?.length) {
                setMovies(data.Search);

                const firstMovie = data.Search[0];
                const details = await getMovieById(firstMovie.imdbID);
                if (details.Response === "True") {
                    setHeroMovie(details);
                } else {
                    setHeroMovie(firstMovie);
                }
            }
        });
    }, []);

    return (
        <Container>
            <HeroMovieCard movie={heroMovie} />
            <h1>Популярные фильмы</h1>
            <MovieList movies={movies} />
        </Container>
    );
};