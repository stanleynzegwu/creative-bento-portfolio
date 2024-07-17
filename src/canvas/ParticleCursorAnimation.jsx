// import * as THREE from "three";
// import { useEffect, useRef } from "react";
// import { extend, useFrame } from "@react-three/fiber";
// import { shaderMaterial, Center, useTexture } from "@react-three/drei";

// import vertexShader from "../shaders/particleCursor/vertex.glsl";
// import fragmentShader from "../shaders/particleCursor/fragment.glsl";

// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
//   pixelRatio: Math.min(window.devicePixelRatio, 2),
// };

// /**
//  * Particles
//  */
// const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);
// particlesGeometry.setIndex(null);
// particlesGeometry.deleteAttribute("normal");

// const intensitiesArray = new Float32Array(particlesGeometry.attributes.position.count);
// const anglesArray = new Float32Array(particlesGeometry.attributes.position.count);

// for (let i = 0; i < particlesGeometry.attributes.position.count; i++) {
//   intensitiesArray[i] = Math.random();
//   anglesArray[i] = Math.random() * Math.PI * 2;
// }

// particlesGeometry.setAttribute("aIntensity", new THREE.BufferAttribute(intensitiesArray, 1));
// particlesGeometry.setAttribute("aAngle", new THREE.BufferAttribute(anglesArray, 1));

// const ParticlesMaterial = shaderMaterial(
//   {
//     uResolution: new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio),
//     uPictureTexture: null,
//     uDisplacementTexture: null,
//   },
//   vertexShader,
//   fragmentShader
// );

// extend({ ParticlesMaterial });

// export default function Exp({ image }) {
//   const materialRef = useRef();
//   const canvasInfo = useRef({
//     canvas: null,
//     context: null,
//     canvasCursorX: 0,
//     canvasCursorY: 0,
//     displacementTexture: null,
//     // canvasCursorPreviousX: 9999,
//     // canvasCursorPreviousY: 9999,
//   });

//   const pictureTexture = useTexture(image);

//   useEffect(() => {
//     // Create the 2D canvas
//     const newCanvas = document.createElement("canvas");
//     newCanvas.width = 128;
//     newCanvas.height = 128;
//     newCanvas.style.position = "fixed";
//     newCanvas.style.width = "256px";
//     newCanvas.style.height = "256px";
//     newCanvas.style.top = "0";
//     newCanvas.style.right = "0";
//     newCanvas.style.zIndex = 1000;
//     // document.body.append(newCanvas);

//     const canvasContext = newCanvas.getContext("2d");
//     canvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

//     canvasInfo.current.canvas = newCanvas;
//     canvasInfo.current.context = canvasContext;
//     canvasInfo.current.displacementTexture = new THREE.CanvasTexture(canvasInfo.current.canvas);

//     materialRef.current.uniforms.uPictureTexture.value = pictureTexture;
//     materialRef.current.uniforms.uDisplacementTexture.value =
//       canvasInfo.current.displacementTexture;

//     return () => {
//       document.body.removeChild(newCanvas);
//     };
//   }, [pictureTexture]);

//   const drawOnMove = (e) => {
//     if (!canvasInfo.current.canvas || !canvasInfo.current.context) return;
//     const uv = e.intersections[0].uv;
//     const newCanvasCursorX = uv.x * canvasInfo.current.canvas.width;
//     const newCanvasCursorY = (1 - uv.y) * canvasInfo.current.canvas.height;
//     canvasInfo.current.canvasCursorX = newCanvasCursorX;
//     canvasInfo.current.canvasCursorY = newCanvasCursorY;
//   };

//   const brushTexture = new Image();
//   brushTexture.src = "/textures/glow.png";

//   useFrame(() => {
//     if (!canvasInfo.current.context || !canvasInfo.current.canvas) return;

//     canvasInfo.current.context.globalCompositeOperation = "source-over";
//     canvasInfo.current.context.globalAlpha = 0.02;
//     canvasInfo.current.context.fillRect(
//       0,
//       0,
//       canvasInfo.current.canvas.width,
//       canvasInfo.current.canvas.height
//     );

//     const glowSize = canvasInfo.current.canvas.width * 0.25;
//     canvasInfo.current.context.globalCompositeOperation = "lighten";
//     canvasInfo.current.context.globalAlpha = 1;
//     canvasInfo.current.context.drawImage(
//       brushTexture,
//       canvasInfo.current.canvasCursorX - glowSize * 0.5,
//       canvasInfo.current.canvasCursorY - glowSize * 0.5,
//       glowSize,
//       glowSize
//     );

