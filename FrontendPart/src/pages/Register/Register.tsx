import logo from '../../assets/Header/logo.svg';
import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import iconWork from '../../assets/global/iconWork.svg';
import { ContainerRegister } from './components/ContainerRegister/ContainerRegister';

export function Register() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <h1 className={`${gStyles.textExtraLarge} ${styles.title}`}>Вхід або реєстрація шукача</h1>
        <p className={`${gStyles.textBig} ${styles.text}`}>Увійдіть, щоб керувати розміщенням вашого резюме, відгукуватися на вакансії та отримувати пропозиції від роботодавців.</p>
        <ContainerRegister/>
        <div className={styles.bodyExtraFunction}>
          <div><img src={iconWork} alt="" /></div>
          <Link to={'/'} className={`${styles.buttonRedirect} ${gStyles.textBig}`}>Увійти як роботодавець</Link>
        </div>
      </div>
    </div>
  );
}