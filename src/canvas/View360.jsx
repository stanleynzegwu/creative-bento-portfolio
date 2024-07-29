import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, MeshReflectorMaterial, Environment, useTexture } from "@react-three/drei";
import CameraRig from "./CameraRig";
import "../utils";
import useStore from "@/store/useStore";

const View360 = ({ textureUrl }) => {
  const currentContent = useStore((state) => state.current_About_Content);
  const cylinderRef = useRef();
  const view_texture = useTexture(
    textureUrl
      ? textureUrl
      : currentContent
      ? `/textures/${currentContent}_texture.png`
      : `/textures/education_texture.png`
  );

  return (
    <group>
      {/* Main Cylinder */}
      {/**I gave a rotation to have the center to always show as the start point**/}
      <mesh ref={cylinderRef} rotation-y={Math.PI * 1}>
        <cylinderGeometry args={[13, 13, 22, 32, 1, true]} />
        <flipMaterial map={view_texture} side={THREE.BackSide} />
      </mesh>
      {/* White rounded floor Light */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-10}>
        <torusGeometry args={[13, 0.1, 40, 60]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-10}>
        <planeGeometry args={[25, 25]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={0.5}
          mixStrength={80}
          roughness={0.5}
          depthScale={0.5}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={1}
        />
      </mesh>
    </group>
  );
};

const View360Experience = ({ textureUrl }) => {
  const isControlsEnabled = useStore((state) => state.isControlsEnabled);

  return (
    <Canvas camera={{ fov: 55, near: 1, far: 20000, position: [0, 0, -17], rotation: [0, 0, 0] }}>
      <ambientLight intensity={0.5} />
      <color attach="background" args={["#0f0f0f"]} />
      <OrbitControls
        enableZoom={false}
        enabled={isControlsEnabled}
        enableDamping={true}
        maxPolarAngle={Math.PI * 0.495}
        minPolarAngle={Math.PI / 2}
        rotateSpeed={0.5} // Default is 1, lower values make rotation slower
        // panSpeed={0.5}
      />
      <CameraRig axisXDivisor={12}>
        <View360 textureUrl={textureUrl} />
      </CameraRig>
      <Environment preset="city" environmentIntensity={0.8} />
    </Canvas>
  );
};

export default View360Experience;
