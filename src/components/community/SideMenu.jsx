import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import BoardList from './BoardList';
import Profile from './Profile';

function SideMenu() {
  const navigate = useNavigate();
  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  const handlePostButtonClick = () => {
    navigate('/post');
  };

  return (
    <div className="flex flex-col gap-2">
      <Profile />
      <Button width={20.5} height={4.5} type="filled">
        글쓰기
      </Button>
      <BoardList />
    </div>
  );
}

export default SideMenu;
