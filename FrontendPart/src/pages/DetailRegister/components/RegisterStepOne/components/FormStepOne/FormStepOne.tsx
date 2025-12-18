import styles from "./styles.module.scss";
import gStyles from "../../../../../../styles/styles.module.scss";
import { ErrorMessage, Field, Form, FormikErrors, FormikValues } from "formik";
import { Link } from "react-router-dom";
import { DETAIL_REGISTER, REGISTER_PATH } from "../../../../../../routs/routs";
import {
    validateBaseField,
    validatePhone,
} from "../../../../../../utils/js/validates";
import pStyles from '../../../../styles.module.scss';

interface IProps {
    submitForm: (() => Promise<void>) & (() => Promise<any>);
    errors: FormikErrors<{
        fullName: string;
        phone: string;
    }>;
    routeToGo: string;
    values: {
        fullName: string;
        phone: string;
    };
    routeItSelf: string;
}

export function FormStepOne(props: IProps) {
    const { submitForm, errors, routeToGo, values, routeItSelf } = props;

    function checkConditions(
        errors: FormikErrors<FormikValues>,
        values: FormikValues
    ) {
        if (
            errors.fullName ||
            errors.phone ||
            values.fullName === "" ||
            values.phone === ""
        ) {
            return false;
        }
        return true;
    }

    return (
        <>
            <div className={`${pStyles.bodyForm} ${styles.body}`}>
                <p className={`${gStyles.textExtraLarge} ${styles.title}`}>
                    Вкажіть ваше ім'я та прізвище, та номер телефона
                </p>
                <Form className={styles.formContainer}>
                    <Field
                        className={`${styles.input} ${gStyles.textExtraBig} ${errors.fullName && gStyles.inputWrong
                            }`}
                        placeholder="Ім'я фамілія"
                        type="text"
                        name="fullName"
                        validate={validateBaseField}
                    />
                    <ErrorMessage
                        className={gStyles.warningMessage}
                        name="fullName"
                        component="div"
                    />

                    <Field
                        className={`${styles.input} ${gStyles.textExtraBig} ${errors.phone && gStyles.inputWrong
                            }`}
                        placeholder="Номер телефона"
                        type="tel"
                        name="phone"
                        validate={validatePhone}
                    />
                    <ErrorMessage
                        className={gStyles.warningMessage}
                        name="phone"
                        component="div"
                    />
                </Form>
            </div>
            <div className={styles.containerButtons}>
                <Link className={`${gStyles.textBig}`} to={`${REGISTER_PATH}`}>
                    Назад
                </Link>
                {!checkConditions(errors, values) ? (
                    <Link
                        onClick={submitForm}
                        className={`${gStyles.textBig}`}
                        to={`${DETAIL_REGISTER}${routeItSelf}`}
                    >
                        Далі
                    </Link>
                ) : (
                    <Link
                        to={routeToGo}
                        onClick={submitForm}
                        className={`${gStyles.textBig}`}
                    >
                        Далі
                    </Link>
                )}
            </div>
        </>
    );
}
