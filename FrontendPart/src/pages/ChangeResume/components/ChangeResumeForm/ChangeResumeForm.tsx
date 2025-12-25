import { useState } from "react";
import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { IUser, TResume } from "../../../../interfaces/user";
import logo from '../../../../assets/Header/logo.svg';
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../../../routs/routs";
import { Formik } from "formik";
import { TUserDataWResumeWithoutCategory } from "./types/types";
import { FormChangeResume } from "./components/FormChangeResume/FormChangeResume";
import { ContainerButtons } from "./components/ContainerButtons/ContainerButtons";
import { TPreviews } from "../../../../interfaces/global";
import { utilServer } from "../../../../utils/js/utilServer";
import { hasKeys } from "../../../../utils/js/checkTypes";

interface IProps {
    resume: TResume;
}

export function ChangeResumeForm(props: IProps) {

    const { resume } = props;

    const [data, setData] = useState<TUserDataWResumeWithoutCategory>({
        title: resume.title,
        description: resume.description,
        images: resume.images,
    });

    let objectPreviews: TPreviews[] = [];
    if (Array.isArray(data.images) && data.images.length > 0) {
        objectPreviews = data.images.map(item => ({
            url: item,
        }));
    }

    const [previews, setPreviews] = useState<TPreviews[]>(objectPreviews);

    return (
        <div className={styles.wrapper}>
            <div className={gStyles.container}>
                <Link to={HOME_PATH} className={styles.logo}>
                    <img src={logo} alt="" />
                </Link>
                <div className={styles.containerForm}>
                    <Formik
                        initialValues={{ title: data.title, description: data.description, images: data.images }}
                        onSubmit={async (values) => {
                            const formData = new FormData();
                            console.log(data);
                            formData.append('description', String(values.description));
                            formData.append('title', String(values.title));
                            if (data.images && data.images.length > 0) {
                                Array.from([data.images]).forEach((file) => {
                                    if (file instanceof File) {
                                        formData.append('images[]', file);
                                    }
                                });
                            }
                            // const dataServer = await utilServer(POST_ADD_RESUME, 'post', formData, () => { }, false);

                            if (data.success && hasKeys<IUser>(data.data!)) {
                                console.log('cool');
                                // dispatch(update(data.data));
                                // navigate(PROFILE_PATH);
                            }
                        }}
                    >
                        {({
                            errors, submitForm
                        }) => (
                            <div>
                                <FormChangeResume setPreviews={setPreviews} previews={previews} setData={setData} errors={errors} category={resume.category.name} images={resume.images} />
                                <ContainerButtons submitForm={submitForm}/>
                            </div>
                        )}
                    </Formik>
                </div>
            </div >
        </div >
    );
}