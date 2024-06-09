import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { apiInstance } from '../../api/api';

function PostArticleForm() {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState('자유게시판');

  // const handleImageUpload = (file, callback) => {
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   // 서버로 이미지를 보내는 로직
  //   console.log('전송됐나요?', callback);
  //   // apiInstance
  //   //   .post('/image', formData)
  //   //   .then((response) => {
  //   //     callback(response.data.imageUrl);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //     callback(null, 'upload failed');
  //   //   });
  // };

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [[{ header: [1, 2, false] }], ['image']]
    }
  });

  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  };

  const saveToServer = async (file) => {
    const body = new FormData();
    body.append('file', file);
    console.log(body, file);
    const response = await apiInstance.post('/images', body);
    insertToEditor(response.uploadedImageUrl);
  };

  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  useEffect(() => {
    if (quill) {
      quill.getModule('toolbar').addHandler('image', selectLocalImage);
    }
  }, [quill]);

  const handleSubmit = async () => {
    if (quill) {
      const content = quill.root.innerHTML;
      const formData = new FormData();
      formData.append('content', content);
      formData.append('boardType', selectedBoard);

      try {
        // 서버로 formData를 보내는 로직 추가
        await apiInstance.post('/posts', formData);
        navigate('/');
      } catch (error) {
        console.error('Error uploading post:', error);
        // 에러 처리 로직 추가
      }
    }
  };

  return (
    <div className="flex w-[52rem] flex-col gap-2">
      <div className="flex h-[4.5rem] w-[52rem] flex-row items-center justify-between rounded-md bg-white px-4 focus:outline-none">
        <h2>글쓰기</h2>
        <select value={selectedBoard} onChange={handleBoardChange}>
          <option>자유게시판</option>
          <option>질문게시판</option>
          <option>정보게시판</option>
        </select>
      </div>
      <div className="h-[30rem] w-[52rem] bg-white">
        <div ref={quillRef}></div>
      </div>
      <div className="mt-11 flex h-[4.5rem] flex-row justify-between">
        <Button width={10.25} height={2.25} onClick={handleCancel}>
          취소
        </Button>
        <Button width={10.25} height={2.25} type="filled" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </div>
  );
}

export default PostArticleForm;
