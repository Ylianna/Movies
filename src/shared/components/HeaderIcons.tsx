import styles from "./HeaderIcons.module.css";
import { Search, UserCircle } from "lucide-react";

type Props = {
    onSearchClick?: () => void;
};

export function HeaderIcons({ onSearchClick }: Props) {
    return (
        <div className={styles.icons}>
            <button className={styles.iconBtn} aria-label="Search" onClick={onSearchClick}>
                <Search size={22} />
            </button>

            <button className={styles.iconBtn} aria-label="Profile">
                <UserCircle size={26} />
            </button>
        </div>
    );
}