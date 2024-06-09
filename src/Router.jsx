// import MainPage from './pages/community/MainPage';

import { Route, Routes } from 'react-router-dom';
import SigninPage from '@pages/auth/SigninPage';
import SignupPage from '@pages/auth/SignupPage';
import MainPage from './pages/community/MainPage';
import PostArticlePage from './pages/community/PostArticlePage';
import PostSpecPage from './pages/community/PostSpecPage';
import UserinfoPage from './pages/auth/UserinfoPage';
import PostModifyPage from './pages/community/PostModifyPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/post" element={<PostArticlePage />} />
      <Route path="/article/:id" element={<PostSpecPage />} />
      <Route path="/post/:id" element={<PostModifyPage />} />
      <Route path="/userinfo" element={<UserinfoPage />} />
    </Routes>
  );
}

export default Router;
