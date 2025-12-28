import { useState } from "react";
import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import { IUser } from "../../../../interfaces/user";
import logo from "../../../../assets/Header/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH, PROFILE_PATH } from "../../../../routs/routs";
import { Field, Formik } from "formik";
import { TPreviews } from "../../../../interfaces/global";
import { utilServer } from "../../../../utils/js/utilServer";
import { hasKeys } from "../../../../utils/js/checkTypes";
import { UPDATE_VACANCY } from "../../../../configs/configs";
import { useAppDispatch } from "../../../../hooks/AppRedux";
import { update } from "../../../../servers/user";
import { IVacancies } from "../../../../interfaces/vacancies";
import { IUserDataVacancyState } from "./types/types";
import { FormBaseField } from "../../../../components/ui/FormBaseField/FormBaseField";
import { ContainerButtons } from "../../../../components/ui/ContainerButtons/ContainerButtons";
import { SelectLocation } from "../../../../components/ui/selectLocation/selectLocation";

interface IProps {
    vacancies: IVacancies;
}

export function ChangeVacancyForm(props: IProps) {
    const { vacancies } = props;

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [data, setData] = useState<IUserDataVacancyState>({
        title: vacancies.title,
        description: vacancies.description,
        logo: vacancies.logo,
        salary: vacancies.salary,
        location: vacancies.location,
    });

    const [previews, setPreviews] = useState<TPreviews | TPreviews[]>({ url: vacancies.logo || "" });

    const [location, setLocation] = useState<string>(vacancies.location);

    return (
        <div className={styles.wrapper}>
            <div className={gStyles.container}>
                <Link to={HOME_PATH} className={styles.logo}>
                    <img src={logo} alt="" />
                </Link>
                <div className={styles.containerForm}>
                    <Formik
                        initialValues={{
                            title: data.title,
                            description: data.description,
                            logo: data.logo,
                            salary: data.salary,
                            location: data.location,
                        }}
                        onSubmit={async (values) => {
                            const formData = new FormData();
                            formData.append("description", String(values.description));
                            formData.append("title", String(values.title));
                            formData.append("salary", String(values.salary));
                            formData.append("location", String(location));
                            formData.append("category_id", String(vacancies.category.id));

                            if (!Array.isArray(previews) && previews.file) {
                                formData.append("logo", previews.file);
                            } else {
                                formData.append("logo", 'null');
                            }

                            const dataServer = await utilServer(
                                `${UPDATE_VACANCY}${vacancies.id}`,
                                "post",
                                formData,
                                () => { },
                                false
                            );

                            if (dataServer.success && hasKeys<IUser>(dataServer.data!)) {
                                dispatch(update(dataServer.data));
                                navigate(PROFILE_PATH);
                            }
                        }}
                    >
                        {({ errors, submitForm }) => (
                            <div>
                                <FormBaseField<IUserDataVacancyState>
                                    multipleMode={false}
                                    title="Редагування вакансії: "
                                    description={data.description as string}
                                    setPreviews={setPreviews}
                                    previews={previews}
                                    setData={setData}
                                    errors={errors}
                                    category={vacancies.category.name}
                                    images={[vacancies.logo || ""]}
                                    placeholder="Натисніть щоб завантажити логотип"
                                >
                                    <div className={styles.location}>
                                        <SelectLocation placeholder="Місце організації/компанії" errors={errors} location={location} setLocation={setLocation} />
                                    </div>
                                    <Field
                                        className={`${styles.input} ${gStyles.textExtraBig}`}
                                        placeholder="Зарпалата"
                                        type="text"
                                        name="salary"
                                    />
                                </FormBaseField>
                                <ContainerButtons submitForm={submitForm} />
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
