import styles from './styles.module.scss';
import pStyles from '../../styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { validateBaseField } from '../../../../utils/js/validates';
import { Link } from 'react-router-dom';
import { IUkraineLocation } from '../../../../interfaces/UkraineLocations';
import { useEffect, useState } from 'react';

interface IProps {
    routeToBack: string;
    UkraineLocations: IUkraineLocation[];
}

export function RegisterStepSecond(props: IProps) {
    const { routeToBack, UkraineLocations } = props;

    const [location, setLocation] = useState<string>("");
    const [debouncedLocation, setDebouncedLocation] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedLocation(location), 200);
        return () => clearTimeout(handler);
    }, [location]);

    const locations = UkraineLocations.filter(c => c.object_name.toLowerCase().startsWith(debouncedLocation.toLowerCase()));

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${pStyles.bodyForm} ${styles.body}`}>
                <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть важе місце проживання для того щоб пришвидшити пошук</p>
                <Formik
                    initialValues={{ location: '' }}
                    onSubmit={(values) => {

                    }}
                >
                    {({
                    }) => (
                        <Form className={styles.formContainer}>
                            <div>
                                <Field name="location" validate={validateBaseField}>
                                    {({ field, form }: any) => {
                                        setLocation(field.value);
                                        return <input placeholder="Локація" type="text" className={`${styles.input} ${gStyles.textExtraBig}`} {...field} />;
                                    }}
                                </Field>
                            </div>
                            <ErrorMessage name="location" component="div" />
                        </Form>
                    )}
                </Formik>
            </div>
            <div className={styles.containerButtons}>
                <Link className={`${gStyles.textBig}`} to={routeToBack}>Назад</Link>
                <Link className={`${gStyles.textBig}`} to='/'>Далі</Link>
            </div>
        </div>
    );
}