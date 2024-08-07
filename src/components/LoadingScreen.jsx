// import { useProgress } from "@react-three/drei";
// import SignatureSVG from "./svg/SignatureSvg";

// const LoadingScreen = ({ dataProgress }) => {
//   const progress = useProgress((state) => state.progress);
//   // console.log(progress);
//   return (
//     <div className="w-screen h-screen bg-black flex flex-col justify-center items-center text-white">
//       <div className="relative w-2/3 lg:w-1/3 h-auto ">
//         <SignatureSVG />
//         <span className="absolute bottom-0 right-0 text-xl font-semibold">
//           {Math.round((progress + dataProgress) / 2)} %
//         </span>
//       </div>
//       {/* custom loading screen 1,2... */}
//     </div>
//   );
// };

// export default LoadingScreen;

///////////////////////////////////////////////////////////

import { useProgress } from "@react-three/drei";
import SignatureSVG from "./svg/SignatureSvg";
import useSmoothProgress from "@/hooks/useSmoothProgress";
import { useEffect } from "react";
import useStore from "@/store/useStore";

const LoadingScreen = () => {
  const progress = useSmoothProgress();
  const total = useProgress((state) => state.total);
  const loaded = useProgress((state) => state.loaded);

  const dataProgress = useStore((state) => state.dataProgress);
  const setAssetLoaded = useStore((state) => state.setAssetLoaded);

  useEffect(() => {
    if (total === loaded && total !== 0) {
      setAssetLoaded(true);
    }
  }, [total, loaded, setAssetLoaded]);

  return (
    <div
      id="loading_screen"
      className={`fixed z-50 w-screen h-screen bg-black flex flex-col justify-center items-center text-white opacity-1 `}
    >
      <div className="relative w-2/4 md:w-1/3 h-auto">
        <SignatureSVG />
        <span className="absolute font-gupter bottom-0 right-0 translate-y-2 md:translate-y-1 text-lg md:text-2xl font-semibold">
          {Math.round((progress + dataProgress) / 2)} %
        </span>
      </div>
      {/* custom loading screen 1,2... */}
    </div>
  );
};

export default LoadingScreen;

// import { useProgress } from "@react-three/drei";
// import SignatureSVG from "./svg/SignatureSvg";
// import useSmoothProgress from "@/hooks/useSmoothProgress";
// import { useEffect } from "react";
// import useStore from "@/store/useStore";

// const LoadingScreen = ({ className }) => {
//   const progress = useSmoothProgress();
//   const total = useProgress((state) => state.total);
//   const loaded = useProgress((state) => state.loaded);

//   const dataProgress = useStore((state) => state.dataProgress);
//   const setAssetLoaded = useStore((state) => state.setAssetLoaded);

//   useEffect(() => {
//     if (total === loaded && total !== 0) {
//       setAssetLoaded(true);
//     }
//   }, [total, loaded, setAssetLoaded]);

//   return (
//     <div
//       className={`${className} fixed z-50 w-screen h-screen bg-black flex flex-col justify-center items-center text-white`}
//     >
//       <div className="relative w-2/3 lg:w-1/3 h-auto">
//         <SignatureSVG />
//         <span className="absolute bottom-0 right-0 text-xl font-semibold">
//           {Math.round((progress + dataProgress) / 2)} %
//         </span>
//       </div>
//       {/* custom loading screen 1,2... */}
//     </div>
//   );
// };

// export default LoadingScreen;

// import * as THREE from "three";
// import { Plane, shaderMaterial } from "@react-three/drei";
// import { useThree, extend, Canvas } from "@react-three/fiber";
// import { useRef } from "react";

// const PlaneBackgound = () => {
//   const planeShaderMaterialRef = useRef();
//   const { viewport } = useThree();

//   const PlaneShaderMaterial = shaderMaterial(
//     {
//       uCursor: new THREE.Vector2(0, 0),
//       time: 0,
//       color: new THREE.Color(bgColor.r, bgColor.g, bgColor.b),
//       colorB: new THREE.Color(newBgColor.r, newBgColor.g, newBgColor.b),
//       uProgression: 0,
//     },
//     vertexShader,
//     fragmentShader
//   );

//   // declaratively
//   extend({ PlaneShaderMaterial });

//   return (
//     <Canvas>
//       <Plane args={[viewport.width, viewport.height]}>
//         <planeShaderMaterial ref={planeShaderMaterialRef} />
//       </Plane>
//     </Canvas>
//   );
// };
