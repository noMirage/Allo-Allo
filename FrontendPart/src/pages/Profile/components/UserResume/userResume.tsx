import gStyles from '../../../../styles/styles.module.scss';
import styles from './styles.module.scss';
import warning from '../../../../assets/global/warning.svg';
import pStyles from '../../styles.module.scss';

export function UserResume(props: any) {

    const { } = props;

    return (<div className={styles.resume}>
        <h2 className={`${gStyles.textLarge} ${styles.title}`}>Резюме</h2>
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={`${styles.bodyImage}`}>
                    <img src={warning} />
                </div>
                <p className={`${gStyles.textLarge} ${styles.text}`}>Ви немаєте жодного створенного резюме, будь ласка створіть!</p>
                <button className={`${gStyles.textBig} ${styles.createButton} ${pStyles.button}`}>Створити резюме</button>
            </div>
        </div>
    </div>
    );

}