import styles from './styles.module.scss';
import logo from '../../assets/Header/logo.svg';
import phone from '../../assets/global/phoneBlack.svg';
import gStyles from '../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../constants/navigationLinks';
import { ListItemWork } from './components/ListItemWork/ListItemWork';
import { SwitchDisplay } from './components/SwitchDisplay/SwitchDisplay';

export function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={gStyles.container}>
                    <ul className={styles.headerTop}>
                        <li className={styles.logoBody}>
                            <Link to='/' className={styles.logo}>
                                <img src={logo} />
                            </Link>
                        </li>
                        <li className={styles.phone}>
                            <address className={gStyles.textLarge}>+ 380 954 944 9333</address>
                            <img src={phone} />
                        </li>
                        <SwitchDisplay />
                    </ul>
                </div>
                <div className={styles.bodyList}>
                    <ul className={`${styles.list} ${gStyles.container}`}>
                        {NAVIGATION_LINKS.map((item, _) => {
                            if (item.name === 'Послуги') {
                                return <ListItemWork key={item.name} lengthOfList={NAVIGATION_LINKS.length} name={item.name} icon={item.icon} to={item.to} />
                            } else {
                                return (
                                    <li style={{ flexBasis: 100 / NAVIGATION_LINKS.length + "%" }} className={`${styles.listName} ${gStyles.textLarge}`}>
                                        <Link
                                            className={`${gStyles.textLarge}`}
                                            key={item.name} to={item.to}
                                            style={{ flexBasis: (100 / NAVIGATION_LINKS.length) + '%' }}
                                        ><img className={styles.itemIcon} src={item.icon} />{item.name}</Link>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </header>
    );
}