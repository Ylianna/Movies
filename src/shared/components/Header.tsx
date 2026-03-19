import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { HeaderIcons } from "./HeaderIcons";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>

            <nav className={styles.menu}>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/catalog">Каталог</NavLink>
                <NavLink to="/favorites">Избранное</NavLink>
                <NavLink to="/find">Поиск</NavLink>
            </nav>

            <HeaderIcons />
        </header>
    );
};