import { JSX, useContext } from "react";
import styles from './styles.module.scss'
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { ShowLayout } from "../contexts/layout";

function Layout({ children }: { children: JSX.Element }) {
    const isLayout = useContext(ShowLayout).value;

    return (
        <div className={styles.body}>
            {isLayout && <Header />}
            <main className={styles.page}>
                {children}
            </main>
            {isLayout && <Footer />}
        </div>
    );
}

export default Layout;