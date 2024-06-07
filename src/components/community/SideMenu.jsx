import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../common/Button';
import BoardList from './BoardList';
import Profile from './Profile';

function SideMenu() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  const handlePostButtonClick = () => {
    navigate('/post');
  };

  return (
    <div className="flex flex-col gap-1">
      <Profile />
      {isLogin ? (
        <Button width={20.5} height={4.5} type="filled">
          글쓰기
        </Button>
      ) : (
        <Button width={20.5} height={4.5} type="filled" onClick={handleLoginButtonClick}>
          로그인
        </Button>
      )}

      <BoardList />
    </div>
  );
}

export default SideMenu;
