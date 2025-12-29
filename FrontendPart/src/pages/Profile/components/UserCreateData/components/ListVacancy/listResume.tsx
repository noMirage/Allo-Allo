import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import pStyles from '../../../../styles.module.scss';
import { Link } from 'react-router-dom';
import { CHANGE_VACANCY, CREATE_VACANCY, DETAILS_VACANCIES_PATH } from '../../../../../../routs/routs';
import { ListData } from '../ListData/ListData';
import { IVacancies } from '../../../../../../interfaces/vacancies';
import { DELETE_VACANCY } from '../../../../../../configs/configs';

interface IProps {
    vacancy: IVacancies[]
}

export function ListVacancy(props: IProps) {

    const { vacancy } = props;

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <p className={`${gStyles.textLarge} ${styles.title}`}>Всі ваші створені вакансії</p>
                <Link to={CREATE_VACANCY} className={`${gStyles.textBig} ${styles.createButton} ${pStyles.button} ${styles.buttonCreate} `}>Створити вакансію</Link>
            </div>
            <ListData pathToShow={DETAILS_VACANCIES_PATH} pathChange={CHANGE_VACANCY} url={DELETE_VACANCY} data={vacancy} />
        </div>
    );

}