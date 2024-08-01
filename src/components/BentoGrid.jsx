// import GPGPUExperience from "@/canvas/GPGPUFlowfieldEffect";
// import ParticleCursorExperience from "@/canvas/ParticleCursorExperience";

// const BentoGrid = ({ BENTO_DATA }) => {
//   const className = (index) =>
//     `flex flex-col gap-2 row-auto ${
//       index === 1 || index === 3 ? "md:row-span-2" : index === 4 ? "md:row-span-2" : "md:row-span-1"
//     }`;

//   return (
//     <section className="grid md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[250px] gap-4">
//       {BENTO_DATA.map((item, index) => (
//         <div className={className(index)} key={index}>
//           <div
//             className={`border-[.7px] border-gray-200 rounded-md flex items-center justify-center h-full hover:shadow-[rgba(17,_17,_26,_0.20)_0px_0px_35px] transition-all duration-500 delay-100 ease-in-out overflow-hidden ${
//               item.model ? "cursor-grab" : ""
//             }`}
//           >
//             <a href={`/ideas/${item.header}`} className="block w-full h-full">
//               {item.texture && <ParticleCursorExperience image={item.texture} />}
//               {item.model && <GPGPUExperience model={item.model} position={item.cameraPosition} />}
//               {item.img && (
//                 <img src={item.img} alt="" className="h-full w-full object-cover bg-cover" />
//               )}
//               {/* {item.img && <img src={item.img} alt="" className="object-contain bg-contain" />} */}
//               {item.video && (
//                 <video
//                   src={item.video}
//                   autoPlay
//                   muted
//                   loop
//                   className="object-cover h-full w-full"
//                 />
//               )}
//             </a>
//           </div>
//           <div className="flex justify-between items-start">
//             <div className="flex flex-col">
//               <span className="font-semibold text-lg lg:text-xl capitalize">{item.header}</span>
//               <span className="text-gray-400 font-bold text-lg lg:text-xl capitalize">
//                 {item.sub}
//               </span>
//             </div>
//             <span className="text-gray-500">{item.date}</span>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default BentoGrid;

// import GPGPUExperience from "@/canvas/GPGPUFlowfieldEffect";
// import ParticleCursorExperience from "@/canvas/ParticleCursorExperience";

// const BentoGrid = ({ BENTO_DATA }) => {
//   const className = (index) =>
//     `max-md:min-h-96 flex flex-col gap-2 row-auto ${
//       index === 1 || index === 3 ? "md:row-span-2" : index === 4 ? "md:row-span-2" : "md:row-span-1"
//     }`;

//   return (
//     <section className="grid md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[250px] gap-4">
//       {BENTO_DATA.map((item, index) => {
//         let content;
//         if (item.model && item.video) {
//           content = (
//             <video
//               src={item.video}
//               autoPlay
//               muted
//               loop
//               className="object-cover bg-cover h-full w-full"
//             />
//           );
//         } else if (item.texture) {
//           content = <ParticleCursorExperience image={item.texture} />;
//         } else if (item.model) {
//           content = <GPGPUExperience model={item.model} position={item.cameraPosition} />;
//         } else if (item.img) {
//           content = <img src={item.img} alt="" className="h-full w-full object-cover bg-cover" />;
//         } else if (item.video) {
//           content = (
//             <video src={item.video} autoPlay muted loop className="object-cover h-full w-full" />
//           );
//         }

//         return (
//           <div className={className(index)} key={index}>
//             <div
//               className={`border-[.7px] border-gray-200 rounded-md flex items-center justify-center h-full hover:shadow-[rgba(17,_17,_26,_0.20)_0px_0px_35px] transition-all duration-500 delay-100 ease-in-out overflow-hidden ${
//                 item.model ? "cursor-grab" : ""
//               }`}
//             >
//               <a href={`/ideas/${index}`} className="block w-full h-full">
//                 {content}
//               </a>
//             </div>
//             <div className="flex justify-between items-start">
//               <div className="flex flex-col">
//                 <span className="font-semibold text-lg lg:text-xl capitalize">{item.header}</span>
//                 <span className="text-gray-400 font-bold text-lg lg:text-xl capitalize">
//                   {item.sub}
//                 </span>
//               </div>
//               <span className="text-gray-500">{item.date}</span>
//             </div>
//           </div>
//         );
//       })}
//     </section>
//   );
// };

// export default BentoGrid;

import ParticleCursorExperience from "@/canvas/ParticleCursorExperience";
import useStore from "@/store/useStore";
import { Link } from "react-router-dom";

const BentoGrid = ({ BENTO_DATA }) => {
  const className = (index) =>
    `max-md:min-h-96 flex flex-col gap-2 row-auto ${
      index === 1 || index === 3 ? "md:row-span-2" : index === 4 ? "md:row-span-2" : "md:row-span-1"
    }`;

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[250px] gap-4">
      {BENTO_DATA?.map((item, index) => {
        let content;
        if (item.mediaType === "video") {
          content = (
            <video
              src={item.mediaUrl}
              autoPlay
              muted
              loop
              className="object-cover bg-cover h-full w-full"
            />
          );
        } else if (item.mediaType === "texture") {
          content = <ParticleCursorExperience image={item.mediaUrl} />;
        } else {
          content = (
            <img src={item.mediaUrl} alt="" className="h-full w-full object-cover bg-cover" />
          );
        }

        return (
          <div className={className(index)} key={index}>
            <div
              className={`border-[.7px] border-gray-200 rounded-md flex items-center justify-center h-full hover:shadow-[rgba(17,_17,_26,_0.20)_0px_0px_35px] transition-all duration-500 delay-100 ease-in-out overflow-hidden ${
                item.model ? "cursor-grab" : ""
              }`}
            >
              <Link to={`/ideas/${item._id}`} className="block w-full h-full">
                {content}
              </Link>
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
        );
      })}
    </section>
  );
};

export default BentoGrid;
