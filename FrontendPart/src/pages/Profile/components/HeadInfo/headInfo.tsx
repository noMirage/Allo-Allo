import gStyles from '../../../../styles/styles.module.scss';
import styles from './styles.module.scss';
import pStyles from '../../styles.module.scss';
import avatar from '../../../../assets/global/avatar.jpg';
import { Form, Formik } from 'formik';
import { utilServer } from '../../../../utils/js/utilServer';
import { LOGOUT_USER } from '../../../../configs/configs';
import { useAppDispatch } from '../../../../hooks/AppRedux';
import { logOut } from '../../../../servers/user';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../../../../routs/routs';

interface IProps {
    fullName: string;
    phone: string;
    email: string;
    location: string;
}

export function HeadInfo(props: IProps) {

    const { fullName, phone, email, location } = props;

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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
                    utilServer(LOGOUT_USER, 'get');
                    dispatch(logOut());
                    navigate(HOME_PATH)
                }}
            >
                {({
                }) => (
                    <Form>
                        <button className={`${gStyles.textBig} ${pStyles.button} ${styles.button}`}>Вийти з акаунту</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
    );

}