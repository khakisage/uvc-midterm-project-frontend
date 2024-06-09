// import MainPage from './pages/community/MainPage';

import { Route, Routes } from 'react-router-dom';
import SigninPage from '@pages/auth/SigninPage';
import SignupPage from '@pages/auth/SignupPage';
import MainPage from './pages/community/MainPage';
import PostArticlePage from './pages/community/PostArticlePage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/post" element={<PostArticlePage />} />
    </Routes>
  );
}

export default Router;
