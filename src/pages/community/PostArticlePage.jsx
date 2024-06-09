import PostArticleForm from '../../components/community/PostArticleForm';
import SideMenu from '../../components/community/SideMenu';
import Layout from '../../components/layout/Layout';

function PostArticlePage() {
  return (
    <Layout>
      <SideMenu />
      <PostArticleForm isEditing={false} postData={null} />
    </Layout>
  );
}

export default PostArticlePage;
