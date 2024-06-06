// import MainPage from './pages/community/MainPage';

import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/community/MainPage';
import SigninPage from '@pages/auth/SigninPage';
import SignupPage from '@pages/auth/SignupPage';

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
