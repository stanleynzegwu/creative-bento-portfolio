// import * as THREE from "three";

// import vertexShader from "../shaders/particleCursor/vertex.glsl";
// import fragmentShader from "../shaders/particleCursor/fragment.glsl";
// import { shaderMaterial, useTexture } from "@react-three/drei";
// import { extend, useFrame } from "@react-three/fiber";
// import { useRef } from "react";

// const ParticleCursor = ({ experienceConfig, image }) => {
//   const particleCursorMaterialRef = useRef();

//   // Loaders
//   const pic1 = useTexture(image);

//   /**
//    * Particles
//    */
//   const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);

//   const ParticleCursorMaterial = shaderMaterial(
//     {
//       uResolution: new THREE.Vector2(
//         experienceConfig.sizes.width * experienceConfig.sizes.pixelRatio,
//         experienceConfig.sizes.height * experienceConfig.sizes.pixelRatio
//       ),
//       uPictureTexture: pic1,
//       uDisplacementTexture: experienceConfig.displacement.texture,
//     },
//     vertexShader,
//     fragmentShader
//   );
//   // declaratively
//   extend({ ParticleCursorMaterial });

//   window.addEventListener("resize", () => {
//     // Update sizes
//     experienceConfig.sizes.width = window.innerWidth;
//     experienceConfig.sizes.height = window.innerHeight;
//     experienceConfig.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

//     // Materials
//     particleCursorMaterialRef.current.uniforms.uResolution.value.set(
//       experienceConfig.sizes.width * experienceConfig.sizes.pixelRatio,
//       experienceConfig.sizes.height * experienceConfig.sizes.pixelRatio
//     );
//   });
//   useFrame(() => {});
//   return (
//     <points geometry={particlesGeometry}>
//       <particleCursorMaterial
//         ref={particleCursorMaterialRef}
//         // blending={THREE.AdditiveBlending}
//         // depthWrite={false}
//       />
//     </points>
//   );
// };

// export default ParticleCursor;

import * as THREE from "three";

import vertexShader from "../shaders/particleCursor/vertex.glsl";
import fragmentShader from "../shaders/particleCursor/fragment.glsl";
import { Plane, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const ParticleCursor = ({ image, isHovered }) => {
  const particleCursorMaterialRef = useRef();
  const interactivePlaneRef = useRef();
  const { camera } = useThree();

  // Loaders
  const pic1 = useTexture(image);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Materials
    particleCursorMaterialRef.current.uniforms.uResolution.value.set(
      sizes.width * sizes.pixelRatio,
      sizes.height * sizes.pixelRatio
    );
  });

  /**
   * Displacement
   */
  const displacement = {};
  // 2D canvas
  displacement.canvas = document.createElement("canvas");
  displacement.canvas.width = 128;
  displacement.canvas.height = 128;
  displacement.canvas.style.position = "fixed";
  displacement.canvas.style.width = "256px";
  displacement.canvas.style.height = "256px";
  displacement.canvas.style.top = 0;
  displacement.canvas.style.left = 0;
  displacement.canvas.style.zIndex = 10;
  document.body.append(displacement.canvas);
  // Context
  displacement.context = displacement.canvas.getContext("2d");
  displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height);
  // Glow image
  displacement.glowImage = new Image();
  displacement.glowImage.src = "/textures/glow.png";

  // Raycaster
  displacement.raycaster = new THREE.Raycaster();
  // Coordinates
  displacement.screenCursor = new THREE.Vector2(9999, 9999);
  displacement.canvasCursor = new THREE.Vector2(9999, 9999);
  displacement.canvasCursorPrevious = new THREE.Vector2(9999, 9999);
  // Texture
  displacement.texture = new THREE.CanvasTexture(displacement.canvas);

  window.addEventListener("pointermove", (event) => {
    displacement.screenCursor.x = (event.clientX / sizes.width) * 2 - 1;
    displacement.screenCursor.y = -(event.clientY / sizes.height) * 2 + 1;
  });

  /**
   * Particles
   */
  const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);
  particlesGeometry.setIndex(null);
  particlesGeometry.deleteAttribute("normal");

  const intensitiesArray = new Float32Array(particlesGeometry.attributes.position.count);
  const anglesArray = new Float32Array(particlesGeometry.attributes.position.count);

  for (let i = 0; i < particlesGeometry.attributes.position.count; i++) {
    intensitiesArray[i] = Math.random();
    anglesArray[i] = Math.random() * Math.PI * 2;
  }

  particlesGeometry.setAttribute("aIntensity", new THREE.BufferAttribute(intensitiesArray, 1));
  particlesGeometry.setAttribute("aAngle", new THREE.BufferAttribute(anglesArray, 1));

  const ParticleCursorMaterial = shaderMaterial(
    {
      uResolution: new THREE.Vector2(
        sizes.width * sizes.pixelRatio,
        sizes.height * sizes.pixelRatio
      ),
      uPictureTexture: pic1,
      uDisplacementTexture: displacement.texture,
      useNewPosition: isHovered ? 1.0 : 0.0, // Convert boolean to float
    },
    vertexShader,
    fragmentShader
  );
  // declaratively
  extend({ ParticleCursorMaterial });

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Materials
    particleCursorMaterialRef.current.uniforms.uResolution.value.set(
      sizes.width * sizes.pixelRatio,
      sizes.height * sizes.pixelRatio
    );
  });

  useEffect(() => {
    particleCursorMaterialRef.current.uniforms.uDisplacementTexture.value = displacement.texture;
  });
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

    // Speed alpha
    const cursorDistance = displacement.canvasCursorPrevious.distanceTo(displacement.canvasCursor);
    displacement.canvasCursorPrevious.copy(displacement.canvasCursor);
    const alpha = Math.min(cursorDistance * 0.1, 1);

    // Draw glow
    const glowSize = displacement.canvas.width * 0.25;
    displacement.context.globalCompositeOperation = "lighten";
    displacement.context.globalAlpha = alpha;
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
    <group>
      <Plane args={[10, 10]} ref={interactivePlaneRef}>
        <meshBasicMaterial color="red" visible={false} />
      </Plane>
      <points geometry={particlesGeometry}>
        <particleCursorMaterial
          ref={particleCursorMaterialRef}
          // blending={THREE.AdditiveBlending}
          // depthWrite={false}
        />
      </points>
    </group>
  );
};

