import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "black" }}>{Math.round(progress)} % loaded</div>
    </Html>
  );
};

export default Loader;
