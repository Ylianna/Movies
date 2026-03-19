import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getMovieById, getPopularMovies, searchMovies } from "../../features/tutors/api/movies";
import type { Movie } from "../../features/tutors/types/Movie";
import styles from "./CatalogPage.module.css";
import { getLocalizedMovieTitle } from "../../shared/utils/localizedMovieTitle";
import {
    isFavoriteMovie,
    subscribeToFavorites,
    toggleFavoriteMovie,
} from "../../shared/api/favorites";

export const CatalogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") ?? "";
    const [inputValue, setInputValue] = useState(initialQuery);
    const [query, setQuery] = useState(initialQuery);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("Все");
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("popular");

    const genreList = ["Все", "Боевик", "Фантастика", "Комедия", "Триллер", "Драма", "Мелодрама"];

    useEffect(() => {
        const urlQuery = searchParams.get("q") ?? "";
        setInputValue(urlQuery);
        setQuery(urlQuery);
        setPage(1);
    }, [searchParams]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const nextQuery = inputValue.trim();
            setQuery(nextQuery);
            setPage(1);
            const currentQuery = searchParams.get("q") ?? "";

            if (nextQuery === currentQuery) {
                return;
            }

            if (nextQuery) {
                setSearchParams({ q: nextQuery }, { replace: true });
            } else {
                setSearchParams({}, { replace: true });
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue, searchParams, setSearchParams]);

    useEffect(() => {
        let isCancelled = false;

        const loadMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const data = query
                    ? await searchMovies({ query, page })
                    : await getPopularMovies(page);

                if (data.Response !== "True" || !data.Search) {
                    if (!isCancelled) {
                        setMovies([]);
                        setTotalPages(1);
                    }
                    return;
                }

                const total = Number(data.totalResults || 0);
                const pages = Math.max(1, Math.ceil(total / 10));
                const limitedPages = Math.min(pages, 100); // OMDb supports up to 100 pages

                const detailedMovies = await Promise.all(
                    data.Search.map(async (movie: Movie) => {
                        try {
                            const details = await getMovieById(movie.imdbID);
                            return details.Response === "True" ? details : movie;
                        } catch {
                            return movie;
                        }
                    }),
                );

                if (!isCancelled) {
                    setMovies(detailedMovies);
                    setTotalPages(limitedPages);
                }
            } catch {
                if (!isCancelled) {
                    setError("Не удалось загрузить каталог. Попробуйте еще раз.");
                    setMovies([]);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        loadMovies();

        return () => {
            isCancelled = true;
        };
    }, [query, page]);

    const filteredMovies = useMemo(() => {
        const filtered = movies.filter((movie) => {
            const genreMatch =
                selectedGenre === "Все" ||
                (movie.Genre ? movie.Genre.toLowerCase().includes(selectedGenre.toLowerCase()) : false);

            const rating = Number(movie.imdbRating || 0);
            const ratingMatch = rating >= minRating;

            return genreMatch && ratingMatch;
        });

        if (sortBy === "rating") {
            return [...filtered].sort((a, b) => Number(b.imdbRating || 0) - Number(a.imdbRating || 0));
        }
        if (sortBy === "year") {
            return [...filtered].sort((a, b) => Number(b.Year || 0) - Number(a.Year || 0));
        }

        return filtered;
    }, [movies, selectedGenre, minRating, sortBy]);

    const pageNumbers = useMemo(() => {
        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }, [page, totalPages]);

    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const sync = () => {
            setFavoriteIds(new Set(movies.filter((movie) => isFavoriteMovie(movie.imdbID)).map((movie) => movie.imdbID)));
        };
        sync();
        return subscribeToFavorites(sync);
    }, [movies]);

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Каталог фильмов</h1>

            <div className={styles.searchWrap}>
                <input
                    className={styles.searchInput}
                    placeholder="Поиск фильма..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className={styles.filtersRow}>
                <div className={styles.genres}>
                    {genreList.map((genre) => (
                        <button
                            key={genre}
                            type="button"
                            className={`${styles.chip} ${selectedGenre === genre ? styles.chipActive : ""}`}
                            onClick={() => setSelectedGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

                <div className={styles.controlGroup}>
                    <select className={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popular">Популярные</option>
                        <option value="rating">По рейтингу</option>
                        <option value="year">По году</option>
                    </select>
                    <button
                        type="button"
                        className={`${styles.chip} ${minRating === 7 ? styles.chipActive : ""}`}
                        onClick={() => setMinRating((value) => (value === 7 ? 0 : 7))}
                    >
                        {">= 7"}
                    </button>
                    <button
                        type="button"
                        className={`${styles.chip} ${minRating === 8 ? styles.chipActive : ""}`}
                        onClick={() => setMinRating((value) => (value === 8 ? 0 : 8))}
                    >
                        {">= 8"}
                    </button>
                </div>
            </div>

            {loading && <p className={styles.loading}>Загрузка...</p>}
            {error && <p className={styles.loading}>{error}</p>}

            {!loading && !error && filteredMovies.length === 0 && (
                <p className={styles.empty}>Ничего не найдено по вашему запросу.</p>
            )}

            {!loading && !error && filteredMovies.length > 0 && (
                <div className={styles.grid}>
                    {filteredMovies.map((movie) => (
                        <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className={styles.card}>
                            {movie.Poster && movie.Poster !== "N/A" ? (
                                <img
                                    src={movie.Poster}
                                    alt={getLocalizedMovieTitle(movie)}
                                    className={styles.poster}
                                />
                            ) : (
                                <div className={styles.poster} />
                            )}
                            <div className={styles.meta}>
                                <h3 className={styles.name}>{getLocalizedMovieTitle(movie)}</h3>
                                <p className={styles.sub}>
                                    {movie.imdbRating ? `★ ${movie.imdbRating} · ` : ""}
                                    {movie.Year}
                                </p>
                                <button
                                    type="button"
                                    className={`${styles.favoriteBtn} ${favoriteIds.has(movie.imdbID) ? styles.favoriteBtnActive : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavoriteMovie(movie);
                                    }}
                                >
                                    {favoriteIds.has(movie.imdbID) ? "В избранном" : "В избранное"}
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <div className={styles.pagination}>
                <button
                    type="button"
                    className={styles.pageBtn}
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    {"<"}
                </button>

                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        type="button"
                        className={`${styles.pageBtn} ${page === number ? styles.pageActive : ""}`}
                        onClick={() => setPage(number)}
                    >
                        {number}
                    </button>
                ))}

                <button
                    type="button"
                    className={styles.pageBtn}
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                    {">"}
                </button>
            </div>
        </section>
    );
};