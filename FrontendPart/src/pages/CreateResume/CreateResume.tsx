import { useAppSelector } from '../../hooks/AppRedux';
import { IUser } from '../../interfaces/user';
import { hasKeys } from '../../utils/js/checkTypes';
import gStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';
import { HeaderWithProgressBar } from '../../containers/HeaderWithProgressBar/HeaderWithProgressBar';
import { TRoutes } from '../../interfaces/global';
import { Route, Routes } from 'react-router-dom';
import { CREATE_RESUME, PROFILE_PATH } from '../../routs/routs';
import { useState } from 'react';
import { TUserDataWResume } from './types/types';
import { CreateStepSecond } from './components/createStepSecond/createStepSecond';
import { CreateDataStepZero } from '../../containers/createDataStepZero/createDataStepZero';
import { CreateDataStepOne } from '../../containers/createDataStepOne/createDataStepOne';

const ROUTES: TRoutes[] = [
    {
        path: CREATE_RESUME,
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


export function CreateResume() {

    const user: IUser | {} = useAppSelector((state) => state.user.data);

    const [data, setData] = useState<TUserDataWResume>({
        category: "сантехніка",
        title: "",
        description: "",
        images: [],
    });

    if (hasKeys<IUser>(user)) {
        return (
            <div className={styles.wrapper}>
                <div className={gStyles.container}>
                    <div className={styles.body}>
                        <HeaderWithProgressBar routes={ROUTES} />
                    </div>
                    <Routes>
                        <Route path={''} element={<CreateDataStepZero parentPath={CREATE_RESUME} returnPath={PROFILE_PATH} continuePath={ROUTES[1].path} title="Вкажіть категорію вашого резюме" setData={setData} />} />
                        <Route path={ROUTES[1].path} element={<CreateDataStepOne title="Вкажіть Заголовок та опис вашого резюме" parentPath={CREATE_RESUME} continuePath={ROUTES[2].path} returnPath={ROUTES[0].path} setData={setData} />} />
                        <Route path={ROUTES[2].path} element={<CreateStepSecond dataResume={data} comeBack={ROUTES[1].path} setData={setData} />} />
                    </Routes>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}