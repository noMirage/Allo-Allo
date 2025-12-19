import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import pStyles from '../../styles.module.scss';
import { DETAIL_REGISTER, REGISTER_PATH } from '../../../../routs/routs';
import { Link } from 'react-router-dom';

interface IProps {
    path: string;
}

export function Greet(props: IProps) {
    const { path } = props;

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container} ${pStyles.bodyForm}`}>
                <h1 className={`${gStyles.textExtraLarge} ${styles.title}`}>Вітаємо!</h1>
                <p className={`${gStyles.textLarge} ${styles.text}`}>Ви зробили перший крок — акаунт майже успішно створений.</p>
                <p className={`${gStyles.textLarge}`}>Для завершення реєстрації, потрібно ще пройти меленькі кроки</p>
            </div>
            <div className={styles.containerButtons}>
                <Link className={`${gStyles.textBig}`} to={`${REGISTER_PATH}`}>
                    Назад
                </Link>
                <Link
                    to={path}
                    className={`${gStyles.textBig}`}
                >
                    Далі
                </Link>
            </div>
        </div>
    );
}