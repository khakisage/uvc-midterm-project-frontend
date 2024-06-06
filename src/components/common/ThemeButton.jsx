// 다크모드와 라이트모드를 전환하는 버튼을 만들어주는 컴포넌트입니다.
// 해당 함수에 필요한 props는 icon, onClick이 필요합니다.
// 또한, 상태에 따라 아이콘이 변경되도록 설정해야 합니다.
// 아이콘은 font-awesome을 사용하며, 아이콘은 다음과 같이 설정합니다.
// 라이트모드: fisun 다크모드: fimoon
import { FiSun, FiMoon } from 'react-icons/fi';

function ThemeButton({ theme, onClick }) {
  return (
    <button onClick={onClick} className="focus:outline-none" aria-label="theme change button">
      {theme === 'light' ? <FiSun size={24} /> : <FiMoon size={24} />}
    </button>
  );
}

export default ThemeButton;