//     canvasInfo.current.displacementTexture.needsUpdate = true;
//   });

//   return (
//     <>
//       <Center>
//         <points geometry={particlesGeometry}>
//           <particlesMaterial ref={materialRef} />
//         </points>
//         <mesh onPointerMove={drawOnMove} visible={false}>
//           <planeGeometry args={[10, 10]} />
//           <meshBasicMaterial />
//         </mesh>
//       </Center>
//     </>
//   );
// }

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial, Center, useTexture } from "@react-three/drei";

import vertexShader from "../shaders/particleCursor/vertex.glsl";
import fragmentShader from "../shaders/particleCursor/fragment.glsl";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

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

const ParticlesMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio),
    uPictureTexture: null,
    uDisplacementTexture: null,
  },
  vertexShader,
  fragmentShader
);

extend({ ParticlesMaterial });

export default function ParticleCursorAnimation({ image }) {
  const materialRef = useRef();
  const canvasInfo = useRef({
    canvas: null,
    context: null,
    canvasCursor: new THREE.Vector2(9999, 9999),
    canvasCursorPrevious: new THREE.Vector2(9999, 9999),
    displacementTexture: null,
  });

  const pictureTexture = useTexture(image);

  useEffect(() => {
    // Create the 2D canvas
    const newCanvas = document.createElement("canvas");
    newCanvas.width = 128;
    newCanvas.height = 128;
    newCanvas.style.position = "fixed";
    newCanvas.style.width = "256px";
    newCanvas.style.height = "256px";
    newCanvas.style.top = "0";
    newCanvas.style.right = "0";
    newCanvas.style.zIndex = 1000;
    // document.body.append(newCanvas);

    const canvasContext = newCanvas.getContext("2d");
    canvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

    canvasInfo.current.canvas = newCanvas;
    canvasInfo.current.context = canvasContext;
    canvasInfo.current.displacementTexture = new THREE.CanvasTexture(canvasInfo.current.canvas);

    materialRef.current.uniforms.uPictureTexture.value = pictureTexture;
    materialRef.current.uniforms.uDisplacementTexture.value =
      canvasInfo.current.displacementTexture;

    //uncomment the below out if any issue arises
    return () => {
      // Cleanup canvas context and canvas
      canvasInfo.current.context = null;
      canvasInfo.current.canvas = null;
      canvasInfo.current.displacementTexture.dispose();
    };
  }, [pictureTexture]);

  const drawOnMove = (e) => {
    if (!canvasInfo.current.canvas || !canvasInfo.current.context) return;
    const uv = e.intersections[0].uv;
    const newCanvasCursorX = uv.x * canvasInfo.current.canvas.width;
    const newCanvasCursorY = (1 - uv.y) * canvasInfo.current.canvas.height;
    canvasInfo.current.canvasCursor.x = newCanvasCursorX;
    canvasInfo.current.canvasCursor.y = newCanvasCursorY;
  };

  const brushTexture = new Image();
  brushTexture.src = "/textures/glow.png";

  useFrame(() => {
    if (!canvasInfo.current.context || !canvasInfo.current.canvas) return;

    canvasInfo.current.context.globalCompositeOperation = "source-over";
    canvasInfo.current.context.globalAlpha = 0.02;
    canvasInfo.current.context.fillRect(
      0,
      0,
      canvasInfo.current.canvas.width,
      canvasInfo.current.canvas.height
    );

    // Speed alpha
    const cursorDistance = canvasInfo.current.canvasCursorPrevious.distanceTo(
      canvasInfo.current.canvasCursor
    );
    canvasInfo.current.canvasCursorPrevious.copy(canvasInfo.current.canvasCursor);
    const alpha = Math.min(cursorDistance * 0.1, 1);

    const glowSize = canvasInfo.current.canvas.width * 0.25;
    canvasInfo.current.context.globalCompositeOperation = "lighten";
    canvasInfo.current.context.globalAlpha = alpha;
    canvasInfo.current.context.drawImage(
      brushTexture,
      canvasInfo.current.canvasCursor.x - glowSize * 0.5,
      canvasInfo.current.canvasCursor.y - glowSize * 0.5,
      glowSize,
      glowSize
    );

    canvasInfo.current.displacementTexture.needsUpdate = true;
  });

  return (
    <>
      <Center>
        <points geometry={particlesGeometry}>
          <particlesMaterial ref={materialRef} />
        </points>
        <mesh onPointerMove={drawOnMove} visible={false}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial />
        </mesh>
      </Center>
    </>
  );
}
