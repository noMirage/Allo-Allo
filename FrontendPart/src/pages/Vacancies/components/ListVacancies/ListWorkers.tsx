import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import { DETAILS_VACANCIES_PATH } from '../../../../routs/routs';
import { IVacancies } from '../../../../interfaces/vacancies';
import { ReactComponent as HeartIcon } from '../../../../assets/global/heartIcon.svg';
import { ReactComponent as Reviews } from '../../../../assets/global/reviewsIcon.svg';

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
                        <div className={styles.body}><h2 className={`${styles.title} ${gStyles.textLarge}`}>{item.title}</h2>
                            <HeartIcon className={styles.icon} /> </div>
                        <p className={`${styles.price} ${gStyles.textBig}`}>{item.price}</p>
                        <p className={`${styles.organisation} ${gStyles.textBig}`}>{item.organisation} <span>{item.located}</span></p>
                        <div className={styles.wrapper}>
                            <p className={`${styles.date} ${gStyles.textBig}`}>{item.date}</p>
                            <p className={`${styles.viewes} ${gStyles.textBig}`}><Reviews className={styles.iconReviews} />{item.reviews}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}