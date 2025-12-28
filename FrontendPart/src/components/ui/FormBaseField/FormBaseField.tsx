import styles from './styles.module.scss';
import gStyles from '../../../styles/styles.module.scss';
import { ErrorMessage, Field, Form, FormikErrors } from "formik";
import { ListSelectedImages } from "./components/ListSelectedImages/ListSelectedImages";
import { TPreviews } from '../../../interfaces/global';
import { TCategoryWorks } from '../../../interfaces/works';
import { DescriptionField } from '../DescriptionField/descriptionField';
import { validateBaseField } from '../../../utils/js/validates';
import { ReactNode } from 'react';

interface IProps<T> {
    errors: FormikErrors<{
        title: string | string[] | FileList;
        description: string | string[] | FileList;
        images: string | string[] | FileList;
    }>
    images: string[];
    category: TCategoryWorks;
    setData: React.Dispatch<React.SetStateAction<T>>;
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews | TPreviews[]>>
    previews: TPreviews[] | TPreviews;
    description: string;
    title: string;
    multipleMode?: boolean;
    children?: ReactNode;
    placeholder?: string;
}

export function FormBaseField<T>(props: IProps<T>) {

    const { errors, previews, children = <></>, setPreviews, category, setData, description, title, multipleMode = true, placeholder = '' } = props;

    return (
        <div className={`${styles.form} ${styles.body}`}>
            <p className={`${gStyles.textExtraLarge} ${styles.title}`}>{title} {category}</p>
            <Form>
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
                <DescriptionField description={description} error={errors.description} />
                <ErrorMessage
                    className={gStyles.warningMessage}
                    name="description"
                    component="div"
                />
                <ListSelectedImages placeholder={placeholder} multipleMode={multipleMode} setData={setData} previews={previews} setPreviews={setPreviews} />
                {children}
            </Form>
        </div>
    );
}