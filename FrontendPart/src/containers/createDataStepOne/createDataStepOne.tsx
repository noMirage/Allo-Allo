import { FormData } from './components/FormData/FormData';
import styles from './styles.module.scss';

interface IProps<T> {
    continuePath: string;
    returnPath: string;
    setData: React.Dispatch<React.SetStateAction<T>>;
    title: string;
    parentPath: string;
}

export function CreateDataStepOne<T extends { title: string, description: string }>(props: IProps<T>) {
    const { setData, continuePath, returnPath, title, parentPath } = props;

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.container}>
                <FormData<T> setData={setData} parentPath={parentPath} title={title} returnPath={returnPath} continuePath={continuePath} />
            </div>
        </div>
    );
}