import { useNavigate } from 'react-router-dom';
import DynamicInput from '@components/common/DynamicInput';
import Button from '@components/common/Button';
import useInputValidator from '../../hooks/useInputValidator';

function SignupPage() {
  const [email, isEmailValid, handleEmailChange] = useInputValidator('', 'email');
  const [password, isPasswordValid, handlePasswordChange] = useInputValidator('', 'password');
  const [passwordCheck, isPasswordCheckValid, handlePasswordCheckChange] = useInputValidator(
    '',
    'passwordCheck'
  );
  const navigate = useNavigate();

  const handleSigninButtonClick = () => {
    navigate('/login');
  };
  return (
    <div className="flex h-[1024px] w-full items-center justify-center bg-white">
      <div>
        <form className="flex flex-col gap-3">
          <DynamicInput
            label="이메일"
            value={email}
            type="text"
            isValid={isEmailValid}
            placeholder="이메일을 입력해주세요"
            onChange={handleEmailChange}
          />
          {!isEmailValid ? (
            <div className="text-xs text-red-400">이메일 형식이 올바르지 않습니다.</div>
          ) : (
            <div className="text-xs text-mainBlue">이메일 형식이 올바릅니다.</div>
          )}
          <DynamicInput
            label="비밀번호"
            value={password}
            type="password"
            isValid={isPasswordValid}
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
          />
          {!isPasswordValid ? (
            <div className="text-xs text-red-400">
              숫자, 문자, 특수문자를 포함한 8자 이상이어야 합니다.
            </div>
          ) : (
            <div className="text-xs text-mainBlue">비밀번호가 일치합니다.</div>
          )}
          <DynamicInput
            label="비밀번호 확인"
            value={passwordCheck}
            type="password"
            isValid={isPasswordCheckValid}
            placeholder="비밀번호 확인"
            onChange={handlePasswordCheckChange}
          />
          {!isPasswordCheckValid ? (
            <div className="text-xs text-red-400">비밀번호가 일치하지 않습니다.</div>
          ) : (
            <div className="text-xs text-mainBlue">비밀번호가 일치합니다.</div>
          )}
          <Button width={17.25} height={3.125} type="filled">
            회원가입
          </Button>
        </form>
        <div className="mt-4 flex items-center justify-center">
          <p className="mr-2">회원이시라면?</p>
          <button onClick={handleSigninButtonClick} className="font-semibold text-mainBlue">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
