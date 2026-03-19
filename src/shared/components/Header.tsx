import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { HeaderIcons } from "./HeaderIcons";
import { useState } from "react";
import type { FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export const Header = () => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        const value = searchValue.trim();
        if (!value) {
            navigate("/catalog");
            return;
        }
        navigate(`/catalog?q=${encodeURIComponent(value)}`);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>

            <nav className={styles.menu}>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/catalog">Каталог</NavLink>
                <NavLink to="/favorites">Избранное</NavLink>
            </nav>

            <div className={styles.actions}>
                {isSearchOpen && (
                    <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                        <input
                            autoFocus
                            className={styles.searchInput}
                            placeholder="Поиск фильма..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button type="submit" className={styles.searchSubmit} aria-label="Run search">
                            <Search size={16} />
                        </button>
                    </form>
                )}
                <HeaderIcons onSearchClick={() => setIsSearchOpen((open) => !open)} />
            </div>
        </header>
    );
};