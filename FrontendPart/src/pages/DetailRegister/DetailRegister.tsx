import logo from '../../assets/Header/logo.svg';
import styles from './styles.module.scss';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState, useTransition } from 'react';
import { IUserInfo, TRoutes } from './types/types';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { RegisterStepOne } from './components/RegisterStepOne/RegisterStepOne';
import { useAppDispatch, useAppSelector } from '../../hooks/AppRedux';
import { getUkraineLocations } from '../../servers/UkraineLocations';
import { RegisterStepSecond } from './components/RegisterStepSecond/RegisterStepSecond';
import { DETAIL_REGISTER } from '../../routs/routs';
import { Greet } from './components/Greet/Greet';
import { IUkraineLocation } from '../../interfaces/UkraineLocations';

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

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    fullName: '',
    phone: "",
    email: JSON.parse(sessionStorage.getItem("email") || "") || null,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getUkraineLocations());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <ProgressBar routes={ROUTES} />
        <Routes>
          <Route path={''} element={<Greet path={`${DETAIL_REGISTER}${ROUTES[1].path}`} />} />
          <Route path={ROUTES[1].path} element={<RegisterStepOne setUserInfo={setUserInfo} routeToGo={`${DETAIL_REGISTER}/registerStepSecond`} routeItSelf={ROUTES[1].path} />} />
          <Route path={ROUTES[2].path} element={<RegisterStepSecond userInfo={userInfo} routeToBack={`${DETAIL_REGISTER}${ROUTES[1].path}`} />} />
        </Routes>
      </div>
    </div>
  );
};