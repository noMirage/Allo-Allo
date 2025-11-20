import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { IBaseinfoWorkers } from '../../../../interfaces/works';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../assets/global/logowork.jpg';
import star from '../../../../assets/global/starIcon.svg';
import reviews from '../../../../assets/global/reviewsIcon.svg';
import { DETAILS_WORKER_PATH } from '../../../../routs/routs';

interface IProps {
    data: IBaseinfoWorkers[];
    sectionName: string;
}

export function ListWorkers(props: IProps) {
    const { data, sectionName } = props;

    return (
        <ul className={styles.list}>
            {data.map((item, _) => (
                <li>
                    <Link className={styles.itemBody} to={`${DETAILS_WORKER_PATH}/${item.id}/${item.title}/${sectionName}`}>
                        <div className={styles.wrapper}>
                            <div className={styles.bodyLogo}>
                                <img src={logo} alt='logo' />
                            </div>
                            <div className={styles.bodyText}>
                                <h3 className={`${gStyles.textLarge}`}>{item.title}</h3>
                                <p className={`${gStyles.textExtraBig}`}>{item.text}</p>
                            </div>
                        </div>
                        <div className={styles.bodyInfo}>
                            <div className={styles.star}>
                                <img src={star} />
                                <p className={`${gStyles.textExtraBig}`}>{item.rating}</p>
                            </div>
                            <div className={styles.reviews}>
                                <img src={reviews} />
                                <p className={`${gStyles.textExtraBig}`}>{item.reviews}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}