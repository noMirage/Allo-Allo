import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import pStyles from '../../styles.module.scss';
import { SelectLocation } from '../../../../components/ui/selectLocation/selectLocation';
import { useState } from 'react';
import { Formik } from 'formik';
import { FormStepSecond } from './components/FormStepSecond/FormStepSecond';
import { TUserDataVacancy } from '../../types/types';
import { TCategoryWorks } from '../../../../interfaces/works';
import { TPreviews } from '../../../../interfaces/global';
import { utilServer } from '../../../../utils/js/utilServer';
import { hasKeys } from '../../../../utils/js/checkTypes';
import { IUserEmployer } from '../../../../interfaces/user';
import { useAppDispatch } from '../../../../hooks/AppRedux';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PATH } from '../../../../routs/routs';
import { update } from '../../../../servers/user';

interface IProps {
    returnPath: string;
    title: string;
    description: string;
    category: TCategoryWorks;
    setData: React.Dispatch<React.SetStateAction<TUserDataVacancy>>
}

export function CreateStepSecond(props: IProps) {
    const { returnPath, title, description, category, setData } = props;

    const [location, setLocation] = useState<string>("");

    const [previews, setPreviews] = useState<TPreviews[]>([]);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.container}>
                <Formik
                    initialValues={{ location: '', price: "", }}
                    onSubmit={async (values) => {
                        const formData = new FormData();
                        formData.append('category', category);
                        formData.append('description', description);
                        formData.append('title', title);
                        formData.append('location', location);
                        formData.append('price', values.price);

                        previews.filter((img): img is { url: string; file: File } => img.file instanceof File).forEach(img => formData.append('images[]', img.file));

                        const data = await utilServer("", 'post', formData, () => { }, false);

                        if (data.success && hasKeys<IUserEmployer>(data.data!)) {
                            dispatch(update(data.data));
                            navigate(PROFILE_PATH);
                        }
                    }}
                >
                    {({ submitForm, errors }) => (
                        <FormStepSecond
                            returnPath={returnPath}
                            setLocation={setLocation}
                            location={location}
                            errors={errors}
                            submitForm={submitForm}
                            setData={setData}
                            setPreviews={setPreviews}
                            previews={previews}
                        />
                    )}
                </Formik>
            </div>
        </div >
    );
}