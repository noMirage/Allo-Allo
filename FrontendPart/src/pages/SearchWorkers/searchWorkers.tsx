import { useParams } from "react-router-dom"
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { useState } from "react";
import { useResume } from "../../hooks/useResume";
import { IResumePagination } from "../../interfaces/resume";
import { GET_RESUME } from "../../configs/configs";
import { TCategoryWorks } from "../../interfaces/works";
import { ListWorkers } from "./components/ListWorkers/ListWorkers";
import Pagination from "../../components/ui/pagination";
import { hasKeys } from "../../utils/js/checkTypes";

export function SearchWorkers() {
    const { nameWork } = useParams();

    const [prePage, setPrePage] = useState(1);

    const [currentValue, setCurrentValue] = useState<number>(1);

    const [data] = useResume<IResumePagination>(`${GET_RESUME}${nameWork}?page=${currentValue}&per_page=${prePage}`);

    if (data && hasKeys<IResumePagination>(data) && nameWork) {
        return (
            <section className={styles.wrapper}>
                <div className={gStyles.container}>
                    <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>{nameWork}</h2>
                    <p className={`${styles.allResume} ${gStyles.textLarge}`}>{data.total} Резюме</p>
                    <ListWorkers data={data.resumes} sectionName={nameWork as TCategoryWorks || 'зварювання'} />
                    <Pagination setCurrentValue={setCurrentValue} countPagination={Math.ceil(data.total / data.per_page)} currentNumber={currentValue} className={styles.pagination} />
                </div>
            </section>
        );
    } return (
        <section className={styles.wrapper}>
            <div className={gStyles.container}>
                <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>{nameWork}</h2>
            </div>
        </section>
    );
}