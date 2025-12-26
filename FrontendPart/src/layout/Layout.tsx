import { JSX } from "react";
import styles from './styles.module.scss'
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

function Layout({ children }: { children: JSX.Element }) {
    return (
        <div className={styles.body}>
            <Header />
            <main className={styles.page}>
                  {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;