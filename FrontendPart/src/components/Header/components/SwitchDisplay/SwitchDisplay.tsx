import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import defaultAvatar from '../../../../assets/global/avatar.jpg';
import { Link } from "react-router-dom";
import email from '../../../../assets/global/emailBlack.svg';
import { useAppSelector } from "../../../../hooks/AppRedux";
import { PROFILE_PATH, REGISTER_PATH } from "../../../../routs/routs";
import { IUser } from "../../../../interfaces/user";
import { hasKeys } from "../../../../utils/js/checkTypes";
import { PATH_TO_AVATAR } from "../../../../configs/configs";

export function SwitchDisplay() {
    const user: IUser | {} = useAppSelector((state) => state.user.data);

    if (hasKeys<IUser>(user)) {
        return (
            <li className={styles.profile}>
                <p className={`${gStyles.textLarge} ${styles.fullName}`}>{user.full_name}</p>
                <Link to={PROFILE_PATH} className={`${styles.containerAvatar}`}><img src={user.avatar ? `${PATH_TO_AVATAR}${user.avatar}` : defaultAvatar} alt="" /></Link>
            </li>
        )
    } else {
        return (
            <li className={styles.collab}>
                <Link to={REGISTER_PATH} className={`${gStyles.textExtraBig}`}><img src={email} /> Зареєструватися / Увійти</Link>
            </li>
        );
    }
}
