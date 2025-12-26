import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import Select from '../../../../components/ui/select/Select';
import { Link } from 'react-router-dom';
import { CREATE_RESUME, PROFILE_PATH } from '../../../../routs/routs';
import pStyles from '../../styles.module.scss';
import { TUserDataWResume } from '../../types/types';
import { TCategoryWorks } from '../../../../interfaces/works';

const OPTIONS = [
    "сантехніка",
    "зварювання",
    "електрика",
    "перевізник",
    "збирання меблів"
];

interface IProps {
    pathToGo: string;
    setData: React.Dispatch<React.SetStateAction<TUserDataWResume>>;
}

export function CreateStepZero(props: IProps) {
    const { pathToGo, setData } = props;

    function handleSelect(value: string | TCategoryWorks) {
        setData((prevState) => {
            const newState = { ...prevState };
            newState.category = value as TCategoryWorks;
            return newState;
        })
    }

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.container}>
                <div className={`${styles.body}`}>
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть категорію в якій ви хочете створити резюме</p>
                    <Select handleSelect={handleSelect} options={OPTIONS} firstOption={0} />
                </div>
                <div className={pStyles.containerButtons}>
                    <Link className={`${gStyles.textBig}`} to={PROFILE_PATH}>
                        Назад
                    </Link>
                    <Link
                        className={`${gStyles.textBig}`}
                        to={`${CREATE_RESUME}${pathToGo}`}
                    >
                        Далі
                    </Link>
                </div>
            </div>
        </div>
    );
}