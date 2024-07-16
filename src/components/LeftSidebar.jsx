const LeftSidebar = () => {
  return (
    <aside className="relative hidden md:block w-60 lg:w-72 border-r-[1px] border-gray-200 overflow-y-auto h-screen scrollbar-hide">
      <div>
        <div className="flex flex-col gap-1">
          {["about", "ideas", "CV"].map((item, index) => (
            <span className="capitalize text-lg font-semibold" key={index}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
