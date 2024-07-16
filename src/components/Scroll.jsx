import { INTERDISCIPLINARY_DATA } from "@/constants";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function Scroll() {
  return (
    <div className="relative w-full h-fit bg-transparent">
      <ScrollArea className="absolute top-0 left-0 w-[100%] border-none whitespace-nowrap z-20">
        <div className="flex gap-4 w-max space-x-4">
          {INTERDISCIPLINARY_DATA.map(({ imgPath, name }, index) => (
            <div
              key={index}
              //   className="relative p-6 shrink-0 w-[120px] h-[220px] rounded-3xl bg-[#4646D6] flex flex-col justify-between items-center z-10"
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-semibold capitalize text-wrap">{name}</span>
              <img src={imgPath} alt="icon" className="w-auto h-14" />
              {/* Light Illumination */}
              <div className="absolute -z-10 top-[45px] left-1/2 transform -translate-x-1/2 h-[25px] w-[25%] rounded-full bg-white opacity-[1] shadow-white" />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
