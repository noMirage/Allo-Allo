
import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { POST_CONFIRM_EMAIL } from '../../../../configs/configs';
import { utilServer } from '../../../../utils/js/utilServer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  valueEmail: string;
  handleChangeVarificationEmail: () => void;
}

export function VerificationEmail(props: IProps) {
  const { valueEmail, handleChangeVarificationEmail } = props;
  const navigate = useNavigate();

  const [value, setValue] = useState<string>("");

  const handleChangeInputValue = (value: string) => {
    setValue(value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = await utilServer(POST_CONFIRM_EMAIL, 'post', { email: valueEmail, code: value });
    if (data && typeof data === 'object' && 'success' in data) {
      navigate('/');
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <p className={`${gStyles.textBig} ${styles.text}`}>Код відправлений на ваш Email <span>{valueEmail}</span></p>
          <label className={`${gStyles.textBig} ${styles.codeText}`} id='verificationEmail'>Код з Email</label>
          <input id='verificationEmail' onChange={(event) => handleChangeInputValue(event.target.value)} value={value} type="text" placeholder='Код' className={`${styles.input} ${gStyles.textBig}`} />
          <div className={styles.bodyButton}>
            <button type='button' className={`${gStyles.textBig} ${styles.buttonReturn}`} onClick={handleChangeVarificationEmail}>Назад</button>
            <button className={`${gStyles.textBig} ${styles.button}`}>Продовжити</button>
          </div>
        </form>
      </div>
    </div>
  );
}