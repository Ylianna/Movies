import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";

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
            </nav>
        </header>
    );
};