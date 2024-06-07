// import MainPage from './pages/community/MainPage';

import { Route, Routes } from 'react-router-dom';
import SigninPage from '@pages/auth/SigninPage';
import SignupPage from '@pages/auth/SignupPage';
import MainPage from './pages/community/MainPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default Router;
