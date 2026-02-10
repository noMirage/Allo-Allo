import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ControllButtons } from './componenets/ControllButtons/ControllButtons';
import { DescriptionField } from '../../../../components/ui/DescriptionField/descriptionField';
import { validateBaseField } from '../../../../utils/js/validates';

interface IProps<T> {
    returnPath: string;
    continuePath: string;
    parentPath: string;
    title: string;
    setData: React.Dispatch<React.SetStateAction<T>>;
}

export function FormData<T extends { title: string, description: string }>(props: IProps<T>) {
    const { setData, continuePath, parentPath, returnPath, title } = props;

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
                            <p className={`${gStyles.textExtraLarge} ${styles.title}`}>{title}</p>
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
                        <ControllButtons submitForm={submitForm} parentPath={parentPath} values={values} continuePath={continuePath} returnPath={returnPath} errors={errors} />
                    </>
                )
            }}
        </Formik>
    );
}