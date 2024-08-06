import { useProgress } from "@react-three/drei";
import SignatureSVG from "./svg/SignatureSvg";

const LoadingScreen = () => {
  const progress = useProgress((state) => state.progress);
  // console.log(progress);
  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center text-white">
      {/* <div className="relative w-2/3 lg:w-1/3 h-auto ">
        <SignatureSVG />
        <span className="absolute bottom-0 right-0 text-xl font-semibold">{progress} %</span>
      </div> */}
      custom loading screen 1,2...
    </div>
  );
};

export default LoadingScreen;
