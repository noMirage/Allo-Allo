import { useParams } from "react-router-dom"
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { useState } from "react";
import { useResume } from "../../hooks/useResume";
import { IResume } from "../../interfaces/resume";
import { GET_RESUME } from "../../configs/configs";
import { TCategoryWorks } from "../../interfaces/works";
import { ListWorkers } from "./components/ListWorkers/ListWorkers";
import Pagination from "../../components/ui/pagination";

export function SearchWorkers() {
    const { nameWork } = useParams();

    const [currentValue, setCurrentValue] = useState<number>(1);

    const [data] = useResume<IResume>(`${GET_RESUME}${nameWork as TCategoryWorks || 'зварювання'}`);

    if (Array.isArray(data) && data.length > 0 && nameWork) {
        return (
            <section className={styles.wrapper}>
                <div className={gStyles.container}>
                    <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>{nameWork}</h2>
                    <ListWorkers data={data} sectionName={nameWork as TCategoryWorks || 'зварювання'} />
                    <Pagination setCurrentValue={setCurrentValue} countPagination={Math.ceil(data.length / 12)} currentNumber={currentValue} className={styles.pagination} />
                </div>
            </section>
        );
    } return (
        <section className={styles.wrapper}>
            <div className={gStyles.container}>
                <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>{nameWork}</h2>
            </div>
        </section>
    );;
}