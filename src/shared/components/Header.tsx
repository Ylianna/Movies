import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { HeaderIcons } from "./HeaderIcons";

export const Header = () => {
    const baseUrl = import.meta.env.BASE_URL;
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>

            <nav className={styles.menu}>
                <a href={baseUrl}>Главная</a>
                <a href={`${baseUrl}catalog`}>Каталог</a>
                <a href={`${baseUrl}favorites`}>Избранное</a>
                <a href={`${baseUrl}find`}>Поиск</a>
            </nav>

            <HeaderIcons />
        </header>
    );
};