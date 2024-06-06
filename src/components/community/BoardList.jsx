const Boards = ['정보', '자유', '유머', '일상', '버그', '팁', '질문', '공략'];

function BoardList() {
  return (
    <div className="w-[20.5rem] h-auto border rounded-lg bg-white py-2">
      {Boards.map((board, idx) => (
        <div
          key={idx}
          className="w-[19.5rem] h-8 border-b border-bgGray items-center ml-2 flex flex-start"
        >
          <p className="w-12 h-6 ml-2">{board}</p>
        </div>
      ))}
    </div>
  );
}

export default BoardList;
