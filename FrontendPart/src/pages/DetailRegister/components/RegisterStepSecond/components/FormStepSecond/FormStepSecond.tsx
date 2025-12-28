import styles from "./styles.module.scss";
import gStyles from "../../../../../../styles/styles.module.scss";
import { ErrorMessage, Field, FormikErrors, } from "formik";
import { Link } from "react-router-dom";
import pStyles from '../../../../styles.module.scss';
import { SelectLocation } from "../../../../../../components/ui/selectLocation/selectLocation";
import { TUserRole } from "../../../../../../interfaces/user";
import { validateBaseField } from "../../../../../../utils/js/validates";

interface IProps {
    routeToBack: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    location: string
    errors: FormikErrors<{
        location: string;
        organization: string
    }>;
    submitForm: (() => Promise<void>) & (() => Promise<any>);
    userRole: TUserRole;
}

export function FormStepSecond(props: IProps) {
    const { routeToBack, setLocation, location, errors, submitForm, userRole } = props;

    return (
        <>
            <div>
                <div className={`${pStyles.bodyForm} ${styles.body}`}>
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть важе місце проживання для того щоб пришвидшити пошук</p>
                    {userRole === 'job_seeker' && <SelectLocation errors={errors} location={location} setLocation={setLocation} placeholder="Локація" />}
                    {userRole === 'employer' && <div>
                        <Field className={`${styles.input} ${gStyles.textBig} ${errors.organization && gStyles.inputWrong}`} placeholder='Назва організації' type="text" name="organization" validate={validateBaseField} />
                        <ErrorMessage name="organization" component="div" />
                    </div>}
                </div>
                <div className={styles.containerButtons}>
                    <Link className={`${gStyles.textBig}`} to={routeToBack}>Назад</Link>
                    <button type='button' onClick={submitForm} className={`${gStyles.textBig}`}>Далі</button>
                </div>
            </div>
        </>
    );
}
