import styles from './styles.module.scss';
import gStyles from '../../../../../../../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import pStyles from '../../../../../../styles.module.scss';
import { FormikErrors, FormikValues } from 'formik';
import { CREATE_RESUME } from '../../../../../../../../routs/routs';


interface IProps {
    ahead: string;
    comeBack: string;
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
    const { ahead, comeBack, errors, values, submitForm } = props;

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
        <div className={pStyles.containerButtons}>
            <Link className={`${gStyles.textBig}`} to={`${comeBack}`}>
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
                    to={`${CREATE_RESUME}${ahead}`}
                    onClick={submitForm}
                    className={`${gStyles.textBig}`}
                >
                    Далі
                </Link>
            )}
        </div>
    );
}