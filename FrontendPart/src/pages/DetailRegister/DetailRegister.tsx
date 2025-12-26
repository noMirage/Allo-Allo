import styles from './styles.module.scss';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { IUserInfo } from './types/types';
import { RegisterStepOne } from './components/RegisterStepOne/RegisterStepOne';
import { RegisterStepSecond } from './components/RegisterStepSecond/RegisterStepSecond';
import { DETAIL_REGISTER } from '../../routs/routs';
import { Greet } from './components/Greet/Greet';
import { TRoutes } from '../../interfaces/global';
import { HeaderWithProgressBar } from '../../containers/HeaderWithProgressBar/HeaderWithProgressBar';


const ROUTES: TRoutes[] = [
  {
    path: DETAIL_REGISTER,
    element: "",
  },
  {
    path: "/registerStepOne",
    element: "",
  },
  {
    path: "/registerStepSecond",
    element: "",
  },
];

export function DetailRegister() {

  const email = sessionStorage.getItem("email") ? JSON.parse(sessionStorage.getItem("email") || "") : "";

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    fullName: '',
    phone: "",
    email: email,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <HeaderWithProgressBar routes={ROUTES} />
        <Routes>
          <Route path={''} element={<Greet path={`${DETAIL_REGISTER}${ROUTES[1].path}`} />} />
          <Route path={ROUTES[1].path} element={<RegisterStepOne setUserInfo={setUserInfo} routeToGo={`${DETAIL_REGISTER}/registerStepSecond`} routeItSelf={ROUTES[1].path} />} />
          <Route path={ROUTES[2].path} element={<RegisterStepSecond userInfo={userInfo} routeToBack={`${DETAIL_REGISTER}${ROUTES[1].path}`} />} />
        </Routes>
      </div>
    </div>
  );
};