import { Canvas } from "@react-three/fiber";
import ParticleCursorAnimation from "./ParticleCursorAnimation";

const ParticleCursorExperience = ({ image }) => {
  return (
    <Canvas
      camera={{
        fov: 50,
        near: 0.1,
        far: 200,
        position: [0, 0, 12],
      }}
    >
      {/* <color attach="background" args={["#181818"]} /> */}
      <color attach="background" args={["#000000"]} />
      <ParticleCursorAnimation image={image} />
    </Canvas>
  );
};

export default ParticleCursorExperience;
