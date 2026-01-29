import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { useState } from "react";
import Pagination from "../../components/ui/pagination";
import { ListVacancies } from "./components/ListVacancies/ListWorkers";
import { IVacancyPaginationList } from "../../interfaces/vacancies";
import { useVacancy } from '../../hooks/useVacancy';
import { GET_VACANCIES } from '../../configs/configs';
import { hasKeys } from '../../utils/js/checkTypes';

export function Vacancies() {
    const [currentValue, setCurrentValue] = useState<number>(1);

    const [data] = useVacancy<IVacancyPaginationList>(`${GET_VACANCIES}`);

    if (data && hasKeys<IVacancyPaginationList>(data)) {
        return (
            <section className={styles.wrapper}>
                <div className={gStyles.container}>
                    <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>Вакансії</h2>
                    <p className={`${styles.allVacancies} ${gStyles.textLarge}`}>{data.total} вакансій</p>
                    <ListVacancies data={data.vacancies} />
                    <Pagination setCurrentValue={setCurrentValue} countPagination={Math.ceil(data.total / 12)} currentNumber={currentValue} className={styles.pagination} />
                </div>
            </section>
        );
    } return <></>;
}