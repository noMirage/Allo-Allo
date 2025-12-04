
import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import google from '../../../../assets/global/google.svg';
import facebook from '../../../../assets/global/facebook.svg';
import apple from '../../../../assets/global/apple.svg';

interface IProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  valueEmail: string;
  handleChangeValue: (value: string) => void;
}

export function RegisterEmail(props: IProps) {
  const { handleSubmit, handleChangeValue, valueEmail } = props;

  return (
    <div className={styles.body}>
      <div className={styles.form}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input onChange={(event) => handleChangeValue(event.target.value)} value={valueEmail} type="email" placeholder='Електроний адрес' className={`${styles.input} ${gStyles.textBig}`} />
          <div className={styles.bodyButton}>
            <button className={`${gStyles.textBig} ${styles.button}`}>Увійти</button>
          </div>
          <p className={`${styles.condition} ${gStyles.textMedium}`}>Продовжуючи, ви приймаєте <Link to='/'>правила сервісу</Link> та <Link to='/'>політику конфіденційності</Link>.</p>
        </form>
      </div>
      <ul className={styles.list}>
        <li>
          <button>
            <img src={google} alt="" />
          </button>
        </li>
        <li>
          <button>
            <img src={facebook} alt="" />
          </button>
        </li>
        <li>
          <button>
            <img src={apple} alt="" />
          </button>
        </li>
      </ul>
    </div>
  );
}