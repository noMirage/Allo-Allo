import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import { DETAILS_VACANCIES_PATH } from '../../../../routs/routs';
import { IVacancies } from '../../../../interfaces/vacancies';
import { ReactComponent as Reviews } from '../../../../assets/global/reviewsIcon.svg';
import { formatDate } from '../../../../utils/js/formatDate';
import { limitSymbol } from '../../../../utils/js/limitSymbol';
import { PATH_TO_STORE } from '../../../../configs/configs';

interface IProps {
    data: IVacancies[];
}

export function ListVacancies(props: IProps) {
    const { data } = props;

    return (
        <ul className={styles.list}>
            {data.map((item, _) => (
                <li>
                    <Link className={styles.itemBody} to={`${DETAILS_VACANCIES_PATH}/${item.id}`}>
                        <div className={styles.container}>
                            <div className={styles.wrapperInfo}><img src={`${PATH_TO_STORE}${item.logo}`} alt="" />
                                <div className={styles.containerInfo}>
                                    <div className={styles.body}><h2 className={`${styles.title} ${gStyles.textLarge}`}>{item.title}</h2>
                                        <p className={`${styles.viewes} ${gStyles.textBig}`}><Reviews className={styles.iconReviews} />{item.views || 0}</p>
                                    </div>
                                    <p className={`${styles.salary} ${gStyles.textBig}`}>{item.salary}</p>
                                    <div className={styles.mainInfo}>
                                        <p className={`${styles.organisation} ${gStyles.textBig}`}>{item.organization || ""}</p>
                                        <span className={`${styles.location} ${gStyles.textBig}`}>{limitSymbol(item.location, 40)}</span>
                                    </div>
                                </div>
                                <time className={`${gStyles.textMedium} ${styles.date}`}>{formatDate(item.created_at)}</time>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}