export default ParticleCursor;

// import * as THREE from "three";
// import vertexShader from "../shaders/particleCursor/vertex.glsl";
// import fragmentShader from "../shaders/particleCursor/fragment.glsl";
// import { Plane, shaderMaterial, useTexture } from "@react-three/drei";
// import { extend, useFrame, useThree } from "@react-three/fiber";
// import { useEffect, useRef, useState } from "react";

// const ParticleCursor = ({ image, id, isHovered }) => {
//   console.log(isHovered);
//   const particleCursorMaterialRef = useRef();
//   const interactivePlaneRef = useRef();
//   const { camera } = useThree();
//   const [sizes, setSizes] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//     pixelRatio: Math.min(window.devicePixelRatio, 2),
//   });

//   // Loaders
//   const pic1 = useTexture(image);

//   useEffect(() => {
//     const handleResize = () => {
//       setSizes({
//         width: window.innerWidth,
//         height: window.innerHeight,
//         pixelRatio: Math.min(window.devicePixelRatio, 2),
//       });

//       if (particleCursorMaterialRef.current) {
//         particleCursorMaterialRef.current.uniforms.uResolution.value.set(
//           sizes.width * sizes.pixelRatio,
//           sizes.height * sizes.pixelRatio
//         );
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [sizes]);

//   /**
//    * Displacement
//    */
//   const displacement = useRef({
//     canvas: document.createElement("canvas"),
//     context: null,
//     glowImage: new Image(),
//     raycaster: new THREE.Raycaster(),
//     screenCursor: new THREE.Vector2(9999, 9999),
//     canvasCursor: new THREE.Vector2(9999, 9999),
//     canvasCursorPrevious: new THREE.Vector2(9999, 9999),
//     texture: null,
//   });

//   useEffect(() => {
//     const disp = displacement.current;
//     disp.canvas.width = 128;
//     disp.canvas.height = 128;
//     disp.canvas.style.position = "fixed";
//     disp.canvas.style.width = "256px";
//     disp.canvas.style.height = "256px";
//     disp.canvas.style.top = 0;
//     disp.canvas.style.left = 0;
//     disp.canvas.style.zIndex = 10;
//     document.body.append(disp.canvas);
//     disp.context = disp.canvas.getContext("2d");
//     disp.context.fillRect(0, 0, disp.canvas.width, disp.canvas.height);
//     disp.glowImage.src = "/textures/glow.png";
//     disp.texture = new THREE.CanvasTexture(disp.canvas);

