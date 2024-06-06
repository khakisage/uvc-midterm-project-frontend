import Banner from '../common/Banner';

function Layout({ children }) {
  // 화면의 크기는 1440 * 1024 이다.
  // 화면의 배경색은 #E7E7E7 이다.
  // 화면 내부에는 컴포넌트들이 들어가게 된다.
  // 이때, 컴포넌트(children 컴포넌트)가 들어갈 div의 마진은 mx-[120px] 이다.
  // 우선은 여기까지.

  return (
    <div>
      <Banner />
      <div className="bg-bgGray z-30 flex h-[1024px] w-full flex-row">{children}</div>
    </div>
  );
}

export default Layout;
