// import { useNavigate, useParams } from "react-router-dom";
// import gsap from "gsap";
// import { useRef, useState } from "react";
// import View360Experience from "@/canvas/View360";
// import ClickAndDrag from "@/components/svg/ClickAndDrag";
// import { useGSAP } from "@gsap/react";
// import useStore from "@/store/useStore";

// const IdeaBreakdown = () => {
//   const { id } = useParams();
//   const { ideaData, ideaView360Data } = useStore((state) => state.dbData);
//   const selectedIdea = ideaData?.find((data) => data._id === id);
//   const [isView360, setView360] = useState(false);
//   const navigate = useNavigate();
//   const elementRef = useRef(null);

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   useGSAP(() => {
//     // Animation setup
//     const animation = gsap.fromTo(
//       elementRef.current,
//       { y: "20%", opacity: 0 },
//       { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
//     );
//     // Cleanup function to stop animation on component unmount
//     return () => {
//       animation.kill();
//     };
//   }, []);

//   return (
//     <>
//       {!isView360 ? (
//         <div className="p-8 lg:p-12 py-10" ref={elementRef}>
//           <div className="text-sm text-gray-400 cursor-pointer mb-14" onClick={handleGoBack}>
//             Back
//           </div>

//           <div className="flex flex-col gap-8">
//             <div className="flex justify-between ">
//               <h2 className="capitalize text-xl font-semibold">{selectedIdea.header}</h2>
//               <span className="text-sm text-gray-400">{selectedIdea.date}</span>
//             </div>
//             <p className="text-sm ">{selectedIdea.description}</p>
//             <div
//               className="border-[1px] border-gray-300 bg-gray-100 rounded-md h-96 cursor-pointer"
//               onClick={() => setView360(true)}
//             >
//               <img
//                 src={ideaView360Data[0].imgUrl}
//                 alt="360view_preview"
//                 className="w-full h-full rounded-md"
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="relative h-full w-full">
//           <button
//             className={`absolute top-5 left-5 font-medium  text-sm bg-black text-white rounded-full px-4 py-1 transition-all duration-400 ease-in-out hover:scale-110 z-20`}
//             onClick={() => setView360(false)}
//           >
//             BACK
//           </button>
//           <ClickAndDrag />
//           <View360Experience textureUrl={ideaView360Data[0].imgUrl} />
//         </div>
//       )}
//     </>
//   );
// };

// export default IdeaBreakdown;

import { IDEA_DATA } from "@/constants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useRef, useState } from "react";
import View360Experience from "@/canvas/View360";
import ClickAndDrag from "@/components/svg/ClickAndDrag";
import { useGSAP } from "@gsap/react";
import CodeBlock from "../components/CodeBlock";
import useStore from "@/store/useStore";

const Breakdown = () => {
  const [isView360, setView360] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const extractedPath = location.pathname.split("/")[1];

  const dataList =
    extractedPath === "project"
      ? useStore((state) => state.dbData).projectData
      : useStore((state) => state.dbData).ideaData;
  const selectedData = dataList?.find((data) => data._id === id);
  const selectedDataIndex = dataList?.findIndex((data) => data._id === id);

  const handleGoBack = () => {
    navigate(-1);
  };

  const elementRef = useRef(null);
  useGSAP(() => {
    // Animation setup
    const animation = gsap.fromTo(
      elementRef.current,
      { y: "20%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    // Cleanup function to stop animation on component unmount
    return () => {
      animation.kill();
    };
  }, []);

  return (
    <>
      {!isView360 ? (
        <div className="p-8 lg:p-12 py-10" ref={elementRef}>
          <div className="text-sm text-gray-400 cursor-pointer mb-14" onClick={handleGoBack}>
            Back
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex justify-between ">
              <h2 className="capitalize text-xl font-semibold">{selectedData.header}</h2>
              <span className="text-sm text-gray-400">{selectedData.date}</span>
            </div>
            <p className="text-sm ">{selectedData.description}</p>
            <div
              className="border-[1px] border-gray-300 bg-gray-100 rounded-md h-96 cursor-pointer"
              onClick={() => setView360(true)}
            >
              <img
                src={selectedData.texture360Url}
                alt="360view_preview"
                className="w-full h-full rounded-md"
              />
            </div>
            <h1 className="capitalize text-center font-bold text-xl">{selectedData.articleH1}</h1>
            <div
              className={`flex flex-col lg:${
                selectedDataIndex % 2 ? "flex-row" : "flex-row-reverse"
              }  lg:items-center gap-8`}
            >
              <p className="lg:w-1/2 my-auto">{selectedData.articleLeft}</p>
              {selectedData.articleRightMediaType === "image" ? (
                <img
                  src={selectedData.articleRightMediaUrl}
                  alt="artcleImg"
                  className="lg:w-1/2 h-80 rounded-md"
                />
              ) : (
                selectedData.articleRightMediaType === "video" && (
                  <video
                    src={selectedData.articleRightMediaUrl}
                    alt="artcleImg"
                    className="lg:w-1/2 h-80 rounded-md"
                  />
                )
              )}
            </div>
            <h1 className="capitalize text-center font-bold text-xl">{selectedData.articleH2}</h1>

            {selectedData.visualCenterMediaType === "image" ? (
              <img
                src={selectedData.visualCenterMediaUrl}
                alt="visual-center"
                className="h-96 rounded-md"
              />
            ) : (
              <video
                src={selectedData.visualCenterMediaUrl}
                alt="visual-center"
                className="h-96 rounded-md"
              />
            )}
            <p>{selectedData.articleCenter}</p>
            <span className="text-sm">{selectedData.articleSmall}</span>
            <CodeBlock code={selectedData.articleCode} />
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <button
            className={`absolute top-5 left-5 font-medium  text-sm bg-black text-white rounded-full px-4 py-1 transition-all duration-400 ease-in-out hover:scale-110 z-20`}
            onClick={() => setView360(false)}
          >
            BACK
          </button>
          <ClickAndDrag />
          <View360Experience textureUrl={selectedData.texture360Url} />
        </div>
      )}
    </>
  );
};

export default Breakdown;
