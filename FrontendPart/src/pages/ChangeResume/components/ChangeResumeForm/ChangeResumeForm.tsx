import { useState } from "react";
import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { IUser, TResume } from "../../../../interfaces/user";
import logo from '../../../../assets/Header/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH, PROFILE_PATH } from "../../../../routs/routs";
import { Formik } from "formik";
import { TUserDataWResumeWithoutCategory } from "./types/types";
import { TPreviews } from "../../../../interfaces/global";
import { utilServer } from "../../../../utils/js/utilServer";
import { hasKeys } from "../../../../utils/js/checkTypes";
import { UPDATE_RESUME } from "../../../../configs/configs";
import { useAppDispatch } from "../../../../hooks/AppRedux";
import { update } from "../../../../servers/user";
import { FormBaseField } from "../../../../components/ui/FormBaseField/FormBaseField";
import { ContainerButtons } from "../../../../components/ui/ContainerButtons/ContainerButtons";

interface IProps {
    resume: TResume;
}

export function ChangeResumeForm(props: IProps) {

    const { resume } = props;

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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

    const [previews, setPreviews] = useState<TPreviews[] | TPreviews>(objectPreviews);

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

                            formData.append('description', String(values.description));
                            formData.append('title', String(values.title));
                            formData.append('category_id', String(resume.category.id));
                            if (Array.isArray(previews)) {
                                previews
                                    .filter(img => !img.file && img.url)
                                    .forEach(img => formData.append('existing_images[]', img.url!));

                                previews
                                    .filter((img): img is { url: string; file: File } => img.file instanceof File)
                                    .forEach(img => formData.append('images[]', img.file));
                            }

                            const dataServer = await utilServer(`${UPDATE_RESUME}${resume.id}`, 'post', formData, () => { }, false);

                            if (dataServer.success && hasKeys<IUser>(dataServer.data!)) {
                                dispatch(update(dataServer.data));
                                navigate(PROFILE_PATH);
                            }
                        }}
                    >
                        {({
                            errors, submitForm
                        }) => (
                            <div>
                                <FormBaseField<TUserDataWResumeWithoutCategory>
                                    title="Редагування резюме: "
                                    description={data.description as string}
                                    setPreviews={setPreviews}
                                    previews={previews}
                                    setData={setData}
                                    errors={errors}
                                    category={resume.category.name}
                                    images={resume.images}
                                />
                                <ContainerButtons submitForm={submitForm} />
                            </div>
                        )}
                    </Formik>
                </div>
            </div >
        </div >
    );
}