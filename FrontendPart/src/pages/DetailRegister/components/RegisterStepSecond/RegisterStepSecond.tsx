import styles from './styles.module.scss';
import { Formik, } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IUserInfo } from '../../types/types';
import { utilServer } from '../../../../utils/js/utilServer';
import { POST_USER_REGISTER } from '../../../../configs/configs';
import { HOME_PATH } from '../../../../routs/routs';
import { FormStepSecond } from './components/FormStepSecond/FormStepSecond';
import { hasKeys } from '../../../../utils/js/checkTypes';
import { IUser, TUserRole } from '../../../../interfaces/user';
interface IProps {
    routeToBack: string;
    userInfo: IUserInfo
}

export function RegisterStepSecond(props: IProps) {
    const { routeToBack, userInfo } = props;

    const [location, setLocation] = useState<string>("");

    const storeRole = sessionStorage.getItem('userRole');

    const userRole: TUserRole = (storeRole === 'job_seeker' || storeRole === 'employer') ? storeRole : 'job_seeker';

    const navigation = useNavigate();

    return (
        <div className={`${styles.wrapper}`}>
            <Formik
                initialValues={{ location: '', organization: "", }}
                onSubmit={async (values) => {
                    const formData = new FormData();
                    formData.append('fullName', userInfo.fullName);
                    formData.append('phone', userInfo.phone);
                    formData.append('email', userInfo.email || '');
                    formData.append('role', userRole);
                    if (userRole === 'job_seeker') formData.append('location', location);
                    if (userRole === 'employer') formData.append('organization', values.organization);
                    const data = await utilServer(POST_USER_REGISTER, 'post', formData);
                    if (data.success && hasKeys<IUser>(data.data!)) {
                        navigation(HOME_PATH);
                        window.location.reload();
                    }

                }}
            >
                {({ submitForm, errors }) => (
                    <FormStepSecond
                        routeToBack={routeToBack}
                        setLocation={setLocation}
                        location={location}
                        errors={errors}
                        submitForm={submitForm}
                        userRole={userRole}
                    />
                )}
            </Formik>
        </div >
    );
}