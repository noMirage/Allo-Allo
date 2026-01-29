import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import warning from '../../assets/global/warning.svg';

export function NotFound() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img className={styles.icon} src={warning} alt="" />
                <p className={gStyles.textExtraLarge} >Сторінка не знайдена!</p>
            </div>
        </div>
    );
}