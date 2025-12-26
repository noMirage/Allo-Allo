import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../../../assets/global/logowork.jpg';
import { DETAILS_WORKER_PATH } from '../../../../routs/routs';
import { PATH_TO_STORE } from '../../../../configs/configs';
import { IResume } from '../../../../interfaces/resume';

interface IProps {
    data: IResume[];
    sectionName: string;
}

export function ListWorkers(props: IProps) {
    const { data, sectionName } = props;

    return (
        <ul className={styles.list}>
            {data.map((item, _) => {
                return (
                    <li>
                        <Link className={styles.itemBody} to={`${DETAILS_WORKER_PATH}/${item.id}/${item.title}/${sectionName}`}>
                            <div className={styles.wrapper}>
                                <div className={styles.bodyLogo}>
                                    <img src={item.user.avatar ? `${PATH_TO_STORE}${item.user.avatar}` : defaultAvatar} alt='logo' />
                                </div>
                                <div className={styles.bodyText}>
                                    <h3 className={`${gStyles.textLarge}`}>{item.title}</h3>
                                    <p className={`${gStyles.textExtraBig}`}>{item.description}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}