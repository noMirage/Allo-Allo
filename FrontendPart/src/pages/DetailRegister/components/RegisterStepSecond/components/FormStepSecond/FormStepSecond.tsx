import styles from "./styles.module.scss";
import gStyles from "../../../../../../styles/styles.module.scss";
import { FormikErrors, } from "formik";
import { Link } from "react-router-dom";
import pStyles from '../../../../styles.module.scss';
import { SelectLocation } from "../../../../../../components/ui/selectLocation/selectLocation";

interface IProps {
    routeToBack: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    location: string
    errors: FormikErrors<{
        location: string;
    }>;
    submitForm: (() => Promise<void>) & (() => Promise<any>);
}

export function FormStepSecond(props: IProps) {
    const { routeToBack, setLocation, location, errors, submitForm } = props;

    return (
        <>
            <div>
                <div className={`${pStyles.bodyForm} ${styles.body}`}>
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть важе місце проживання для того щоб пришвидшити пошук</p>
                    <SelectLocation errors={errors} location={location} setLocation={setLocation} />
                </div>
                <div className={styles.containerButtons}>
                    <Link className={`${gStyles.textBig}`} to={routeToBack}>Назад</Link>
                    <button type='button' onClick={submitForm} className={`${gStyles.textBig}`}>Далі</button>
                </div>
            </div>
        </>
    );
}