//     return () => {
//       document.body.removeChild(disp.canvas);
//     };
//   }, []);

//   useEffect(() => {
//     const handlePointerMove = (event) => {
//       const disp = displacement.current;
//       disp.screenCursor.x = (event.clientX / sizes.width) * 2 - 1;
//       disp.screenCursor.y = -(event.clientY / sizes.height) * 2 + 1;
//     };

//     window.addEventListener("pointermove", handlePointerMove);
//     return () => window.removeEventListener("pointermove", handlePointerMove);
//   }, [sizes]);

//   /**
//    * Particles
//    */
//   const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);
//   particlesGeometry.setIndex(null);
//   particlesGeometry.deleteAttribute("normal");

//   const intensitiesArray = new Float32Array(particlesGeometry.attributes.position.count);
//   const anglesArray = new Float32Array(particlesGeometry.attributes.position.count);

//   for (let i = 0; i < particlesGeometry.attributes.position.count; i++) {
//     intensitiesArray[i] = Math.random();
//     anglesArray[i] = Math.random() * Math.PI * 2;
//   }

//   particlesGeometry.setAttribute("aIntensity", new THREE.BufferAttribute(intensitiesArray, 1));
//   particlesGeometry.setAttribute("aAngle", new THREE.BufferAttribute(anglesArray, 1));

//   const ParticleCursorMaterial = shaderMaterial(
//     {
//       uResolution: new THREE.Vector2(
//         sizes.width * sizes.pixelRatio,
//         sizes.height * sizes.pixelRatio
//       ),
//       uPictureTexture: pic1,
//       uDisplacementTexture: displacement.current.texture,
//       useNewPosition: isHovered ? 1.0 : 0.0, // Convert boolean to float
//     },
//     vertexShader,
//     fragmentShader
//   );
//   extend({ ParticleCursorMaterial });

//   useEffect(() => {
//     particleCursorMaterialRef.current.uniforms.uDisplacementTexture.value =
//       displacement.current.texture;
//   }, []);

//   useFrame(() => {
//     if (isHovered) {
//       const disp = displacement.current;

//       disp.raycaster.setFromCamera(disp.screenCursor, camera);

//       if (interactivePlaneRef.current) {
//         const intersections = disp.raycaster.intersectObject(interactivePlaneRef.current);

//         if (intersections.length) {
//           const uv = intersections[0].uv;

//           disp.canvasCursor.x = uv.x * disp.canvas.width;
//           disp.canvasCursor.y = (1 - uv.y) * disp.canvas.height;
//         }
//       }

//       /**
//        * Displacement
//        */
//       // Fade out
//       disp.context.globalCompositeOperation = "source-over";
//       disp.context.globalAlpha = 0.02;
//       disp.context.fillRect(0, 0, disp.canvas.width, disp.canvas.height);

//       // Speed alpha
//       const cursorDistance = disp.canvasCursorPrevious.distanceTo(disp.canvasCursor);
//       disp.canvasCursorPrevious.copy(disp.canvasCursor);
//       const alpha = Math.min(cursorDistance * 0.1, 1);

//       // Draw glow
//       const glowSize = disp.canvas.width * 0.25;
//       disp.context.globalCompositeOperation = "lighten";
//       disp.context.globalAlpha = alpha;
//       disp.context.drawImage(
//         disp.glowImage,
//         disp.canvasCursor.x - glowSize * 0.5,
//         disp.canvasCursor.y - glowSize * 0.5,
//         glowSize,
//         glowSize
//       );

//       // Texture
//       disp.texture.needsUpdate = true;
//     }
//   });

//   return (
//     <group>
//       <Plane args={[10, 10]} ref={interactivePlaneRef} visible={false}>
//         <meshBasicMaterial color="red" />
//       </Plane>
//       <points geometry={particlesGeometry}>
//         <particleCursorMaterial ref={particleCursorMaterialRef} blending={THREE.AdditiveBlending} />
//       </points>
//     </group>
//   );
// };

// export default ParticleCursor;
