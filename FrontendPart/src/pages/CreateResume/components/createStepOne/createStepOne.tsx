import styles from './styles.module.scss';
import { TUserDataWResume } from '../../types/types';
import { FormResume } from './components/FormResume/FormResume';

interface IProps {
    ahead: string;
    comeBack: string;
    setData: React.Dispatch<React.SetStateAction<TUserDataWResume>>;
}

export function CreateStepOne(props: IProps) {
    const { setData, ahead, comeBack } = props;

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.container}>
                <FormResume setData={setData} comeBack={comeBack} ahead={ahead} />
            </div>
        </div>
    );
}