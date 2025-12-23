import gStyles from '../../../../styles/styles.module.scss';
import styles from './styles.module.scss';
import pStyles from '../../styles.module.scss';
import { Form, Formik } from 'formik';
import { utilServer } from '../../../../utils/js/utilServer';
import { LOGOUT_USER } from '../../../../configs/configs';
import { useAppDispatch } from '../../../../hooks/AppRedux';
import { logOut } from '../../../../servers/user';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../../../../routs/routs';
import { EditProfile } from './components/EditProfile/EditProfile';
import { Avatar } from './components/Avatar/Avatar';

interface IProps {
    fullName: string;
    phone: string;
    email: string;
    location: string;
    avatar: string | null;
}

export function HeadInfo(props: IProps) {

    const { fullName, phone, email, location, avatar } = props;

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    return (<div className={styles.bodyHeadInfo}>
        <EditProfile fullName={fullName} phone={phone} location={location} />
        <div className={styles.container}>
            <div className={styles.body}>
                <Avatar avatar={avatar}/>
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