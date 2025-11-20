import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/AppRedux";
import Pagination from "../../components/ui/pagination";
import { ListVacancies } from "./components/ListVacancies/ListWorkers";
import { getVacanciesServer } from "../../servers/vacancies";
import { filterPagination } from "../../utils/js/filterPagination";
import { RootState } from "../../store/store";
import { IVacancies } from "../../interfaces/vacancies";

export function Vacancies() {
    const [currentValue, setCurrentValue] = useState<number>(1);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getVacanciesServer());
    }, []);

    const selectorVacancies = (state: RootState) => state.getVacanciesReducer.data;

    const currentVacancies: IVacancies[] | void = useAppSelector(filterPagination(currentValue, 12, selectorVacancies));

    const countVacancies = useAppSelector((state) => state.getVacanciesReducer.data);

    if (currentVacancies) {
        return (
            <section className={styles.wrapper}>
                <div className={gStyles.container}>
                    <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>Вакансії</h2>
                    <p className={`${styles.allVacancies} ${gStyles.textLarge}`}>{countVacancies.length} вакансій</p>
                    <ListVacancies data={currentVacancies} />
                    <Pagination setCurrentValue={setCurrentValue} countPagination={Math.ceil(countVacancies.length / 12)} currentNumber={currentValue} className={styles.pagination} />
                </div>
            </section>
        );
    } return <></>;
}