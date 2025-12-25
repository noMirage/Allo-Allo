import { useState } from "react";
import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import pStyles from '../../styles.module.scss';
import { ErrorMessage, Field, Form, FormikErrors } from "formik";
import { validateBaseField } from "../../../../../../utils/js/validates";
import { TCategoryWorks } from "../../../../../../interfaces/works";
import { TUserDataWResumeWithoutCategory } from "../../types/types";
import { ListSelectedImages } from "./components/ListSelectedImages/ListSelectedImages";
import { TPreviews } from "../../../../../../interfaces/global";

interface IProps {
    errors: FormikErrors<{
        title: string | string[] | FileList;
        description: string | string[] | FileList;
        images: string | string[] | FileList;
    }>
    images: string[];
    category: TCategoryWorks;
    setData: React.Dispatch<React.SetStateAction<TUserDataWResumeWithoutCategory>>;
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[]>>;
    previews: TPreviews[];
}

export function FormChangeResume(props: IProps) {

    const { errors, previews, setPreviews, category, setData } = props;

    return (
        <div className={`${styles.form} ${styles.body}`}>
            <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Редагування резюме: {category}</p>
            <Form>
                <Field
                    className={`${pStyles.input} ${gStyles.textExtraBig} ${errors.title && gStyles.inputWrong
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
                <Field
                    className={`${pStyles.input} ${gStyles.textExtraBig} ${styles.textarea} ${errors.description && gStyles.inputWrong
                        }`}
                    placeholder="Опис"
                    type="text"
                    name="description"
                    validate={validateBaseField}
                    component="textarea"
                />
                <ErrorMessage
                    className={gStyles.warningMessage}
                    name="description"
                    component="div"
                />
                <ListSelectedImages setData={setData} previews={previews} setPreviews={setPreviews} />
            </Form>
        </div>
    );
}