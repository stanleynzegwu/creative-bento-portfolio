import { animateToObject } from "@/utils";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const data = [
  { name: "education", className: "top-0 left-10", modelName: "box" },
  { name: "interests", className: "top-0 right-10", modelName: "sphere" },
  { name: "about", className: "bottom-0 left-0", modelName: "torus" },
  { name: "skills", className: "bottom-0 right-0", modelName: "torusKnot" },
];
const InfoOverlay = ({ setVisibleItem }) => {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);

  return (
    <Html zIndexRange={[10, 0]} center={true} className="overlay hidden opacity-0">
      {/* <div
        className={`z-10 text-white bg-black bg-opacity-70 w-40 h-10 rounded-full px-4 py-2 flex justify-center items-center cursor-pointer `}
      >
        <h1 className="text-xs ">{name}</h1>
      </div> */}
      <div
        className={`relative z-10 bg-cursor-pointer w-[100vw] h-[100vh] flex justify-center items-center`}
      >
        <div className="absolute top-36 lg:top-10 left-1/2 -translate-x-1/2 w-full md:w-2/3 lg:w-2/4 h-1/4 lg:h-2/4">
          {data.map((item, index) => (
            <h1
              className={`absolute uppercase text-2xl font-medium cursor-pointer hover:rounded-full hover:bg-blue-300 py-1 px-4 transition-all duration-300 ease-in-out ${item.className}`}
              key={index}
              onPointerEnter={() => setVisibleItem(item.modelName)}
              onClick={() => animateToObject(camera, controls)}
            >
              {item.name}
            </h1>
          ))}
        </div>
      </div>
    </Html>
  );
};

export default InfoOverlay;
