
import { Formik } from 'formik';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { POST_CONFIRM_EMAIL } from '../../../../configs/configs';
import { DETAIL_REGISTER, HOME_PATH } from '../../../../routs/routs';
import { useNavigate } from 'react-router-dom';
import { utilServer } from '../../../../utils/js/utilServer';
import { FormCode } from './components/FormCode/FormCode';
import { ServerMessage } from '../../../../constants/message';
import { getUser } from '../../../../servers/user';
import { useAppDispatch } from '../../../../hooks/AppRedux';

interface IProps {
  valueEmail: string;
  handleChangeVarificationEmail: () => void;
  handleSubmit: (email: string, isSwitch: boolean) => void;
}

export function VerificationEmail(props: IProps) {
  const { valueEmail, handleChangeVarificationEmail, handleSubmit } = props;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [messageError, setMessageError] = useState<{ message: string, id: string }>({ message: '', id: "" });

  const [timer, setTimer] = useState<number>(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className={styles.body}>
      <div className={styles.form}>
        <Formik
          initialValues={{ code: '' }}
          onSubmit={async (values) => {
            const data = await utilServer(POST_CONFIRM_EMAIL, 'post', { email: valueEmail, code: values.code });
            if (data.success) {
              if (data.message === ServerMessage.USER_EXISTS) {
                navigate(HOME_PATH);
                dispatch(getUser());
              } else if (data.message === ServerMessage.EMAIL_CONFIRMED) {
                navigate(`${DETAIL_REGISTER}`);
                sessionStorage.setItem("email", JSON.stringify(valueEmail));
              }
            } else {
              setMessageError({ message: String(data.error), id: String((Math.random() * 34)) });
            }
          }}
        >
          {({ errors
          }) => (
            <FormCode
              handleChangeVarificationEmail={handleChangeVarificationEmail}
              handleSubmit={handleSubmit}
              valueEmail={valueEmail}
              timer={timer}
              setTimer={setTimer}
              errors={errors}
              messageError={messageError}
            />
          )}
        </Formik>
      </div>
    </div>
  );
}