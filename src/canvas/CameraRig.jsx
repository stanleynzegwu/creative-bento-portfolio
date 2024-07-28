import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

const CameraRig = ({ children, axisYDivisor = 75, axisXDivisor = 5 }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    easing.dampE(
      groupRef.current.rotation,
      [state.pointer.y / axisYDivisor, state.pointer.x / axisXDivisor, 0],
      0.25,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
