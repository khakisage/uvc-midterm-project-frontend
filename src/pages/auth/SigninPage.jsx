import { useState } from 'react';
import DynamicInput from '../../components/common/DynamicInput';
import Button from '../../components/common/Button';
import GoogleLogo from '../../assets/google.svg?react';
import DiscordLogo from '../../assets/discord.svg?react';
import { useNavigate } from 'react-router-dom';

function SigninPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupButtonClick = () => {
    navigate('/signup');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex h-[1024px] w-full flex-col items-center justify-center bg-white">
      <div>
        <form className="flex flex-col gap-4">
          <DynamicInput
            label="이메일"
            value={email}
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={handleEmailChange}
          />
          <DynamicInput
            label="비밀번호"
            value={password}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
          />
          <Button width={35.5} height={3.125} type="filled">
            로그인
          </Button>
        </form>
      </div>
      <div>
        <div className="flex flex-row gap-2">
          <button>
            <GoogleLogo />
          </button>
          <button>
            <DiscordLogo />
          </button>
        </div>
        <button onClick={handleSignupButtonClick}>회원가입</button>
      </div>
    </div>
  );
}

export default SigninPage;
