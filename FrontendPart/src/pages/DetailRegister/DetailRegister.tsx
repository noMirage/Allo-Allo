import logo from '../../assets/Header/logo.svg';
import styles from './styles.module.scss';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IUserInfo, TRoutes } from './types/types';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { RegisterStepOne } from './components/RegisterStepOne/RegisterStepOne';
import { useAppDispatch, useAppSelector } from '../../hooks/AppRedux';
import { getUkraineLocations } from '../../servers/UkraineLocations';
import { RegisterStepSecond } from './components/RegisterStepSecond/RegisterStepSecond';
import { DETAIL_REGISTER } from '../../routs/routs';

const ROUTES: TRoutes[] = [
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
  const UkraineLocations = useAppSelector((state) => state.getUkraineLocations.data);

  useEffect(() => {
    dispatch(getUkraineLocations());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <ProgressBar routes={ROUTES} />
        <Routes>
          <Route path={ROUTES[0].path} element={<RegisterStepOne setUserInfo={setUserInfo} routeToGo={`${DETAIL_REGISTER}/registerStepSecond`} routeItSelf={ROUTES[0].path} />} />
          <Route path={ROUTES[1].path} element={<RegisterStepSecond userInfo={userInfo} UkraineLocations={UkraineLocations} routeToBack={`${DETAIL_REGISTER}${ROUTES[0].path}`} />} />
        </Routes>
      </div>
    </div>
  );
};