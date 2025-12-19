import styles from "./styles.module.scss";
import gStyles from "../../../../../../styles/styles.module.scss";
import { ErrorMessage, Form, FormikErrors, } from "formik";
import { Link } from "react-router-dom";
import pStyles from '../../../../styles.module.scss';
import "simplebar-react/dist/simplebar.min.css";
import "./simpleBarCustom.scss";
import { ModifiedInput } from "./components/ModifiedInput/ModifiedInput";
import { SeletOption } from "./components/SeletOption/SeletOption";
import { useState } from "react";

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

    const [isShowSelect, setIsShowSelect] = useState<boolean>(true);

    return (
        <>
            <div>
                <div className={`${pStyles.bodyForm} ${styles.body}`}>
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть важе місце проживання для того щоб пришвидшити пошук</p>
                    <Form className={styles.formContainer}>
                        <div className={styles.container}>
                            <ModifiedInput setIsShowSelect={setIsShowSelect} location={location} setLocation={setLocation} errors={errors} />
                            <ErrorMessage className={gStyles.warningMessage} name="location" component="div" />
                            <SeletOption isShowSelect={isShowSelect} setIsShowSelect={setIsShowSelect} setLocation={setLocation} location={location} />
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
