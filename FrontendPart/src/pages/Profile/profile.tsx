import { useAppSelector } from '../../hooks/AppRedux';
import { IUser } from '../../interfaces/user';
import { hasKeys } from '../../utils/js/checkTypes';
import gStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';
import { HeadInfo } from './components/HeadInfo/headInfo';
import { UserResume } from './components/UserResume/userResume';
import { HistoryFinishedWorks } from './components/HistoryFinishedWorks/historyFinishedWorks';

export function Profile() {

    const user: IUser | {} = useAppSelector((state) => state.user.data);

    if (hasKeys<IUser>(user)) {
        return (
            <div className={gStyles.container}>
                <div className={`${styles.wrapper}`}>
                    <HeadInfo avatar={user.avatar} fullName={user.full_name} location={user.location} phone={user.phone} email={user.email} />
                    <UserResume resumes={user.resumes} />
                    <HistoryFinishedWorks />
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}