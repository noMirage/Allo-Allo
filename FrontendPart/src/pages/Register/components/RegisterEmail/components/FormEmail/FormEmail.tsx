
import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateEmail } from '../../../../../../utils/js/validates';

interface IProps {
  handleSubmit: (email: string) => void;
}

export function FormEmail(props: IProps) {
  const { handleSubmit } = props;

  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          handleSubmit(values.email);
        }}
      >
        {({
          errors
        }) => (
          <Form>
            <Field className={`${styles.input} ${gStyles.textBig} ${errors.email && gStyles.inputWrong}`} placeholder='Електроний адрес' type="email" name="email" validate={validateEmail} />
            <ErrorMessage name="email" component="div" />
            <div className={styles.bodyButton}>
              <button className={`${gStyles.textBig} ${styles.button}`}>Увійти</button>
            </div>
            <p className={`${styles.condition} ${gStyles.textMedium}`}>Продовжуючи, ви приймаєте <Link to='/'>правила сервісу</Link> та <Link to='/'>політику конфіденційності</Link>.</p>
          </Form>
        )}
      </Formik>
    </div>
  );
}