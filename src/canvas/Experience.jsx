// import * as THREE from "three";
// import { OrbitControls, Preload } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import ParticleCursor from "./ParticleCursor";
// // import InteractivePlane from "./InteractivePlane";

// const Experience = ({ image }) => {
//   /**
//    * Sizes
//    */
//   const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     pixelRatio: Math.min(window.devicePixelRatio, 2),
//   };

//   /**
//    * Displacement
//    */
//   const displacement = {};
//   // 2D canvas
//   displacement.canvas = document.createElement("canvas");
//   // 2D canvas
//   displacement.canvas = document.createElement("canvas");
//   displacement.canvas.width = 128;
//   displacement.canvas.height = 128;
//   ///styles
//   displacement.canvas.style.position = "fixed";
//   displacement.canvas.style.width = "256px";
//   displacement.canvas.style.height = "256px";
//   displacement.canvas.style.top = 0;
//   displacement.canvas.style.left = 0;
//   displacement.canvas.style.zIndex = 10;
//   document.body.append(displacement.canvas);
//   // Context
//   displacement.context = displacement.canvas.getContext("2d");
//   displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height);
//   // Glow image
//   displacement.glowImage = new Image();
//   displacement.glowImage.src = "/textures/glow.png";

//   /**
//    * Raycaster
//    */
//   displacement.raycaster = new THREE.Raycaster();

//   // Coordinates
//   displacement.screenCursor = new THREE.Vector2(9999, 9999);
//   displacement.canvasCursor = new THREE.Vector2(9999, 9999);
//   // Texture
//   displacement.texture = new THREE.CanvasTexture(displacement.canvas);

//   window.addEventListener("pointermove", (event) => {
//     displacement.screenCursor.x = (event.clientX / sizes.width) * 2 - 1;
//     displacement.screenCursor.y = -(event.clientY / sizes.height) * 2 + 1;
//   });

//   const experienceConfig = {
//     sizes,
//     displacement,
//   };

//   return (
//     <Canvas
//       shadows
//       camera={{
//         fov: 50,
//         near: 0.1,
//         far: 200,
//         position: [0, 0, 16],
//       }}
//     >
//       <color attach="background" args={["#181818"]} />
//       <OrbitControls enableDamping={false} />
//       <ambientLight intensity={1} color={"#babad1"} />
//       {/* <InteractivePlane experienceConfig={experienceConfig} /> */}
//       <ParticleCursor experienceConfig={experienceConfig} image={image} />
//       <Preload all />
//     </Canvas>
//   );
// };

// export default Experience;

import * as THREE from "three";
import { OrbitControls, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import ParticleCursor from "./ParticleCursor";
// import InteractivePlane from "./InteractivePlane";

const Experience = ({ image, isHovered }) => {
  return (
    <Canvas
      camera={{
        fov: 50,
        near: 0.1,
        far: 200,
        position: [0, 0, 16],
      }}
    >
      <color attach="background" args={["#181818"]} />
      {/* <OrbitControls enableDamping={false} /> */}
      <ambientLight intensity={1} color={"#babad1"} />
      {/* <InteractivePlane experienceConfig={experienceConfig} /> */}
      <ParticleCursor image={image} isHovered={isHovered} />
      <Preload all />
    </Canvas>
  );
};

export default Experience;

// import { Canvas } from "@react-three/fiber";
// import { Preload } from "@react-three/drei";
// import ParticleCursor from "./ParticleCursor";

// const Experience = ({ image, id, isHovered }) => {
//   return (
//     <Canvas
//       shadows
//       camera={{
//         fov: 50,
//         near: 0.1,
//         far: 200,
//         position: [0, 0, 16],
//       }}
//     >
//       <color attach="background" args={["#181818"]} />
//       <ambientLight intensity={1} color={"#babad1"} />
//       <ParticleCursor image={image} id={id} isHovered={isHovered} />
//       <Preload all />
//     </Canvas>
//   );
// };

// export default Experience;
