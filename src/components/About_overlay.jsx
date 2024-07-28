import { ABOUT_CONTENTS } from "@/constants";
import useStore from "@/store/useStore";

const About_overlay = () => {
  const about_display_mode = useStore((state) => state.about_display_mode);
  const currentContent = useStore((state) => state.current_About_Content);
  const updatAboutDisplayMode = useStore((state) => state.updatAboutDisplayMode);
  return (
    <div
      className={`${
        about_display_mode ? "visible opacity-1" : "hidden opacity-0"
      } absolute inset-0 flex flex-col bg-transparent p-4 lg:p-10 z-50 transition-all delay-200 duration-300 ease-in-out `}
    >
      <div className="relative p-4 lg:p-8 bg-white text-black w-full rounded-2xl flex flex-col gap-8 overflow-y-scroll">
        <img
          src="/images/closeIcon.png"
          alt=""
          className="z-20 fixed top-14 right-20 h-8 w-8 lg:h-10 lg:w-10 p-2 rounded-full bg-white cursor-pointer"
          onClick={updatAboutDisplayMode}
        />
        {currentContent === "interests" &&
          ABOUT_CONTENTS.interests.map((item, index) => (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8" key={index}>
              <div className="flex-1 flex flex-col gap-4">
                <span className="uppercase font-medium text-2xl">{item.name}</span>
                <p className="text-sm">{item.desc}</p>
              </div>
              <img
                src={item.image}
                alt=""
                className="w-full lg:w-40 aspect-square rounded-md flex-1"
              />
            </div>
          ))}

        {currentContent === "about" &&
          ABOUT_CONTENTS?.about.map((item, index) => (
            <div className="flex flex-col gap-4 lg:gap-8" key={index}>
              <h2 className="text-sm">{item.name}</h2>
              <p>{item.intro}</p>
              <div className="flex flex-col gap-8">
                {item?.education.map((value) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <span>{value.name}</span>
                    <p>
                      {value.major}
                      <span className="pl-4 text-sm text-gray-500">
                        {value.start} - {value.end}
                      </span>
                    </p>

                    <div className="flex-flex-col gap-4">
                      <span className="uppercase font-semibold text-xl">Achievements</span>
                      {value.achievements.map(({ name, desc, date }, index) => (
                        <div key={index} className="">
                          <p>
                            Name: <span>{name}</span>
                          </p>
                          <p>{desc}</p>

                          <p>
                            Date: <span>{date}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {/* {currentContent === "skills" &&
          ABOUT_CONTENTS?.skills.map((item, index) => (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8" key={index}>

            </div>
          ))} */}
      </div>
    </div>
  );
};

export default About_overlay;
