import SideMenu from '../../components/community/SideMenu';
import Layout from '../../components/layout/Layout';
import UserinfoTab from './UserinfoTab';

function UserinfoPage() {
  return (
    <Layout>
      <SideMenu />
      <UserinfoTab />
    </Layout>
  );
}

export default UserinfoPage;
