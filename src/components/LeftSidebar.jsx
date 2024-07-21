const data = [
  {
    title: "berkeleytime",
    sub: ["gradTrak", "Typography"],
  },
  {
    title: "marqeta",
    sub: ["SSO forms", "Bulk-Adds/ Users"],
  },
  {
    title: "propertyGuru",
    sub: ["notifications", "web"],
  },
];

const LeftSidebar = () => {
  return (
    <aside className="relative hidden md:block w-60 lg:w-72 border-r-[1px] border-gray-200 overflow-y-auto h-screen scrollbar-hide">
      <div>
        <div className="p-6 py-10 flex flex-col gap-2">
          <div className="bg-gray-200 rounded-sm font-extrabold w-20 h-10 flex justify-center items-center">
            <a href="/">LOGO</a>
          </div>
          {["about", "ideas", "CV"].map((item, index) => (
            <span
              className="max-w-min capitalize text-xl font-semibold hover:text-gray-400 transition-all duration-200 ease-in-out"
              key={index}
            >
              <a href={`/${item}`}>{item}</a>
            </span>
          ))}
        </div>

        <div className="relative border-t-[1px] border-gray-200">
          {/* ///human interface */}
          <div className="p-6 flex flex-col gap-3">
            <h3 className="text-sm text-gray-400 uppercase">human interface</h3>
            <div className="flex flex-col gap-1 w-min">
              <span className="capitalize text-sm hover:text-gray-400">apple</span>
              <span className="capitalize text-sm hover:text-gray-400">GoodNotes</span>
            </div>
          </div>

          {/* ///web interface */}
          <div className="p-6 flex flex-col gap-3">
            <h3 className="text-sm text-gray-400 uppercase">web interface</h3>
            <div className="flex flex-col gap-1">
              {data.map((item, index) => (
                <div className="group flex flex-col gap-2 w-min hover:w-max" key={index}>
                  <span className="capitalize text-sm hover:text-gray-400">{item.title}</span>
                  <div className="hidden opacity-0 group-hover:flex group-hover:opacity-100 gap-2 transition-opacity duration-500 delay-150 ease-in-out">
                    <div className=" bg-gray-200 rounded-full w-[3px] max-w-[3px] min-w-[3px]" />
                    <div className="flex flex-col gap-2 ">
                      {item.sub.map((subItem, index) => (
                        <span className="capitalize text-sm hover:text-gray-400" key={index}>
                          {subItem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ///contact */}
        <div className="p-6 flex flex-col gap-3 border-t-[1px] border-gray-200">
          <h3 className="text-sm text-gray-400 uppercase">contact</h3>
          <div className="flex flex-col gap-1 w-min">
            <span className="capitalize text-sm hover:text-gray-400">mail</span>
            <span className="capitalize text-sm hover:text-gray-400">twitter</span>
            <span className="capitalize text-sm hover:text-gray-400">linkedIn</span>
            <span className="capitalize text-sm hover:text-gray-400">read.cv</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
