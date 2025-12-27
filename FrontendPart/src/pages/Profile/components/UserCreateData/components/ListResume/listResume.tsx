import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import pStyles from '../../../../styles.module.scss';
import resume from '../../../../../../assets/global/resume.svg';
import 'swiper/css';
import { IUser, TResume } from '../../../../../../interfaces/user';
import { Link } from 'react-router-dom';
import { CHANGE_RESUME, CREATE_RESUME, DETAILS_WORKER_PATH } from '../../../../../../routs/routs';
import { DELETE_RESUME } from '../../../../../../configs/configs';
import { utilServer } from '../../../../../../utils/js/utilServer';
import { useAppDispatch } from '../../../../../../hooks/AppRedux';
import { update } from '../../../../../../servers/user';
import { hasKeys } from '../../../../../../utils/js/checkTypes';
import { WORKS } from '../../../../../../constants/works';

interface IProps {
    resumes: TResume[]
}

export function ListResume(props: IProps) {

    const { resumes } = props;

    const dispatch = useAppDispatch();

    async function handleSubmit(id: number) {
        const data = await utilServer(`${DELETE_RESUME}${id}`, 'delete', {}, () => { }, true);
        if (data.success && hasKeys<IUser>(data.data!)) {
            dispatch(update(data.data));
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <p className={`${gStyles.textLarge} ${styles.title}`}>Всі ваші створені резюме</p>
                <Link to={CREATE_RESUME} className={`${gStyles.textBig} ${styles.createButton} ${pStyles.button} ${styles.buttonCreate} `}>Створити резюме</Link>
            </div>
            <ul className={styles.list}>
                {Array.isArray(resumes) && resumes.length > 0 && resumes.map((item, index) => {
                    const work = WORKS.find(
                        work => work.category === item.category.name
                    );
                    return (
                        <li className={styles.container}>
                            <Link className={styles.bodyItem} to={`${DETAILS_WORKER_PATH}/${item.id}/${item.title}/${item.category.name}`}>
                                <div className={styles.bodyImage}>
                                    <img src={work?.icon ? work.icon : resume} alt="" />
                                </div>
                                <div className={styles.bodyInfo}>
                                    <h2 className={gStyles.textLarge}>{item.category.name}</h2>
                                    <h3 className={gStyles.textLarge}>{item.title}</h3>
                                </div>
                            </Link>
                            <div className={styles.containerButtons}>
                                <Link to={`${CHANGE_RESUME}/${index}`} className={`${gStyles.textBig} ${styles.buttonChange}`}>Змінити</Link>
                                <button onClick={() => handleSubmit(item.id)} className={`${gStyles.textBig} ${styles.buttonRemove}`}>Видалити</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );

}