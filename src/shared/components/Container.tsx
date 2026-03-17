import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const Container = ({ children }: Props) => {
    return <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>{children}</div>;
};