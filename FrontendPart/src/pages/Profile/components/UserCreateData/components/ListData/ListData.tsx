import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import resume from '../../../../../../assets/global/resume.svg';
import 'swiper/css';
import { IUser, TResume, TUserRole } from '../../../../../../interfaces/user';
import { Link } from 'react-router-dom';
import { DETAILS_VACANCIES_PATH } from '../../../../../../routs/routs';
import { utilServer } from '../../../../../../utils/js/utilServer';
import { useAppDispatch } from '../../../../../../hooks/AppRedux';
import { update } from '../../../../../../servers/user';
import { hasKeys } from '../../../../../../utils/js/checkTypes';
import { WORKS } from '../../../../../../constants/works';
import { IVacancies } from '../../../../../../interfaces/vacancies';

interface IProps {
    data: TResume[] | IVacancies[];
    url: string;
    pathChange: string;
    pathToShow: string;
}

export function ListData(props: IProps) {

    const { data, url, pathChange, pathToShow } = props;

    const dispatch = useAppDispatch();

    async function handleSubmit(id: number) {
        const data = await utilServer(`${url}${id}`, 'delete', {}, () => { }, true);
        if (data.success && hasKeys<IUser>(data.data!)) {
            dispatch(update(data.data));
        }
    }

    return (

        <ul className={styles.list}>
            {Array.isArray(data) && data.length > 0 && data.map((item, index) => {
                const work = WORKS.find(
                    work => work.category === item.category.name
                );
                return (
                    <li className={styles.container}>
                        <Link className={styles.bodyItem} to={`${pathToShow}/${item.id}/${item.title}/${item.category.name}`}>
                            <div className={styles.bodyImage}>
                                <img src={work?.icon ? work.icon : resume} alt="" />
                            </div>
                            <div className={styles.bodyInfo}>
                                <h2 className={gStyles.textLarge}>{item.category.name}</h2>
                                <h3 className={gStyles.textLarge}>{item.title}</h3>
                            </div>
                        </Link>
                        <div className={styles.containerButtons}>
                            <Link to={`${pathChange}/${index}`} className={`${gStyles.textBig} ${styles.buttonChange}`}>Змінити</Link>
                            <button onClick={() => handleSubmit(item.id)} className={`${gStyles.textBig} ${styles.buttonRemove}`}>Видалити</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    );

}