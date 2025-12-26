import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { validateBaseField } from '../../../../../../utils/js/validates';
import { ControllButtons } from './componenets/ControllButtons/ControllButtons';
import { TUserDataWResume } from '../../../../types/types';
import { useState } from 'react';
import { DescriptionField } from '../../../../../../components/ui/DescriptionField/descriptionField';

interface IProps {
    ahead: string;
    comeBack: string;
    setData: React.Dispatch<React.SetStateAction<TUserDataWResume>>;
}

export function FormResume(props: IProps) {
    const { setData, ahead, comeBack } = props;

    return (
        <Formik
            initialValues={{ title: '', description: '' }}
            onSubmit={(values) => {
                setData((prevState) => {
                    const newState = { ...prevState };
                    newState.title = values.title;
                    newState.description = values.description;
                    return newState;
                });
            }}
        >
            {({ errors, values, submitForm
            }) => {
                return (
                    <>
                        <div className={`${styles.body}`}>
                            <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть Заголовок та опис нашого резюме</p>
                            <Form className={styles.formContainer}>
                                <Field
                                    className={`${styles.input} ${gStyles.textExtraBig} ${errors.title && gStyles.inputWrong
                                        }`}
                                    placeholder="Заголовок"
                                    type="text"
                                    name="title"
                                    validate={validateBaseField}
                                />
                                <ErrorMessage
                                    className={gStyles.warningMessage}
                                    name="title"
                                    component="div"
                                />
                                <DescriptionField error={errors.description} />
                                <ErrorMessage
                                    className={gStyles.warningMessage}
                                    name="description"
                                    component="div"
                                />
                            </Form>
                        </div>
                        <ControllButtons submitForm={submitForm} values={values} ahead={ahead} comeBack={comeBack} errors={errors} />
                    </>
                )
            }}
        </Formik>
    );
}