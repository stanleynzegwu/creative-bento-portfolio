import useStore from "@/store/useStore";
import { animateOutFromObject, handleSceneChange } from "@/utils";

const Button = () => {
  const currentScene = useStore((state) => state.current_About_Scene);
  const updatCurrentAboutScene = useStore((state) => state.updatCurrentAboutScene);
  const about_display_mode = useStore((state) => state.about_display_mode);
  const camera = useStore((state) => state.camera);

  return (
    <button
      className={`absolute top-5 left-5 font-medium  text-sm bg-white rounded-full px-4 py-1 transition-all duration-400 ease-in-out hover:scale-110 ${
        about_display_mode ? "opacity-0" : "opacity-100"
      }`}
      onClick={() => {
        handleSceneChange("ocean", currentScene, updatCurrentAboutScene);
        animateOutFromObject(camera);
      }}
    >
      BACK
    </button>
  );
};

export default Button;
