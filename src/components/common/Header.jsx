import Logo from '@assets/logo.svg?react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import ThemeButton from './ThemeButton';
import themeAtom from '../../atoms/themeAtom';
import Banner from './Banner';

function Header() {
  // 헤더의 위치는 상단에 고정되어 있어야 한다.
  // 헤더의 내부는 flex 로 정렬되면, 좌측에는 로고가 들어간다.
  // 우측에는 로그인 상태에 따라, 로그인 버튼 또는 로그아웃 버튼이 들어간다.
  // 로그인 시, 알림 버튼이 추가로 들어간다.
  const [theme, setTheme] = useAtom(themeAtom);
  const [isLogin, setIsLogin] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <header className="z-50 flex h-[72px] w-full flex-row justify-between bg-white px-8">
      <div id="logo">
        <Logo width={72} height={72} />
      </div>
      <div id="menu" className="flex flex-row gap-8">
        {/* 로그인 여부에 따라 조건부 렌더링 */}
        {/* 로그인 되어있을 때 */}

        <ThemeButton theme={theme} onClick={toggleTheme} />
        {isLogin ? (
          <>
            <button>알림</button>
            <button>로그아웃</button>
          </>
        ) : (
          <button>로그인</button>
        )}

        {/* 로그인 되어있지 않을 때 */}
      </div>
    </header>
  );
}

export default Header;
