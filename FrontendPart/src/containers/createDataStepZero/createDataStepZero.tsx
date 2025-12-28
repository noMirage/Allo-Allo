import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import { TCategoryWorks } from '../../interfaces/works';
import Select from '../../components/ui/select/Select';

const OPTIONS = [
    "сантехніка",
    "зварювання",
    "електрика",
    "перевізник",
    "збирання меблів"
];

interface IProps<T> {
    setData: React.Dispatch<React.SetStateAction<T>>;
    returnPath: string;
    continuePath: string;
    parentPath: string;
    title: string;
}

export function CreateDataStepZero<T extends { category: TCategoryWorks }>(props: IProps<T>) {
    const { setData, returnPath, continuePath, parentPath, title } = props;

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
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`}>{title}</p>
                    <Select handleSelect={handleSelect} options={OPTIONS} firstOption={0} />
                </div>
                <div className={styles.containerButtons}>
                    <Link className={`${gStyles.textBig}`} to={returnPath}>
                        Назад
                    </Link>
                    <Link
                        className={`${gStyles.textBig}`}
                        to={`${parentPath}${continuePath}`}
                    >
                        Далі
                    </Link>
                </div>
            </div>
        </div>
    );
}