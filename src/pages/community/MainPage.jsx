import Layout from '../../components/layout/Layout';
import HorizontalPost from '../../components/community/HorizontalPost';
import SideMenu from '../../components/community/SideMenu';
import VerticalPost from '../../components/community/VerticalPost';
import Pagination from '../../components/community/Pagination';
// import { dummyData } from '../../mock/dummy';

function MainPage() {
  // 일단은 dummy data를 사용하고, 나중에 서버와 연동해서 데이터를 받아오도록 하자.
  // const dummy = dummyData;
  // const renderingPosts = ({dummy}) => {};

  return (
    <Layout>
      <SideMenu />
      {/*
      Layout 컴포넌트는 두개의 컴포넌트를 flex로 배치시킨다.
      때문에 왼쪽에는 SideMenu가 들어가고, 오른쪽에는 새롭게 만들 pagination 컴포넌트를 만들어서 넣어주면 된다.
      */}
      <Pagination />
      {/* <VerticalPost /> */}
    </Layout>
  );
}

export default MainPage;
