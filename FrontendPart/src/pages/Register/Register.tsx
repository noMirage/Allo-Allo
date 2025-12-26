import logo from '../../assets/Header/logo.svg';
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import iconWork from '../../assets/global/iconWork.svg';
import { ContainerRegister } from './components/ContainerRegister/ContainerRegister';
import { useEffect, useState } from 'react';
import { TUserRole } from '../../interfaces/user';


export function Register() {

  const [loginAsA, setLoginAsA] = useState<TUserRole>("jobSeeker");

  useEffect(() => {
    sessionStorage.setItem('userRole', loginAsA);
  }, [loginAsA]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <h1 className={`${gStyles.textExtraLarge} ${styles.title}`}>Вхід або реєстрація шукача</h1>
        <p className={`${gStyles.textBig} ${styles.text}`}>Увійдіть, щоб керувати розміщенням вашого резюме, відгукуватися на вакансії та отримувати пропозиції від роботодавців.</p>
        <ContainerRegister />
        <div className={styles.bodyExtraFunction}>
          <div><img src={iconWork} alt="" /></div>
          {loginAsA === "jobSeeker" ? <button onClick={() => setLoginAsA("employer")} className={`${styles.buttonRedirect} ${gStyles.textBig}`}>Увійти як роботодавець</button>
            : <button onClick={() => setLoginAsA("jobSeeker")} className={`${styles.buttonRedirect} ${gStyles.textBig}`}>Увійти як шукач роботи</button>
          }
        </div>
      </div>
    </div>
  );
}