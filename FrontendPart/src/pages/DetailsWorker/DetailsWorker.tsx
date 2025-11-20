import { useParams } from "react-router-dom"
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks/AppRedux";
import { useEffect } from "react";
import { getDetailsWorker } from "../../servers/detailsWorker";
import { Gallery } from "./components/Gallery/Gallery";
import { Contact } from "./components/Contact/Contact";
import { Description } from "./components/Description/Description";
import { Link } from "react-router-dom";
import { ORDER_WORK_PATH } from "../../routs/routs";
import { WORKS } from "../../constants/works";
import { ReactComponent as Arrow } from '../../assets/global/singleArrow.svg';
import { Navigate } from "../../components/ui/navigate/navigate";

export function DetailsWorker() {
    const { id, title, prevLocation } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getDetailsWorker(Number(id)));
        }
    }, [id]);

    const data = useAppSelector((state) => state.detailsWorkerReducer.data);

    if (data && "gallery" in data && Array.isArray(data.gallery) && title && prevLocation) {
        return (
            <section className={styles.wrapper}>
                <div className={`${gStyles.container}`}>
                    <Navigate className={styles.list} navigateList={WORKS}>
                        <li>
                            <Arrow />
                            <Link to={`${ORDER_WORK_PATH}/${prevLocation}`} className={gStyles.textBig}>Назад</Link>
                        </li>
                    </Navigate>
                    <div className={styles.body}>
                        <Gallery dataGallery={data.gallery} />
                        <Contact date={data.date} title={title} />
                    </div>
                    <Description description={data.description} />
                </div>
            </section>
        );
    } return <></>;
}