import styles from "./HeaderIcons.module.css";
import { useEffect, useState } from "react";
import { Search, UserCircle } from "lucide-react";

type Props = {
    onSearchClick?: () => void;
    onUserClick: () => void;
};

export function HeaderIcons({ onSearchClick, onUserClick }: Props) {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        setUserEmail(email);
    }, []);

    return (
        <div className={styles.icons}>
            <button className={styles.iconBtn} aria-label="Search" onClick={onSearchClick}>
                <Search size={22} />
            </button>

            {userEmail ? (
                // Если залогинен — рендерится просто текст без тега button
                <span className={styles.emailText}>{userEmail}</span>
            ) : (
                // Если не залогинен — рендерится кнопка с иконкой
                <button className={styles.iconBtn} aria-label="Profile" onClick={onUserClick}>
                    <UserCircle size={26} />
                </button>
            )}
        </div>
    );
}