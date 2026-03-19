import styles from "./HeaderIcons.module.css";
import { Search, UserCircle } from "lucide-react";

export function HeaderIcons() {
    return (
        <div className={styles.icons}>
            <button className={styles.iconBtn} aria-label="Search">
                <Search size={22} />
            </button>

            <button className={styles.iconBtn} aria-label="Profile">
                <UserCircle size={26} />
            </button>
        </div>
    );
}