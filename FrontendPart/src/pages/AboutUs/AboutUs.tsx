import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { Navigate } from '../../components/ui/navigate/navigate';
import { INavigate } from '../../interfaces/navigate';
import { CONTACTS_PATH, HOME_PATH } from '../../routs/routs';

const NAV_LIST: INavigate[] = [{ category: 'Головна', to: HOME_PATH }, { category: 'Контакти', to: CONTACTS_PATH }];

export function AboutUs() {
    return (
        <section className={styles.wrapper}>
            <div className={gStyles.container}>
                <Navigate className={styles.list} navigateList={NAV_LIST} />
                <div className={styles.body}>
                    <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>Про нас</h2>
                    <p className={`${styles.description} ${gStyles.textExtraBig}`}>
                        У сучасному світі знайти надійного майстра з будівництва чи ремонту часто складно. Люди зазвичай шукають через знайомих або випадкові оголошення, але це не завжди гарантує якість. Саме тому й виникла ідея створити платформу, де майстри самі можуть представляти себе, показувати своє портфоліо та відгуки клієнтів.
                    </p>
                    <p className={`${styles.mainIdeaText} ${gStyles.textExtraBig}`}><span>Наша мета</span> — зробити взаємодію між майстром і замовником <span>максимально комфортною</span> та без зайвих витрат часу. <span>Наша ціль</span> — забезпечити, щоб цей процес був швидким та інтуїтивно зрозумілим.</p>
                </div>
            </div>
        </section>
    );
}