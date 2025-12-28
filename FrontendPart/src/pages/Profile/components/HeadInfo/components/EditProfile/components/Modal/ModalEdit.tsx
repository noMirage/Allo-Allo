import gStyles from "../../../../../../../../styles/styles.module.scss";
import styles from "./styles.module.scss";
import pStyles from "../../../../../../styles.module.scss";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { validateBaseField } from "../../../../../../../../utils/js/validates";
import { SelectLocation } from "../../../../../../../../components/ui/selectLocation/selectLocation";
import { useState } from "react";
import { PhoneInputCustom } from "../../../../../../../../components/ui/PhoneInputCustom/PhoneInputCustom";
import { utilServer } from "../../../../../../../../utils/js/utilServer";
import { MAIN_EDIT_PROFILE } from "../../../../../../../../configs/configs";
import { update } from "../../../../../../../../servers/user";
import { useAppDispatch } from "../../../../../../../../hooks/AppRedux";
import { hasKeys } from "../../../../../../../../utils/js/checkTypes";
import { IUser, TUserRole } from "../../../../../../../../interfaces/user";

interface IProps {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    fullName: string;
    phone: string;
    role: TUserRole;
    currentLocation: string;
    organization: string;
}

export function ModalEdit(props: IProps) {
    const { setIsModal, fullName, phone, currentLocation, role, organization } = props;

    const [location, setLocation] = useState<string>(currentLocation);

    const dispatch = useAppDispatch();

    return (
        <>
            <div className={styles.body}>
                <div onClick={() => setIsModal(false)} className={styles.close}></div>
                <h2 className={`${gStyles.textExtraLarge} ${styles.title}`}>
                    Редагування профіля
                </h2>
                <Formik
                    initialValues={{
                        fullName: fullName,
                        phone: phone,
                        location: currentLocation,
                        organization: organization,
                    }}
                    onSubmit={async (values) => {
                        const formData = new FormData();
                        formData.append("fullName", values.fullName);
                        formData.append("phone", values.phone);
                        formData.append("role", role);
                        if (role === 'job_seeker') formData.append("location", location);
                        if (role === 'employer') formData.append("organization", values.organization);
                        const data = await utilServer(
                            MAIN_EDIT_PROFILE,
                            "patch",
                            formData,
                            () => { },
                            true
                        );
                        if (data.success && hasKeys<IUser>(data.data!)) {
                            dispatch(update(data.data));
                        }
                    }}
                >
                    {({ errors }) => (
                        <Form>
                            <Field
                                className={`${styles.input} ${gStyles.textExtraBig} ${errors.fullName && gStyles.inputWrong
                                    }`}
                                placeholder="Ім'я фамілія"
                                type="text"
                                name="fullName"
                                validate={validateBaseField}
                            />
                            <ErrorMessage
                                className={gStyles.warningMessage}
                                name="fullName"
                                component="div"
                            />
                            <PhoneInputCustom errors={errors} className={styles.inputPhone} />
                            {role === "job_seeker" && (
                                <SelectLocation
                                    placeholder="Локація"
                                    errors={errors}
                                    location={location}
                                    setLocation={setLocation}
                                />
                            )}
                            {role === "employer" && (
                                <Field
                                    className={`${styles.input} ${gStyles.textExtraBig} ${errors.fullName && gStyles.inputWrong
                                        }`}
                                    placeholder="Назва організації/компанії"
                                    type="text"
                                    name="organization"
                                />
                            )}
                            <button
                                className={`${pStyles.button} ${styles.button} ${gStyles.textBig}`}
                            >
                                Зберігти зміни
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
