import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/AppRedux";
import Pagination from "../../components/ui/pagination";
import { ListVacancies } from "./components/ListVacancies/ListWorkers";
import { filterPagination } from "../../utils/js/filterPagination";
import { RootState } from "../../store/store";
import { IVacancies, IVacancyPaginationList } from "../../interfaces/vacancies";
import { useVacancies } from '../../hooks/useVacancies';
import { GET_VACANCIES } from '../../configs/configs';
import { hasKeys } from '../../utils/js/checkTypes';

export function Vacancies() {
    const [currentValue, setCurrentValue] = useState<number>(1);

    const [data] = useVacancies<IVacancyPaginationList>(`${GET_VACANCIES}`);

    if (data && hasKeys<IVacancyPaginationList>(data)) {
        console.log(data);
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