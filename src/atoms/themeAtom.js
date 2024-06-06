import { atom } from 'jotai';

// 테마 버튼의 상태를 만든다.
// 상태는 라이트 모드는 fisun, 다크 모드는 fimoon이다.

const themeAtom = atom('light');

export default themeAtom;
