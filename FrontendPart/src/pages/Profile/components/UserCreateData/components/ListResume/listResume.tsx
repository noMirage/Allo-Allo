import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import pStyles from '../../../../styles.module.scss';
import 'swiper/css';
import { TResume } from '../../../../../../interfaces/user';
import { Link } from 'react-router-dom';
import { CREATE_RESUME } from '../../../../../../routs/routs';
import { ListData } from '../ListData/ListData';
import { DELETE_RESUME } from '../../../../../../configs/configs';

interface IProps {
    resumes: TResume[]
}

export function ListResume(props: IProps) {

    const { resumes } = props;

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <p className={`${gStyles.textLarge} ${styles.title}`}>Всі ваші створені резюме</p>
                <Link to={CREATE_RESUME} className={`${gStyles.textBig} ${styles.createButton} ${pStyles.button} ${styles.buttonCreate} `}>Створити резюме</Link>
            </div>
            <ListData url={DELETE_RESUME} data={resumes} />
        </div>
    );

}