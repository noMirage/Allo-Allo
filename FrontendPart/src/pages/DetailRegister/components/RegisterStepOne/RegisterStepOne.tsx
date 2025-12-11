import styles from './styles.module.scss';
import pStyles from '../../styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { validateBaseField, validatePhone } from '../../../../utils/js/validates';
import { Link } from 'react-router-dom';

interface IProps {
    routeToGo: string;
}

export function RegisterStepOne(props: IProps) {
    const { routeToGo } = props;

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${pStyles.bodyForm} ${styles.body}`}>
                <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть ваше ім'я та прізвище, та номер телефона</p>
                <Formik
                    initialValues={{ fullName: '', phone: "" }}
                    onSubmit={(values) => {

                    }}
                >
                    {({
                    }) => (
                        <Form className={styles.formContainer}>
                            <Field className={`${styles.input} ${gStyles.textExtraBig}`} placeholder="Ім'я фамілія" type="text" name="fullName" validate={validateBaseField} />
                            <ErrorMessage name="fullName" component="div" />
                            <Field className={`${styles.input} ${gStyles.textExtraBig}`} placeholder='Номер телефона' type="tel" name="phone" validate={validatePhone} />
                            <ErrorMessage name="phone" component="div" />
                        </Form>
                    )}
                </Formik>
            </div>
            <div className={styles.containerButtons}>
                <Link className={`${gStyles.textBig}`} to='/'>Назад</Link>
                <Link className={`${gStyles.textBig}`} to={routeToGo}>Далі</Link>
            </div>
        </div>
    );
}