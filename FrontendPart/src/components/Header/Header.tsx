import styles from './styles.module.scss';
import logo from '../../assets/Header/logo.svg';
import phone from '../../assets/Header/phoneBlack.svg';
import email from '../../assets/Header/emailBlack.svg';
import gStyles from '../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../constants/navigationLinks';
import { ListItemWork } from './components/ListItemWork/ListItemWork';
import { useContext, useState } from 'react';
import { ShowLayout } from '../../contexts/layout';

export function Header() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setDisplayLayout = useContext(ShowLayout).handleChange;

    // console.log(setDisplayLayout);

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
                        <li className={styles.collab}>
                            <button onClick={setDisplayLayout} className={gStyles.textExtraBig}><img src={email} /> Зареєструватися</button>
                        </li>
                        <li>
                            <button className={`${styles.button} ${gStyles.textExtraBig}`} onClick={() => setIsOpen(!isOpen)}>Увійти</button>
                        </li>
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