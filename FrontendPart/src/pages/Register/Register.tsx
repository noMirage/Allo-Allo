import logo from '../../assets/Header/logo.svg';
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import google from '../../assets/global/google.svg';
import facebook from '../../assets/global/facebook.svg';
import apple from '../../assets/global/apple.svg';
import iconWork from '../../assets/global/iconWork.svg';
import { useState } from 'react';
import { utilServer } from '../../utils/js/utilServer';
import { POST_VERIFICATY_EMAIL } from '../../configs/configs';

export function Register() {
  const [value, setValue] = useState<string>("");

  const handleChangeInputValue = (value: string) => {

    setValue(value);
  };

  function handleSubmitPhone(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    utilServer(POST_VERIFICATY_EMAIL, 'post', { email: value });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <h1 className={`${gStyles.textExtraLarge} ${styles.title}`}>Вхід або реєстрація шукача</h1>
        <p className={`${gStyles.textBig} ${styles.text}`}>Увійдіть, щоб керувати розміщенням вашого резюме, відгукуватися на вакансії та отримувати пропозиції від роботодавців.</p>
        <div className={styles.body}>
          <div className={styles.form}>
            <form onSubmit={handleSubmitPhone}>
              <input onChange={(event) => handleChangeInputValue(event.target.value)} value={value} type="email" placeholder='Електроний адрес' className={`${styles.input} ${gStyles.textBig}`} />
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
          <div className={styles.bodyExtraFunction}>
            <div><img src={iconWork} alt="" /></div>
            <Link to={'/'} className={`${styles.buttonRedirect} ${gStyles.textBig}`}>Увійти як роботодавець</Link>
          </div>
        </div>
      </div>
    </div>
  );
}