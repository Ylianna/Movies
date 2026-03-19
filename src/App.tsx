import { Header } from "./shared/components/Header";
import { Route, Routes } from "react-router-dom";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { MoviePage } from "./pages/MoviePage/MoviePage";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/find" element={<h1>Поиск (в разработке)</h1>} />
            </Routes>
        </>
    );
}

export default App;