import styles from './styles.module.scss';
import pStyles from '../../styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { validateBaseField } from '../../../../utils/js/validates';
import { Link } from 'react-router-dom';
import { IUkraineLocation } from '../../../../interfaces/UkraineLocations';
import { useEffect, useState } from 'react';
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./simpleBarCustom.scss";
import { IUserInfo } from '../../types/types';
import { utilServer } from '../../../../utils/js/utilServer';

interface IProps {
    routeToBack: string;
    UkraineLocations: IUkraineLocation[];
    userInfo: IUserInfo
}

export function RegisterStepSecond(props: IProps) {
    const { routeToBack, UkraineLocations, userInfo } = props;

    const [location, setLocation] = useState<string>("");
    const [debouncedLocation, setDebouncedLocation] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedLocation(location), 200);
        return () => clearTimeout(handler);
    }, [location]);

    const locations = UkraineLocations.filter((item, _) => {
        const valueInput = debouncedLocation.toLocaleLowerCase();
        const itemValueGategory = item.object_category.toLocaleLowerCase();
        const itemValueCommunity = item.community.toLocaleLowerCase();
        const itemValueName = item.object_name.toLocaleLowerCase();
        const itemValueRegion = item.region.toLocaleLowerCase();

        if (itemValueName.includes(valueInput) ||
            itemValueGategory.includes(valueInput) ||
            itemValueCommunity.includes(valueInput) ||
            itemValueRegion.includes(valueInput)
        ) {
            return item;
        }
    });

    function handleSelectLocation(category: string, name: string, region: string, community: string): void {
        setLocation(`${category} ${name} ${region} ${community}`);
    }


    return (
        <div className={`${styles.wrapper}`}>
            <Formik
                initialValues={{ location: '' }}
                onSubmit={(values) => {
                    console.log('12312312');
                    const formData = new FormData();
                    formData.append('fullName', userInfo.fullName);
                    formData.append('phone', userInfo.phone);
                    formData.append('email', userInfo.email || '');
                    formData.append('location', location);
                    utilServer('/', 'post', formData);
                }}
            >
                {({ submitForm, errors }) => (
                    <div>
                        <div className={`${pStyles.bodyForm} ${styles.body}`}>
                            <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть важе місце проживання для того щоб пришвидшити пошук</p>
                            <Form className={styles.formContainer}>
                                <div className={styles.container}>

                                    <Field name='location' validate={validateBaseField}>
                                        {({ field, form }: any) => {
                                            return <input onBlur={() => form.setFieldTouched("location", true)} onChange={(event) => {
                                                setLocation(event.target.value); form.setFieldValue('location', event.target.value); form.setFieldTouched('location', true);
                                            }} placeholder="Локація" type="text" className={`${styles.input} ${gStyles.textExtraBig} ${errors.location && gStyles.inputWrong}`} value={location} />;
                                        }}
                                    </Field>
                                    <ErrorMessage className={gStyles.warningMessage} name="location" component="div" />
                                    {debouncedLocation.length >= 2 && locations.length > 0 && <ul className={styles.list}>
                                        <SimpleBar className={styles.containerItem}>
                                            {locations.map((item, _) => (
                                                <li key={item.object_code} onClick={(event) => handleSelectLocation(item.object_category, item.object_name, item.region, item.community)}>
                                                    <h3>{item.object_category}</h3>
                                                    <h4>{item.object_name}</h4>
                                                    <h5>{item.region}</h5>
                                                    <h6>{item.community}</h6>
                                                </li>
                                            ))}
                                        </SimpleBar>
                                    </ul>}
                                </div>
                            </Form>
                        </div>
                        <div className={styles.containerButtons}>
                            <Link className={`${gStyles.textBig}`} to={routeToBack}>Назад</Link>
                            <button type='button' onClick={submitForm} className={`${gStyles.textBig}`}>Далі</button>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
}