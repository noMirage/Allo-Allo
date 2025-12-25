import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import warning from '../../../../../../assets/global/warning.svg';
import pStyles from '../../../../styles.module.scss';
import { Link } from 'react-router-dom';
import { CREATE_RESUME } from '../../../../../../routs/routs';

interface IProps {
    
}

export function NoResume(props: IProps) {

    const { } = props;


    return (
        <div className={styles.resume}>
            <h2 className={`${gStyles.textLarge} ${styles.title}`}>Резюме</h2>
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={`${styles.bodyImage}`}>
                        <img src={warning} />
                    </div>
                    <p className={`${gStyles.textLarge} ${styles.text}`}>Ви немаєте жодного створенного резюме, будь ласка створіть!</p>
                    <Link to={CREATE_RESUME} className={`${gStyles.textBig} ${styles.createButton} ${pStyles.button}`}>Створити резюме</Link>
                </div>
            </div>
        </div>
    );

}