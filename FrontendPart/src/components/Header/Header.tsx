import styles from './styles.module.scss';
import logo from '../../assets/Header/logo.svg';
import phone from '../../assets/global/phoneBlack.svg';
import gStyles from '../../styles/styles.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../constants/navigationLinks';
import { ListItemWork } from './components/ListItemWork/ListItemWork';
import { SwitchDisplay } from './components/SwitchDisplay/SwitchDisplay';
import { useEffect, useState } from 'react';
import { PROFILE_PATH, REGISTER_PATH } from '../../routs/routs';
import defaultAvatar from '../../assets/global/avatar.jpg';
import { PATH_TO_STORE } from '../../configs/configs';
import { useAppSelector } from '../../hooks/AppRedux';
import { IUser } from '../../interfaces/user';
import { hasKeys } from '../../utils/js/checkTypes';
import email from '../../assets/global/emailBlack.svg';

export function Header() {

    const user: IUser | {} = useAppSelector((state) => state.user.data);

    const [isBurger, setIsBurger] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        setIsBurger(false);
        document.body.style.overflow = 'auto';
    }, [location.pathname]);

    function handleTargetBurger() {
        setIsBurger(!isBurger);
        if (document.body.style.overflow === 'hidden') {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

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
                        <SwitchDisplay user={user} />
                        <div onClick={() => handleTargetBurger()} className={`${styles.burger} ${isBurger && styles.openBurger}`}>
                            <span></span>
                        </div>
                    </ul>
                </div>
                <div className={`${styles.bodyList} ${isBurger ? styles.openBodyList : ""}`}>
                    <ul className={`${styles.list} ${gStyles.container}`}>
                        {hasKeys<IUser>(user) && user.id ? <li className={`${styles.listName} ${styles.profile} ${gStyles.textLarge}`}><Link to={PROFILE_PATH}><img src={user.avatar ? `${PATH_TO_STORE}${user.avatar}` : defaultAvatar} /><p>Профіль</p></Link></li> :
                            <li className={`${styles.logIn}`}>
                                <Link to={REGISTER_PATH} className={`${gStyles.textLarge}`}><img src={email} />Увійти</Link>
                            </li>}
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