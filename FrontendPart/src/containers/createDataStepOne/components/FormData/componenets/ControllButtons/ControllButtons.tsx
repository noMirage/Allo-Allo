import gStyles from '../../../../../../styles/styles.module.scss';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { FormikErrors, FormikValues } from 'formik';


interface IProps {
    continuePath: string;
    returnPath: string;
    parentPath: string;
    errors: FormikErrors<{
        title: string;
        description: string;
    }>
    values: {
        title: string;
        description: string;
    }
    submitForm: (() => Promise<void>) & (() => Promise<any>);
}

export function ControllButtons(props: IProps) {
    const { continuePath, returnPath, parentPath, errors, values, submitForm } = props;

    function checkConditions(
        errors: FormikErrors<FormikValues>,
        values: FormikValues
    ) {
        if (
            errors.title ||
            errors.description ||
            values.title === "" ||
            values.description === ""
        ) {
            return false;
        }
        return true;
    }


    return (
        <div className={styles.containerButtons}>
            <Link className={`${gStyles.textBig}`} to={`${returnPath}`}>
                Назад
            </Link>
            {!checkConditions(errors, values) ? (
                <Link
                    onClick={submitForm}
                    className={`${gStyles.textBig}`}
                    to={``}
                >
                    Далі
                </Link>
            ) : (
                <Link
                    to={`${parentPath}${continuePath}`}
                    onClick={submitForm}
                    className={`${gStyles.textBig}`}
                >
                    Далі
                </Link>
            )}
        </div>
    );
}