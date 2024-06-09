import { useAtom } from 'jotai';
import { FaCircle, FaFire, FaSearch } from 'react-icons/fa';
import { MdViewStream, MdViewModule } from 'react-icons/md';
import layoutAtom from '../../atoms/layoutAtom';

function SearchBar() {
  const [layout, setLayout] = useAtom(layoutAtom);

  const changeHorizontalView = () => {
    setLayout({ layout: 'horizontal' });
  };

  const changeVerticalView = () => {
    setLayout({ layout: 'vertical' });
  };
  return (
    <div className="mb-2 flex h-[4.5rem] w-[52rem] flex-row items-center justify-between rounded-md bg-white">
      <div className="ml-4 flex flex-row gap-2">
        <button aria-label="whole article">
          <div className="flex flex-row items-center gap-2">
            <FaCircle className="text-gray-500" />
            <p className="text-gray-500">전체</p>
          </div>
        </button>
        <button aria-label="hot article">
          <div className="flex flex-row items-center gap-2">
            <FaFire className="text-gray-500" />
            <p className="text-gray-500">인기</p>
          </div>
        </button>
      </div>
      <div className="mr-4 flex flex-row gap-4">
        <button
          aria-label="horizontal view"
          className="flex w-8 items-center justify-center"
          onClick={changeHorizontalView}
        >
          <MdViewStream />
        </button>
        <button
          aria-label="vertical view"
          className="flex w-8 items-center justify-center"
          onClick={changeVerticalView}
        >
          <MdViewModule />
        </button>
        {/* 이 div에는 검색어 필터를 위한 제목, 제목 + 내용, 작성자 select 가 들어가야하고, 검색어 입력창과 검색 버튼이 필요하다. */}
        <select defaultValue={1} className="h-12 focus:outline-none">
          <option value={1}>제목</option>
          <option value={2}>제목 + 내용</option>
          <option value={3}>작성자</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요" className="focus:outline-none" />
        <button aria-label="search button">
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
