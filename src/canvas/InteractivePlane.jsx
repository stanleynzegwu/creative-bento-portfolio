import { Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

const InteractivePlane = ({ experienceConfig }) => {
  const { camera } = useThree();
  const { displacement } = experienceConfig;
  const interactivePlaneRef = useRef();
  useFrame(() => {
    /**
     * Raycaster
     */
    displacement.raycaster.setFromCamera(displacement.screenCursor, camera);

    if (interactivePlaneRef.current) {
      const intersections = displacement.raycaster.intersectObject(interactivePlaneRef.current);

      if (intersections.length) {
        const uv = intersections[0].uv;

        displacement.canvasCursor.x = uv.x * displacement.canvas.width;
        displacement.canvasCursor.y = (1 - uv.y) * displacement.canvas.height;
      }
    }

    /**
     * Displacement
     */
    // Fade out
    displacement.context.globalCompositeOperation = "source-over";
    displacement.context.globalAlpha = 0.02;
    displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height);
    // Draw glow
    const glowSize = displacement.canvas.width * 0.25;
    displacement.context.globalCompositeOperation = "lighten";
    displacement.context.globalAlpha = 1;
    displacement.context.drawImage(
      displacement.glowImage,
      displacement.canvasCursor.x - glowSize * 0.5,
      displacement.canvasCursor.y - glowSize * 0.5,
      glowSize,
      glowSize
    );
    // Texture
    displacement.texture.needsUpdate = true;
  });
  return (
    <Plane args={[10, 10]} ref={interactivePlaneRef} visible={false}>
      <meshBasicMaterial color="red" />
    </Plane>
  );
};

export default InteractivePlane;
