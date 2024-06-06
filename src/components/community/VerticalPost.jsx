import DefaultImage from '../../assets/defaultImage.svg?react';

function VerticalPost({ board, like, view, content, date, writer }) {
  return (
    <div className="flex h-[17rem] w-48 flex-col rounded-md bg-white">
      <div className="my-2 flex h-[8.5rem] items-center justify-center">
        <DefaultImage w={120} h={120} />
      </div>
      <div className="flex h-28 flex-col items-center justify-center px-4">
        <div className="flex w-full flex-row justify-between">
          <div>자유</div>
          <div className="flex flex-row gap-1">
            <div>조회 1</div>
            <div>좋아요 1</div>
          </div>
        </div>
        <div className="line-clamp-1 h-6">안녕하세요~~~~~. 김범숨다.</div>
        <div className="flex w-full flex-row justify-between">
          <div>2024.06.04</div>
          <div>김범수</div>
        </div>
      </div>
    </div>
  );
}

export default VerticalPost;
