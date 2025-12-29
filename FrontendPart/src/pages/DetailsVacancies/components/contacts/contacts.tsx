import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';

interface IProps {
    email: string;
    phone: string;
    fullName: string;
}

export function Contacts(props: IProps) {
    const { email, phone, fullName } = props;

    return (
        <div className={styles.wrapper}>
            <h3 className={`${gStyles.textBig} ${styles.fullName}`}>{fullName}</h3>
            <h3 className={`${gStyles.textBig} ${styles.phone}`}>+{phone}</h3>
            <h3 className={`${gStyles.textBig} ${styles.email}`}>{email}</h3>
        </div>
    );
}