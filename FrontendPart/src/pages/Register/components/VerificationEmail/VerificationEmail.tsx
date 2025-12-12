
import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { POST_CONFIRM_EMAIL } from '../../../../configs/configs';
import { utilServer } from '../../../../utils/js/utilServer';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateBaseField } from '../../../../utils/js/validates';
import { DETAIL_REGISTER } from '../../../../routs/routs';
import { useEffect, useState } from 'react';

interface IProps {
  valueEmail: string;
  handleChangeVarificationEmail: () => void;
  handleSubmit: (email: string, isSwitch: boolean) => void;
}

export function VerificationEmail(props: IProps) {
  const { valueEmail, handleChangeVarificationEmail, handleSubmit } = props;
  const navigate = useNavigate();
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
            if (data && typeof data === 'object' && 'success' in data) {
              navigate(`${DETAIL_REGISTER}/registerStepOne`);
              sessionStorage.setItem("email", JSON.stringify(valueEmail));
            }
          }}
        >
          {({ errors
          }) => (
            <Form>
              <p
                className={`${gStyles.textBig} ${styles.text}`}>Код відправлений на ваш Email <span>{valueEmail}</span></p>
              <Field placeholder='Код' className={`${styles.input} ${gStyles.textBig} ${errors.code && gStyles.inputWrong}`} type="text" name="code" validate={validateBaseField} />
              <ErrorMessage name="code" component="div" />
              <p onClick={() => { if (timer <= 0) { handleSubmit(valueEmail, false); setTimer(60) } }} className={`${gStyles.textBig} ${styles.sendAgainCode}`}>Відправити ще раз через {timer === 0 ? "" : timer}</p>
              <div className={styles.bodyButton}>
                <button type='button' className={`${gStyles.textBig} ${styles.buttonReturn}`} onClick={handleChangeVarificationEmail}>Назад</button>
                <button className={`${gStyles.textBig} ${styles.button}`}>Продовжити</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}