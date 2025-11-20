import Layout from './layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { ABOUT_US_PATH, CONTACTS_PATH, DETAILS_VACANCIES_PATH, DETAILS_WORKER_PATH, HOME_PATH, ORDER_WORK_PATH, VACANCIES_PATH } from './routs/routs';
import { Home } from './pages/Home/Home';
import { SearchWorkers } from './pages/SearchWorkers/searchWorkers';
import { DetailsWorker } from './pages/DetailsWorker/DetailsWorker';
import { Vacancies } from './pages/Vacancies/Vacancies';
import { DetailsVacancies } from './pages/DetailsVacancies/DetailsVacancies';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Contacts } from './pages/Contacts/Contacts';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={HOME_PATH} element={<Home />} />
        <Route path={`${ORDER_WORK_PATH}/:nameWork/*`} element={<SearchWorkers />} />
        <Route path={`${DETAILS_WORKER_PATH}/:id/:title/:prevLocation/*`} element={<DetailsWorker />} />
        <Route path={`${VACANCIES_PATH}`} element={<Vacancies />} />
        <Route path={`${DETAILS_VACANCIES_PATH}/:id/*`} element={<DetailsVacancies />} />
        <Route path={`${ABOUT_US_PATH}`} element={<AboutUs />} />
        <Route path={`${CONTACTS_PATH}`} element={<Contacts />} />
      </Routes>
    </Layout>
  );
}

export default App;
