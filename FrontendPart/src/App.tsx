import Layout from './layout/Layout';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ABOUT_US_PATH, CONTACTS_PATH, DETAIL_REGISTER, DETAILS_VACANCIES_PATH, DETAILS_WORKER_PATH, HOME_PATH, ORDER_WORK_PATH, PAGES_WITHOUT_LAYOUT, REGISTER_PATH, VACANCIES_PATH } from './routs/routs';
import { Home } from './pages/Home/Home';
import { SearchWorkers } from './pages/SearchWorkers/searchWorkers';
import { DetailsWorker } from './pages/DetailsWorker/DetailsWorker';
import { Vacancies } from './pages/Vacancies/Vacancies';
import { DetailsVacancies } from './pages/DetailsVacancies/DetailsVacancies';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Contacts } from './pages/Contacts/Contacts';
import { Register } from './pages/Register/Register';
import { DetailRegister } from './pages/DetailRegister/DetailRegister';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/AppRedux';
import { getUser } from './servers/user';

function App() {
  const location = useLocation();
  const hideLayout = PAGES_WITHOUT_LAYOUT.includes(location.pathname);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      {!hideLayout && <Layout>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={`${ORDER_WORK_PATH}/:nameWork/*`} element={<SearchWorkers />} />
          <Route path={`${DETAILS_WORKER_PATH}/:id/:title/:prevLocation/*`} element={<DetailsWorker />} />
          <Route path={`${VACANCIES_PATH}`} element={<Vacancies />} />
          <Route path={`${DETAILS_VACANCIES_PATH}/:id/*`} element={<DetailsVacancies />} />
          <Route path={`${ABOUT_US_PATH}`} element={<AboutUs />} />
          <Route path={`${CONTACTS_PATH}`} element={<Contacts />} />
        </Routes>
      </Layout>}
      <Routes>
        <Route path={`${REGISTER_PATH}`} element={<Register />} />
        <Route path={`${DETAIL_REGISTER}/*`} element={<DetailRegister />} />
      </Routes>
    </>
  );
}

export default App;
