import { useParams } from "react-router-dom"
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks/AppRedux";
import { filterById } from "../../servers/filterById";
import { getVacanciesServer } from "../../servers/vacancies";
import { useEffect } from "react";
import { ReactComponent as Arrow } from '../../assets/global/singleArrow.svg';
import { Link } from "react-router-dom";
import { VACANCIES_PATH } from "../../routs/routs";

export function DetailsVacancies() {
    const { id } = useParams();

    // const dispatch = useAppDispatch();

    // let data = useAppSelector(filterById(Number(id)));

    // useEffect(() => {
    //     if (!data.length) {
    //         dispatch(getVacanciesServer());
    //     }
    // }, [id]);


    // if (Array.isArray(data) && data && "title" && id && data.length) {
    //     const vacancy = data[0];
    //     return (
    //         <section className={styles.wrapper}>
    //             <div className={`${gStyles.container} ${styles.container}`}>
    //                 <div className={styles.return}>
    //                     <Arrow />
    //                     <Link to={`${VACANCIES_PATH}`} className={gStyles.textBig}>Назад</Link>
    //                 </div>
    //                 <div className={styles.extraWrapper}>
    //                     <div className={styles.body}>
    //                         <h2 className={`${styles.title} ${gStyles.textLarge}`}>{vacancy.title}</h2>
    //                         <p className={`${styles.price} ${gStyles.textBig}`}>{vacancy.price}</p>
    //                         <div className={styles.date}>
    //                             <p className={gStyles.textBig}>{vacancy.date}</p>
    //                             <p className={gStyles.textBig}>{vacancy.organisation}</p>
    //                         </div>
    //                         <p className={`${gStyles.textBig} ${styles.located}`}>{vacancy.located}</p>
    //                         <ul className={styles.list}>
    //                             {vacancy.advantages.map((item, _) => (
    //                                 <li className={gStyles.textExtraMedium} key={item}>{item}</li>
    //                             ))}
    //                         </ul>
    //                         <p className={gStyles.textBig}>{vacancy.description}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>
    //     );
    // }
    return <></>;
}