import gStyles from '../../../../styles/styles.module.scss';
import styles from './styles.module.scss';
import pStyles from '../../styles.module.scss';
import avatar from '../../../../assets/global/avatar.jpg';
import { Formik } from 'formik';

interface IProps {
    fullName: string;
    phone: string;
    email: string;
    location: string;
}

export function HeadInfo(props: IProps) {

    const { fullName, phone, email, location } = props;

    return (<div className={styles.bodyHeadInfo}>
        <div className={styles.containerHeadInfo}>
            <p className={`${gStyles.textLarge}`}>Основна інформація</p>
            <button className={`${gStyles.textBig} ${pStyles.button}`}>Редагувати профіль</button>
        </div>
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={`${styles.bodyAvatar}`}>
                    <img src={avatar} alt="" />
                </div>
                <div className={styles.mainInfo}>
                    <h2 className={`${gStyles.textExtraBig} ${styles.fullName}`}>{fullName}</h2>
                    <address className={`${gStyles.textExtraBig} ${styles.importantInfo} ${styles.phone}`}>+{phone}</address>
                    <address className={`${gStyles.textExtraBig} ${styles.importantInfo} ${styles.email}`}>{email}</address>
                    <address className={`${gStyles.textExtraBig} ${styles.importantInfo} ${styles.location}`}>{location}</address>
                </div>
            </div>
            <Formik
                initialValues={{ code: '' }}
                onSubmit={async (values) => {

                }}
            >
                {({ errors
                }) => (
                    <button type='button' className={`${gStyles.textBig} ${pStyles.button} ${styles.button}`}>Вийти з акаунту</button>
                )}
            </Formik>
        </div>
    </div>
    );

}