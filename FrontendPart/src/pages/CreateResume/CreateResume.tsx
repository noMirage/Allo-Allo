import { useAppSelector } from '../../hooks/AppRedux';
import { IUser } from '../../interfaces/user';
import { hasKeys } from '../../utils/js/checkTypes';
import gStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';
import { HeaderWithProgressBar } from '../../containers/HeaderWithProgressBar/HeaderWithProgressBar';
import { TRoutes } from '../../interfaces/global';
import { Route, Routes } from 'react-router-dom';
import { CreateStepZero } from './components/createStepZero/createStepZero';
import { CREATE_RESUME } from '../../routs/routs';
import { useState } from 'react';
import { TUserDataWResume } from './types/types';
import { CreateStepOne } from './components/createStepOne/createStepOne';
import { CreateStepSecond } from './components/createStepSecond/createStepSecond';

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
        descritpion: "",
        images: ""
    });

    if (hasKeys<IUser>(user)) {
        return (
            <div className={styles.wrapper}>
                <div className={gStyles.container}>
                    <div className={styles.body}>
                        <HeaderWithProgressBar routes={ROUTES} />
                    </div>
                    <Routes>
                        <Route path={''} element={<CreateStepZero setData={setData} pathToGo={ROUTES[1].path} />} />
                        <Route path={ROUTES[1].path} element={<CreateStepOne ahead={ROUTES[2].path} comeBack={ROUTES[0].path} setData={setData} />} />
                        <Route path={ROUTES[2].path} element={<CreateStepSecond comeBack={ROUTES[1].path} setData={setData} />} />
                    </Routes>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}