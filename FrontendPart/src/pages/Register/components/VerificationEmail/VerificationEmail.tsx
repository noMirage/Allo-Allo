
import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { POST_CONFIRM_EMAIL } from '../../../../configs/configs';
import { utilServer } from '../../../../utils/js/utilServer';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateBaseField } from '../../../../utils/js/validates';

interface IProps {
  valueEmail: string;
  handleChangeVarificationEmail: () => void;
}

export function VerificationEmail(props: IProps) {
  const { valueEmail, handleChangeVarificationEmail } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <div className={styles.form}>
        <Formik
          initialValues={{ code: '' }}
          onSubmit={async (values) => {
            const data = await utilServer(POST_CONFIRM_EMAIL, 'post', { email: valueEmail, code: values.code });
            if (data && typeof data === 'object' && 'success' in data) {
              navigate('/');
            }
          }}
        >
          {({
          }) => (
            <Form>
              <p className={`${gStyles.textBig} ${styles.text}`}>Код відправлений на ваш Email <span>{valueEmail}</span></p>
              <Field placeholder='Код' className={`${styles.input} ${gStyles.textBig}`} type="text" name="code" validate={validateBaseField} />
              <ErrorMessage name="code" component="div" />
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