import styles from "./styles.module.scss";
import gStyles from "../../../../../../styles/styles.module.scss";
import { ErrorMessage, Form, FormikErrors, } from "formik";
import { Link } from "react-router-dom";
import pStyles from '../../../../styles.module.scss';
import { IUkraineLocation } from "../../../../../../interfaces/UkraineLocations";
import "simplebar-react/dist/simplebar.min.css";
import "./simpleBarCustom.scss";
import { ModifiedInput } from "./components/ModifiedInput/ModifiedInput";
import { SeletOption } from "./components/ModifiedInput/SeletOption/SeletOption";

interface IProps {
    routeToBack: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    location: string
    UkraineLocations: IUkraineLocation[];
    errors: FormikErrors<{
        location: string;
    }>;
    submitForm: (() => Promise<void>) & (() => Promise<any>);
}

export function FormStepSecond(props: IProps) {
    const { routeToBack, setLocation, UkraineLocations, location, errors, submitForm } = props;

    return (
        <>
            <div>
                <div className={`${pStyles.bodyForm} ${styles.body}`}>
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть важе місце проживання для того щоб пришвидшити пошук</p>
                    <Form className={styles.formContainer}>
                        <div className={styles.container}>
                            <ModifiedInput location={location} setLocation={setLocation} errors={errors} />
                            <ErrorMessage className={gStyles.warningMessage} name="location" component="div" />
                            <SeletOption UkraineLocations={UkraineLocations} setLocation={setLocation} location={location} />
                        </div>
                    </Form>
                </div>
                <div className={styles.containerButtons}>
                    <Link className={`${gStyles.textBig}`} to={routeToBack}>Назад</Link>
                    <button type='button' onClick={submitForm} className={`${gStyles.textBig}`}>Далі</button>
                </div>
            </div>
        </>
    );
}
