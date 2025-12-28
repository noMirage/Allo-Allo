import { useAppSelector } from "../../hooks/AppRedux";
import { IUser } from "../../interfaces/user";
import { hasKeys } from "../../utils/js/checkTypes";
import gStyles from "../../styles/styles.module.scss";
import styles from "./styles.module.scss";
import { HeaderWithProgressBar } from "../../containers/HeaderWithProgressBar/HeaderWithProgressBar";
import { TRoutes } from "../../interfaces/global";
import { Route, Routes } from "react-router-dom";
import { CREATE_VACANCY, PROFILE_PATH } from "../../routs/routs";
import { useState } from "react";
import { TUserDataVacancy } from "./types/types";
import { CreateStepSecond } from "./components/createStepSecond/createStepSecond";
import { CreateDataStepZero } from "../../containers/createDataStepZero/createDataStepZero";
import { CreateDataStepOne } from "../../containers/createDataStepOne/createDataStepOne";

const ROUTES: TRoutes[] = [
    {
        path: CREATE_VACANCY,
        element: "",
    },
    {
        path: "/createStepOne",
        element: "",
    },
    {
        path: "/createStepSecond",
        element: "",
    },
];

export function CreateVacancy() {
    const user: IUser | {} = useAppSelector((state) => state.user.data);

    const [data, setData] = useState<TUserDataVacancy>({
        category: "сантехніка",
        title: "",
        description: "",
        images: "",
    });

    if (hasKeys<IUser>(user)) {
        return (
            <div className={styles.wrapper}>
                <div className={gStyles.container}>
                    <div className={styles.body}>
                        <HeaderWithProgressBar routes={ROUTES} />
                    </div>
                    <Routes>
                        <Route
                            path={""}
                            element={
                                <CreateDataStepZero
                                    parentPath={CREATE_VACANCY}
                                    returnPath={PROFILE_PATH}
                                    continuePath={ROUTES[1].path}
                                    title="Вкажіть категорію вашої вакансії"
                                    setData={setData}
                                />
                            }
                        />
                        <Route
                            path={ROUTES[1].path}
                            element={
                                <CreateDataStepOne
                                    title="Вкажіть Заголовок та опис вашої вакансії"
                                    parentPath={CREATE_VACANCY}
                                    continuePath={ROUTES[2].path}
                                    returnPath={ROUTES[0].path}
                                    setData={setData}
                                />
                            }
                        />
                        <Route
                            path={ROUTES[2].path}
                            element={
                                <CreateStepSecond
                                    title={data.title}
                                    description={data.description}
                                    category={data.category}
                                    returnPath={`${CREATE_VACANCY}${ROUTES[1].path}`}
                                    setData={setData}
                                />
                            }
                        />
                    </Routes>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
