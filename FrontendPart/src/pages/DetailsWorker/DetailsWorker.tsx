import { useParams, useSearchParams } from "react-router-dom"
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
import { useResume } from "../../hooks/useResume";
import { IResume } from "../../interfaces/resume";
import { GET_SELECTED_RESUME, POST_INCREMENT_VIEW } from "../../configs/configs";
import { hasKeys } from "../../utils/js/checkTypes";
import { utilServer } from "../../utils/js/utilServer";

export function DetailsWorker() {
    const { id, title, prevLocation } = useParams();

    const [data] = useResume<IResume>(`${GET_SELECTED_RESUME}${id || 0}`);

    useEffect(() => {
        utilServer(`${POST_INCREMENT_VIEW}${id}`, 'post');
    }, []);

    if (data && hasKeys<IResume>(data) && title) {
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
                        <Gallery dataGallery={data.images} />
                        <Contact location={data.user.location} fullName={data.user.full_name} phone={data.user.phone} published={data.created_at} category={title} />
                    </div>
                    <Description description={data.description} />
                </div>
            </section>
        );
    } return <></>;
}