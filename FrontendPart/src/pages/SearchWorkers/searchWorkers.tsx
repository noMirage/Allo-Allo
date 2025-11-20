import { useParams } from "react-router-dom"
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/AppRedux";
import { getWorkers } from "../../servers/searchWorkers";
import Pagination from "../../components/ui/pagination";
import { IBaseinfoWorkers } from "../../interfaces/works";
import { ListWorkers } from "./components/ListWorkers/ListWorkers";
import { filterPagination } from "../../utils/js/filterPagination";
import { RootState } from "../../store/store";

export function SearchWorkers() {
    const { nameWork } = useParams();

    const [currentValue, setCurrentValue] = useState<number>(1);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getWorkers());
    }, []);

    const selectorWorker = (state: RootState) => state.searchWorkers.data;

    const workers: IBaseinfoWorkers[] | void = useAppSelector(filterPagination<IBaseinfoWorkers[]>(currentValue, 12, selectorWorker));

    const countWorkers = useAppSelector((state) => state.searchWorkers.data);

    if (nameWork && workers) {
        return (
            <section className={styles.wrapper}>
                <div className={gStyles.container}>
                    <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>{nameWork}</h2>
                    <ListWorkers data={workers} sectionName={nameWork} />
                    <Pagination setCurrentValue={setCurrentValue} countPagination={Math.ceil(countWorkers.length / 12)} currentNumber={currentValue} className={styles.pagination} />
                </div>
            </section>
        );
    } return <></>;
}