import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { Navigate } from '../../components/ui/navigate/navigate';
import { INavigate } from '../../interfaces/navigate';
import { ABOUT_US_PATH, HOME_PATH } from '../../routs/routs';

const NAV_LIST: INavigate[] = [{ category: 'Головна', to: HOME_PATH }, { category: 'Про нас', to: ABOUT_US_PATH }];

export function Contacts() {
    return (
        <section className={styles.wrapper}>
            <div className={gStyles.container}>
                <Navigate className={styles.list} navigateList={NAV_LIST} />
                <div className={styles.body}>
                    <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>Контакти</h2>
                    <p className={`${styles.description} ${gStyles.textExtraBig}`}>
                        Ми завжди відкриті до співпраці та готові відповісти на ваші запитання. Оберіть зручний спосіб зв’язку, і ми відгукнемося найближчим часом.
                    </p>
                    <address className={`${gStyles.textBig} ${styles.phone} ${styles.contacts}`}>
                        <p>Номер телефона:</p>
                        <p>+ 380 95 854 8 443</p>
                    </address>
                    <address className={`${gStyles.textBig} ${styles.email} ${styles.contacts}`}>
                        <p>Електрона пошта:</p>
                        <p>andriiUk@gmail.com</p>
                    </address>
                </div>
            </div>
        </section>
    );
}