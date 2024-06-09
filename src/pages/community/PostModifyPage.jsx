import { useLocation } from 'react-router-dom';
import PostArticleForm from '../../components/community/PostArticleForm';

function PostModifyPage() {
  const { state } = useLocation();
  const { isEditing, postData } = state;
  return (
    <Layout>
      <SideMenu />
      <PostArticleForm isEditing={isEditing} postData={postData} />
    </Layout>
  );
}

export default PostModifyPage;
