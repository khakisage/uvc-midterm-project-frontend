function VerticalLayout({ children }) {
  return <div className="grid grid-cols-3 grid-rows-7 gap-x-2 gap-y-2">{children}</div>;
}

export default VerticalLayout;
