import { useNavigate } from 'react-router-dom';
import DynamicInput from '../../components/common/DynamicInput';
import Button from '../../components/common/Button';
import GoogleLogo from '../../assets/google.svg?react';
import DiscordLogo from '../../assets/discord.svg?react';
import useInputValidator from '../../hooks/useInputValidator';

function SigninPage() {
  const navigate = useNavigate();
  const [email, isEmailValid, handleEmailChange] = useInputValidator('', 'email');
  const [password, isPasswordValid, handlePasswordChange] = useInputValidator('', 'password');

  const handleSignupButtonClick = () => {
    navigate('/signup');
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
          {!isEmailValid ? (
            <div className="ml-2 text-xs text-red-400">이메일 형식이 올바르지 않습니다.</div>
          ) : (
            <div className="ml-2 text-xs text-mainBlue">이메일 형식이 올바릅니다.</div>
          )}{' '}
          <DynamicInput
            label="비밀번호"
            value={password}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
          />
          {!isPasswordValid ? (
            <div className="ml-2 text-xs text-red-400">
              숫자, 문자, 특수문자를 포함한 8자 이상이어야 합니다.
            </div>
          ) : (
            <div className="ml-2 text-xs text-mainBlue">비밀번호가 일치합니다.</div>
          )}
          <Button width={17.75} height={3.125} type="filled">
            로그인
          </Button>
        </form>
      </div>
      <div className="relative w-full max-w-[17.75rem] py-4">
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-400">
          <span className="bg-white px-2">or</span>
        </div>
        <div className="h-px w-full bg-gray-300"></div>
      </div>
      <div>
        <div className="flex flex-row justify-center gap-2">
          <button aria-label="구글 로그인">
            <GoogleLogo />
          </button>
          <button aria-label="디스코드 로그인">
            <DiscordLogo />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <p className="mr-2">아직 회원이 아니시라면?</p>
          <button onClick={handleSignupButtonClick} className="font-semibold text-mainBlue">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
