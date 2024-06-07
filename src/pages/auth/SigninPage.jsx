import { useState } from 'react';
import DynamicInput from '../../components/common/DynamicInput';
import Button from '../../components/common/Button';

function SigninPage() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const handleIdChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };
  return (
    <div className="flex h-[1024px] w-full items-center justify-center bg-white">
      <div>
        <form className="flex flex-col gap-4">
          <DynamicInput
            label="이메일"
            value={email}
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={handleIdChange}
          />
          <DynamicInput
            label="닉네임"
            value={nickname}
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={handleNicknameChange}
          />
          <DynamicInput
            label="비밀번호"
            value={password}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
          />
          <DynamicInput
            label="비밀번호 확인"
            value={passwordCheck}
            type="password"
            placeholder="비밀번호 확인"
            onChange={handlePasswordCheckChange}
          />
          <Button width={35.5} height={3.125} type="filled">
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
