import { useParams } from "react-router-dom"
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { ReactComponent as Arrow } from '../../assets/global/singleArrow.svg';
import { IVacancyDetails } from "../../interfaces/vacancies";
import { useVacancy } from "../../hooks/useVacancy";
import { GET_VACANCY_BY_ID, PATH_TO_STORE } from "../../configs/configs";
import { Link } from "react-router-dom";
import { VACANCIES_PATH } from "../../routs/routs";
import { hasKeys } from "../../utils/js/checkTypes";
import { formatDate } from "../../utils/js/formatDate";
import { Contacts } from "./components/contacts/contacts";

export function DetailsVacancies() {
    const { id } = useParams();

    const [vacancy] = useVacancy<IVacancyDetails>(`${GET_VACANCY_BY_ID}${id || 0}`);

    if (vacancy && hasKeys<IVacancyDetails>(vacancy)) {
        return (
            <section className={styles.wrapper}>
                <div className={`${gStyles.container} ${styles.container}`}>
                    <div className={styles.return}>
                        <Arrow />
                        <Link to={`${VACANCIES_PATH}`} className={gStyles.textBig}>Назад</Link>
                    </div>
                    <div className={styles.extraWrapper}>
                        <div className={styles.body}>
                            <div>
                                <div className={styles.containerHeader}>
                                    <h2 className={`${styles.title} ${gStyles.textExtraLarge}`}>{vacancy.title}</h2>
                                    <img className={styles.logo} src={`${PATH_TO_STORE}${vacancy.logo}`} />
                                </div>
                                <p className={`${styles.salary} ${gStyles.textBig}`}>{vacancy.salary}</p>
                            </div>
                            <div className={styles.date}>
                                <p className={gStyles.textBig}>{formatDate(vacancy.created_at)}</p>
                                <p className={gStyles.textBig}>{vacancy.employer.organization}</p>
                            </div>
                            <p className={`${gStyles.textBig} ${styles.located}`}>{vacancy.location}</p>
                            <div className={`${gStyles.textBig} ${styles.description}`} dangerouslySetInnerHTML={{ __html: vacancy.description }} />
                            <Contacts email={vacancy.employer.email} phone={vacancy.employer.phone} fullName={vacancy.employer.full_name} />
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
        return <></>;
    }
}