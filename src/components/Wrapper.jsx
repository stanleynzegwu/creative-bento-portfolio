const Wrapper = ({ name, children }) => {
  return (
    <div className="relative pb-8 lg:pb-14">
      <div className="absolute left-8 lg:left-14 right-0 top-0 border-t-[1px] border-gray-200" />
      <span className="px-8 lg:px-14 pt-2 pb-8 inline-block uppercase text-sm text-gray-400">
        {name}
      </span>
      {children}
    </div>
  );
};

export default Wrapper;
