import ParticleCursorExperience from "@/canvas/ParticleCursorExperience";
import { BENTO_DATA } from "@/constants";

const BentoGrid = () => {
  const className = (index) =>
    `flex flex-col gap-2 row-auto ${
      index === 1 || index === 3 ? "md:row-span-2" : index === 4 ? "md:row-span-2" : "md:row-span-1"
    }`;

  return (
    <section className="p-6 md:p-8 lg:p-12  grid md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[250px] gap-4">
      {BENTO_DATA.map((item, index) => (
        <div className={className(index)} key={index}>
          <div className="border-[.7px] border-gray-200 rounded-md flex items-center justify-center h-full hover:shadow-[rgba(17,_17,_26,_0.20)_0px_0px_35px] transition-all duration-500 delay-100 ease-in-out overflow-hidden">
            {item.texture && <ParticleCursorExperience image={item.texture} />}
            {item.img && <img src={item.img} alt="" className="object-cover bg-cover" />}
            {/* {item.img && <img src={item.img} alt="" className="object-contain bg-contain" />} */}
            {item.video && (
              <video src={item.video} autoPlay muted loop className="object-cover h-full w-full" />
            )}
          </div>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-semibold text-lg lg:text-xl capitalize">{item.header}</span>
              <span className="text-gray-400 font-bold text-lg lg:text-xl capitalize">
                {item.sub}
              </span>
            </div>
            <span className="text-gray-500">{item.date}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BentoGrid;
