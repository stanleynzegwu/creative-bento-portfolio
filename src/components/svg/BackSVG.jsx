// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import useStore from "@/store/useStore";
// import { handleSceneChange } from "@/utils";

// const BackSVG = (props) => {
//   const currentScene = useStore((state) => state.current_About_Scene);
//   const updateCurrentAboutScene = useStore((state) => state.updateCurrentAboutScene);
//   const svgRef = useRef(null);

//   useEffect(() => {
//     // GSAP animation to create a pulsing effect
//     gsap.fromTo(
//       svgRef.current,
//       { opacity: 1, scale: 1 },
//       { opacity: 0.7, scale: 1.1, repeat: -1, yoyo: true, duration: 1 }
//     );
//   }, []);

//   return (
//     <svg
//       ref={svgRef}
//       width="800px"
//       height="800px"
//       viewBox="0 0 1024 1024"
//       xmlns="http://www.w3.org/2000/svg"
//       className="absolute top-5 left-5 w-12 h-auto cursor-pointer"
//       onClick={() => {
//         handleSceneChange("ocean", currentScene, updateCurrentAboutScene);
//       }}
//       {...props}
//     >
//       <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
//       <path
//         fill="#ffffff"
//         d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
//       />
//     </svg>
//   );
// };

// export default BackSVG;

import { useRef } from "react";
import useStore from "@/store/useStore";
import { handleSceneChange } from "@/utils";

const BackSVG = (props) => {
  const currentScene = useStore((state) => state.current_About_Scene);
  const updateCurrentAboutScene = useStore((state) => state.updateCurrentAboutScene);
  const svgRef = useRef(null);

  return (
    <svg
      ref={svgRef}
      width="800px"
      height="800px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-5 left-5 w-12 h-auto cursor-pointer"
      onClick={() => {
        handleSceneChange("ocean", currentScene, updateCurrentAboutScene);
      }}
      {...props}
    >
      <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
      <path
        fill="#ffffff"
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
      />
    </svg>
  );
};

export default BackSVG;
