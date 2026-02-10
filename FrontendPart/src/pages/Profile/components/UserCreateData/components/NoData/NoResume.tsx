import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import warning from '../../../../../../assets/global/warning.svg';
import pStyles from '../../../../styles.module.scss';
import { Link } from 'react-router-dom';

interface IProps {
    title: string;
    description: string;
    redirect: { url: string, name: string };
}

export function NoData(props: IProps) {

    const { redirect, title, description } = props;


    return (
        <div className={styles.resume}>
            <h2 className={`${gStyles.textLarge} ${styles.title}`}>{title}</h2>
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={`${styles.bodyImage}`}>
                        <img src={warning} />
                    </div>
                    <p className={`${gStyles.textLarge} ${styles.text}`}>{description}</p>
                    <Link to={redirect.url} className={`${gStyles.textBig} ${styles.createButton} ${pStyles.button}`}>{redirect.name}</Link>
                </div>
            </div>
        </div>
    );

}