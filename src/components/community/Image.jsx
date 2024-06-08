function Image({ imgUrl, width, height }) {
  return (
    <img
      src={imgUrl}
      alt="이미지"
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    />
  );
}

export default Image;
