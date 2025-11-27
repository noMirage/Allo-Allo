import logo from '../../assets/Header/logo.svg';
import styles from './styles.module.scss';

export function Register() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
      </div>
    </div>
  );
}