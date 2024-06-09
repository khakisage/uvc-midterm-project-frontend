import Banner from '../common/Banner';
import Header from '../common/Header';

function Layout({ children }) {
  // 화면의 크기는 1440 * 1024 이다.
  // 화면의 배경색은 #E7E7E7 이다.
  // 화면 내부에는 컴포넌트들이 들어가게 된다.
  // 이때, 컴포넌트(children 컴포넌트)가 들어갈 div의 마진은 mx-[120px] 이다.

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-72px)] w-full flex-row justify-center bg-bgGray">
        <Banner />
        <div className="z-10 mt-28 flex flex-row gap-2">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
