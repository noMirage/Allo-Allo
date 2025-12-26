import styles from './styles.module.scss';
import { Formik, } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IUserInfo } from '../../types/types';
import { utilServer } from '../../../../utils/js/utilServer';
import { POST_USER_REGISTER } from '../../../../configs/configs';
import { HOME_PATH } from '../../../../routs/routs';
import { FormStepSecond } from './components/FormStepSecond/FormStepSecond';
interface IProps {
    routeToBack: string;
    userInfo: IUserInfo
}

export function RegisterStepSecond(props: IProps) {
    const { routeToBack, userInfo } = props;

    const [location, setLocation] = useState<string>("");

    const navigation = useNavigate();

    return (
        <div className={`${styles.wrapper}`}>
            <Formik
                initialValues={{ location: '' }}
                onSubmit={async (values) => {
                    const formData = new FormData();
                    formData.append('fullName', userInfo.fullName);
                    formData.append('phone', userInfo.phone);
                    formData.append('email', userInfo.email || '');
                    formData.append('location', location);
                    formData.append('role', sessionStorage.getItem('userRole') || '');
                    const data = await utilServer(POST_USER_REGISTER, 'post', formData);
                    if (data.success) {
                        navigation(HOME_PATH);
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
                    />
                )}
            </Formik>
        </div >
    );
}