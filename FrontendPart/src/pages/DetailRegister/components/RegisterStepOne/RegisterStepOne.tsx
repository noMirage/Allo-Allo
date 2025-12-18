import styles from './styles.module.scss';
import { Formik } from 'formik';
import { IUserInfo } from '../../types/types';
import { FormStepOne } from './components/FormStepOne/FormStepOne';

interface IProps {
    routeToGo: string;
    routeItSelf: string;
    setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>
}

export function RegisterStepOne(props: IProps) {
    const { routeToGo, setUserInfo, routeItSelf } = props;
    return (
        <div className={`${styles.wrapper}`}>
            <Formik
                initialValues={{ fullName: '', phone: '' }}
                onSubmit={(values) => {
                    setUserInfo((prevState) => {
                        const newState = { ...prevState };
                        newState.fullName = values.fullName
                        newState.phone = values.phone;
                        return newState;
                    });
                }}
            >
                {({ errors, values, submitForm
                }) => (
                    <FormStepOne
                        submitForm={submitForm}
                        errors={errors}
                        routeToGo={routeToGo}
                        values={values}
                        routeItSelf={routeItSelf}
                    />
                )}
            </Formik>
        </div>
    );
}