import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../../../assets/global/avatar.jpg';
import { DETAILS_WORKER_PATH } from '../../../../routs/routs';
import { PATH_TO_STORE } from '../../../../configs/configs';
import { IResume } from '../../../../interfaces/resume';
import { TCategoryWorks } from '../../../../interfaces/works';
import view from '../../../../assets/global/reviewsIcon.svg';
import { TimeResume } from './components/TimeResume/TimeResume';
import { DescriptionResume } from './components/DescriptionResume/DescriptionResume';

interface IProps {
    data: IResume[];
    sectionName: TCategoryWorks;
}

export function ListWorkers(props: IProps) {
    const { data, sectionName } = props;

    return (
        <ul className={styles.list}>
            {data.map((item, _) => {
                return (
                    <li className={styles.itemList}>
                        <Link className={styles.itemBody} to={`${DETAILS_WORKER_PATH}/${item.id}/${`${item.title.replace(/\//g, " ")}`}/${sectionName}`}>
                            <div className={styles.wrapper}>
                                <div className={styles.bodyLogo}>
                                    <img src={item.user.avatar ? `${PATH_TO_STORE}${item.user.avatar}` : defaultAvatar} alt='logo' />
                                </div>
                                <DescriptionResume title={item.title} description={item.description} />
                                <div className={styles.bodyImage}>
                                    <img src={view} alt="" />
                                    <p>{item.views || 0}</p>
                                </div>
                                <TimeResume time={item.created_at} />
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}