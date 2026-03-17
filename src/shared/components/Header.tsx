import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>

            <nav className={styles.menu}>
                <a href="/">Главная</a>
                <a href="/catalog">Каталог</a>
            </nav>
        </header>
    );
};