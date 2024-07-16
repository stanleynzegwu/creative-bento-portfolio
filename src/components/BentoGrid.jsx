// import MainExp from "@/canvas/MainExp";

// const data = [
//   {
//     texture: "/textures/picture-1.png",
//     img: "/images/womantree2.jpg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//   },
//   { texture: "", img: "/images/100devs.jpeg", header: "Apple", sub: "Notes", date: "2023" },
//   { texture: "", img: "/images/100devs.jpeg", header: "Apple", sub: "Notes", date: "2023" },
//   { texture: "", img: "/images/100devs.jpeg", header: "Apple", sub: "Notes", date: "2023" },
//   {
//     texture: "/textures/picture-3.png",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//   },
//   { texture: "", img: "/images/100devs.jpeg", header: "Apple", sub: "Notes", date: "2023" },
//   { texture: "", img: "/images/100devs.jpeg", header: "Apple", sub: "Notes", date: "2023" },
//   { texture: "", img: "/images/100devs.jpeg", header: "Apple", sub: "Notes", date: "2023" },
//   { texture: "", img: "/images/100devs.jpeg", header: "Apple", sub: "Notes", date: "2023" },
// ];

// const BentoGrid = () => {
//   const className = (index) =>
//     ` flex flex-col gap-2 ${
//       index === 1 || index == 3 ? "row-span-2" : index === 2 ? "row-span-2" : "row-span-1"
//     } `;
//   return (
//     <section className="px-8 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-4">
//       {data.map(({ texture, img, header, sub, date }, index) => (
//         <div className={className(index)} key={index}>
//           <div className="bg-blue-300 border-[.7px] border-gray-200 rounded-md p-4 flex items-center justify-center h-full hover:shadow-[rgba(17,_17,_26,_0.25)_0px_0px_35px] transition-all duration-500 delay-100 ease-in-out overflow-hidden">
//             {index === 0 || index === 4 ? (
//               <MainExp image={texture} />
//             ) : (
//               <img src={img} alt="" className="object-contain bg-contain" />
//             )}
//           </div>
//           <div className="flex justify-between items-start">
//             <div className="flex flex-col">
//               <span className="font-semibold text-lg">{header}</span>
//               <span className="text-gray-500 font-bold text-lg capitalize">{sub}</span>
//             </div>
//             <span className="text-gray-500">{date}</span>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default BentoGrid;

// import MainExp from "@/canvas/MainExp";

// const data = [
//   {
//     texture: "/textures/picture-1.png",
//     img: "/images/womantree2.jpg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "", // No video for this item
//   },
//   {
//     texture: "",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "/video/video1.mp4", // Video for this item
//   },
//   {
//     texture: "",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "/video/video3.mp4", // No video for this item
//   },
//   {
//     texture: "",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "/video/video2.mov", // Video for this item
//   },
//   {
//     texture: "/textures/picture-3.png",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "", // No video for this item
//   },
//   {
//     texture: "",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "", // No video for this item
//   },
//   {
//     texture: "",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "/video/video3.mp4", // Video for this item
//   },
//   {
//     texture: "",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "/video/video3.mp4", // No video for this item
//   },
//   {
//     texture: "",
//     img: "/images/100devs.jpeg",
//     header: "Apple",
//     sub: "Notes",
//     date: "2023",
//     video: "", // No video for this item
//   },
// ];

// const BentoGrid = () => {
//   const className = (index) =>
//     `flex flex-col gap-2 ${
//       index === 1 || index === 3 ? "row-span-2" : index === 4 ? "row-span-2" : "row-span-1"
//     }`;

//   return (
//     <section className="px-8 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-4">
//       {data.map(({ texture, img, header, sub, date, video }, index) => (
//         <div className={className(index)} key={index}>
//           <div className="border-[.7px] border-gray-200 rounded-md p-4 flex items-center justify-center h-full hover:shadow-[rgba(17,_17,_26,_0.25)_0px_0px_35px] transition-all duration-500 delay-100 ease-in-out overflow-hidden">
//             {video ? (
//               <video src={video} autoPlay muted loop className="object-cover h-full w-full" />
//             ) : index === 0 || index === 4 ? (
//               <MainExp image={texture} />
//             ) : (
//               <img src={img} alt="" className="object-contain bg-contain" />
//             )}
//           </div>
//           <div className="flex justify-between items-start">
//             <div className="flex flex-col">
//               <span className="font-semibold text-lg">{header}</span>
//               <span className="text-gray-500 font-bold text-lg capitalize">{sub}</span>
//             </div>
//             <span className="text-gray-500">{date}</span>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default BentoGrid;

import MainExp from "@/canvas/MainExp";
import { BENTO_DATA } from "@/constants";

const BentoGrid = () => {
  const className = (index) =>
    `flex flex-col gap-2 row-auto ${
      index === 1 || index === 3 ? "md:row-span-2" : index === 4 ? "md:row-span-2" : "md:row-span-1"
    }`;

  return (
    <section className="px-8 lg:px-14  grid md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[250px] gap-4">
      {BENTO_DATA.map((item, index) => (
        <div className={className(index)} key={index}>
          <div className="border-[.7px] border-gray-200 rounded-md flex items-center justify-center h-full hover:shadow-[rgba(17,_17,_26,_0.25)_0px_0px_35px] transition-all duration-500 delay-100 ease-in-out overflow-hidden">
            {item.texture && <MainExp image={item.texture} />}
            {item.img && <img src={item.img} alt="" className="object-contain bg-contain" />}
            {item.video && (
              <video src={item.video} autoPlay muted loop className="object-cover h-full w-full" />
            )}
          </div>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-semibold text-lg capitalize">{item.header}</span>
              <span className="text-gray-400 font-bold text-lg capitalize">{item.sub}</span>
            </div>
            <span className="text-gray-500">{item.date}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BentoGrid;
