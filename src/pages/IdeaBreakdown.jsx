// import GPGPUExperience from "@/canvas/GPGPUFlowfieldEffect";
// import { IDEA_DATA } from "@/constants";
// import { useNavigate, useParams } from "react-router-dom";
// import gsap from "gsap";
// import { useEffect, useRef } from "react";

// const IdeaBreakdown = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const idea = IDEA_DATA.find((_, index) => index === +id);

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   const elementRef = useRef(null);
//   useEffect(() => {
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
//     <div className="p-8 lg:p-12 py-10" ref={elementRef}>
//       <div className="text-sm text-gray-400 cursor-pointer mb-14" onClick={handleGoBack}>
//         Back
//       </div>

//       <div className="flex flex-col gap-8">
//         <div className="flex justify-between ">
//           <h2 className="capitalize text-xl font-semibold">{idea.header}</h2>
//           <span className="text-sm text-gray-400">{idea.date}</span>
//         </div>
//         <p className="text-sm ">{idea.desc}</p>
//         <div className="border-[1px] border-gray-300 bg-gray-100 rounded-md h-96">
//           <GPGPUExperience model={idea.model} position={[0, 0, 10]} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IdeaBreakdown;

/////////////////////////

import { IDEA_DATA } from "@/constants";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useRef, useState } from "react";
import View360Experience from "@/canvas/View360";
import ClickAndDrag from "@/components/svg/ClickAndDrag";
import { useGSAP } from "@gsap/react";

const IdeaBreakdown = () => {
  const [isView360, setView360] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const idea = IDEA_DATA.find((_, index) => index === +id);

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
              <h2 className="capitalize text-xl font-semibold">{idea.header}</h2>
              <span className="text-sm text-gray-400">{idea.date}</span>
            </div>
            <p className="text-sm ">{idea.desc}</p>
            <div
              className="border-[1px] border-gray-300 bg-gray-100 rounded-md h-96 cursor-pointer"
              onClick={() => setView360(true)}
            >
              <img
                src="/textures/ideas_texture1.png"
                alt="360view_preview"
                className="w-full h-full rounded-md"
              />
            </div>
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
          <View360Experience textureUrl={"/textures/ideas_texture1.png"} />
        </div>
      )}
    </>
  );
};

export default IdeaBreakdown;
