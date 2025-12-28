import { useAppSelector } from "../../hooks/AppRedux";
import { IUser, IUserEmployer } from "../../interfaces/user";
import { hasKeys } from "../../utils/js/checkTypes";
import gStyles from "../../styles/styles.module.scss";
import styles from "./styles.module.scss";
import { HeadInfo } from "./components/HeadInfo/headInfo";
import { HistoryFinishedWorks } from "./components/HistoryFinishedWorks/historyFinishedWorks";
import { UserCreateData } from "./components/UserCreateData/UserCreateData";
import { CREATE_RESUME, CREATE_VACANCY } from "../../routs/routs";

export function Profile() {
    const user: IUser | {} = useAppSelector((state) => state.user.data);

    if (hasKeys<IUser>(user)) {
        return (
            <div className={gStyles.container}>
                <div className={`${styles.wrapper}`}>
                    <HeadInfo
                        avatar={user.avatar}
                        fullName={user.full_name}
                        location={user.location}
                        phone={user.phone}
                        email={user.email}
                    />
                    {user.role === "job_seeker" ? (
                        <UserCreateData
                            title="Резюме"
                            description="Ви немаєте жодного створенного резюме, будь ласка створіть!"
                            redirect={{ url: CREATE_RESUME, name: "Створити резюме" }}
                            data={user.resumes}
                            role={user.role}
                        />
                    ) : (
                        <UserCreateData
                            data={(user as IUserEmployer).vacancies}
                            title="Вакансії"
                            description="Ви немаєте жодної створеної вакансії, будь ласка створіть!"
                            redirect={{ url: CREATE_VACANCY, name: "Створити вакансію" }}
                            role={user.role}
                        />
                    )}
                    {/* <HistoryFinishedWorks /> */}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
