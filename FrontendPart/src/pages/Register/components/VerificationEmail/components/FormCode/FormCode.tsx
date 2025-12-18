
import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import { ErrorMessage, Field, Form, FormikErrors } from 'formik';
import { validateBaseField } from '../../../../../../utils/js/validates';

interface IProps {
  valueEmail: string;
  handleChangeVarificationEmail: () => void;
  handleSubmit: (email: string, isSwitch: boolean) => void;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  timer: number;
  errors: FormikErrors<{ code: string }>;
}

export function FormCode(props: IProps) {
  const { handleSubmit, handleChangeVarificationEmail, valueEmail, setTimer, timer, errors } = props;
  return (
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
  );
}