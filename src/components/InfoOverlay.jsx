import useStore from "@/store/useStore";
import { animateToObject, handleSceneChange } from "@/utils";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { gsap, Power2 } from "gsap";
import { useEffect } from "react";

const data = [
  { name: "education", className: "top-0 left-10", modelName: "box" },
  { name: "interests", className: "top-0 right-10", modelName: "sphere" },
  { name: "about", className: "bottom-0 left-0", modelName: "torus" },
  { name: "skills", className: "bottom-0 right-0", modelName: "torusKnot" },
];
const InfoOverlay = ({ visibleItem, setVisibleItem }) => {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);
  const updateCamera = useStore((state) => state.updateCamera);

  useEffect(() => {
    updateCamera(camera);
  }, []);

  const currentScene = useStore((state) => state.current_About_Scene);
  const updatCurrentAboutScene = useStore((state) => state.updatCurrentAboutScene);
  const updatCurrentAboutContent = useStore((state) => state.updatCurrentAboutContent);

  return (
    <Html zIndexRange={[10, 0]} center={true} className="overlay hidden opacity-0">
      {/* <div
        className={`z-10 text-white bg-black bg-opacity-70 w-40 h-10 rounded-full px-4 py-2 flex justify-center items-center cursor-pointer `}
      >
        <h1 className="text-xs ">{name}</h1>
      </div> */}
      <div
        className={`relative z-10 bg-cursor-pointer w-[100vw] h-[100vh] flex justify-center items-center select-none`}
      >
        <div className="absolute top-36 lg:top-10 left-1/2 -translate-x-1/2 w-full md:w-2/3 lg:w-2/4 h-1/4 lg:h-2/4">
          {data.map((item, index) => (
            <span
              className={`absolute uppercase text-base sm:text-xl md:2xl font-medium cursor-pointer hover:rounded-full hover:bg-blue-300 py-1 px-4 transition-all duration-300 ease-in-out select-none ${
                item.className
              } ${visibleItem === item.modelName && "bg-slate-400 rounded-full"}`}
              key={index}
              onPointerEnter={() => setVisibleItem(item.modelName)}
              onClick={() => {
                updatCurrentAboutContent(item.name);
                animateToObject(camera, controls);
                handleSceneChange("view360", currentScene, updatCurrentAboutScene);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </Html>
  );
};

export default InfoOverlay;
