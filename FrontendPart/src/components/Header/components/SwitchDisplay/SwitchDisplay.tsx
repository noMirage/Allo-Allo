import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import avatarDefault from '../../../../assets/global/profileIcon.svg';
import { Link } from "react-router-dom";
import email from '../../../../assets/global/emailBlack.svg';
import { PROFILE_PATH, REGISTER_PATH } from "../../../../routs/routs";
import { IUser } from "../../../../interfaces/user";
import { hasKeys } from "../../../../utils/js/checkTypes";
import { PATH_TO_STORE } from "../../../../configs/configs";

interface IProps {
    user: IUser | {};
}

export function SwitchDisplay(props: IProps) {

    const { user } = props;

    if (hasKeys<IUser>(user) && user.id) {
        return (
            <li className={styles.profile}>
                <p className={`${gStyles.textLarge} ${styles.fullName}`}>{user.full_name}</p>
                <Link to={PROFILE_PATH} className={`${styles.containerAvatar}`}><img src={user.avatar ? `${PATH_TO_STORE}${user.avatar}` : avatarDefault} alt="" /></Link>
            </li>
        )
    } else {
        return (
            <>
                <li className={styles.logIn}>
                    <Link to={REGISTER_PATH} className={`${gStyles.textExtraBig}`}><img src={email} /> Зареєструватися / Увійти</Link>
                </li>
                <li className={`${styles.logIn} ${styles.logInAdaptive}`}>
                    <Link to={REGISTER_PATH} className={`${gStyles.textLarge}`}><img src={email} />Увійти</Link>
                </li>
            </>
        );
    }
}
