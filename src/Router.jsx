// import MainPage from './pages/community/MainPage';

import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/community/MainPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default Router;
