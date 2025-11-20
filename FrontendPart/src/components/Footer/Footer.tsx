import styles from './styles.module.scss';
import gStyles from '../../styles/styles.module.scss';
import logo from '../../assets/Header/logo.svg';
import { ReactComponent as Email } from '../../assets/Header/emailWhite.svg';
import { ReactComponent as Phone } from '../../assets/Header/phoneWhite.svg';
import { Link } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../constants/navigationLinks';
import { HOME_PATH } from '../../routs/routs';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.container} ${styles.containerFooter}`}>
                <div className={styles.body}>
                    <Link to={HOME_PATH} className={styles.logo}>
                        <img src={logo} alt="" />
                    </Link>
                    <address className={`${styles.phone} ${gStyles.textBig}`}><Phone className={styles.icon} /> + 380 954 944 9333</address>
                    <address className={`${styles.email} ${gStyles.textBig}`}><Email className={styles.icon} /> andriivanchov@gmail.com</address>
                </div>
                <ul className={styles.list}>
                    {NAVIGATION_LINKS.map((item, _) => (
                        <li className={`${styles.item} ${gStyles.textBig}`}>
                            <Link to={item.to}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}