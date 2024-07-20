import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Test = () => {
  const { scene } = useGLTF("/models/cube-bakeMaterial.glb");
  return (
    <>
      <primitive object={scene} />
    </>
  );
};
const TextExperience = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={1} color={"#babad1"} />
      <directionalLight position={[1, 2, 0]} intensity={2} />
      <Test />
    </Canvas>
  );
};

export default TextExperience;
