// import { shaderMaterial, Center, useTexture } from "@react-three/drei";
// import * as THREE from "three";

// import { useEffect, useRef } from "react";

// import { extend, useFrame } from "@react-three/fiber";

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

// ///
// const ParticlesMaterial = shaderMaterial(
//   {
//     uResolution: new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio),
//     uPictureTexture: null,
//     uDisplacementTexture: null,
//   },
//   vertexShader,
//   fragmentShader
// );

// extend({ ParticlesMaterial: ParticlesMaterial });

// export default function Exp({ image }) {
//   const materialRef = useRef();
//   //store all the canvas information in an object that will persist across renderings
//   const canvasInfo = useRef({
//     canvas: null,
//     context: null,
//     // canvasCursorX: 0,
//     // canvasCursorY: 0,
//     canvasCursorX: 9999,
//     canvasCursorY: 9999,
//     displacementTexture: null,

//     canvasCursorPreviousX: 9999,
//     canvasCursorPreviousY: 9999,
//   });

//   const pictureTexture = useTexture(image);

//   /**
//    * 2D CANVAS -> CANVAS TEXTURE
//    */
//   useEffect(() => {
//     // Create the 2D canvas
//     const newCanvas = document.createElement("canvas");
//     newCanvas.width = 128;
//     newCanvas.height = 128;

//     // Style the canvas
//     newCanvas.style.position = "fixed";
//     newCanvas.style.width = "256px";
//     newCanvas.style.height = "256px";
//     newCanvas.style.top = "0";
//     newCanvas.style.right = "0";
//     newCanvas.style.zIndex = 1000;

//     // Add the canvas to the DOM
//     document.body.append(newCanvas);

//     // Initialize canvas with black background and blend mode
//     const canvasContext = newCanvas.getContext("2d");
//     canvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

//     canvasInfo.current.canvas = newCanvas;
//     canvasInfo.current.context = canvasContext;

//     // create the displacement texture that it is sent to the shader
//     canvasInfo.current.displacementTexture = new THREE.CanvasTexture(canvasInfo.current.canvas);

//    ("texture when created", canvasInfo.current.displacementTexture);
//     materialRef.current.uniforms.uDisplacementTexture.value =
//       canvasInfo.current.displacementTexture;
//     return () => {
//       // remove the canvas from the DOM
//       document.body.removeChild(newCanvas);
//     };
//   }, []);

//   //the function below extracts the cursor coordinates
//   const drawOnMove = function (e) {
//     // Ensure canvas and context are available
//     if (!canvasInfo.current.canvas || !canvasInfo.current.context) return;

//     //calculate the canvas coordoninates from onPointerMove function
//     const uv = e.intersections[0].uv;
//     const newCanvasCursorX = uv.x * canvasInfo.current.canvas.width;
//     const newCanvasCursorY = (1 - uv.y) * canvasInfo.current.canvas.height;

//     //save the canvas cursor position inside the canvas Info ref object
//     canvasInfo.current.canvasCursorX = newCanvasCursorX;
//     canvasInfo.current.canvasCursorY = newCanvasCursorY;
//   };

//   const brushTexture = new Image();
//   brushTexture.src = "/textures/glow.png";

//   useFrame(() => {
//     // Check if context and canvas are available
//     if (!canvasInfo.current.context || !canvasInfo.current.canvas) return;

//     //displacement
//     canvasInfo.current.context.globalCompositeOperation = "source-over";
//     canvasInfo.current.context.globalAlpha = 0.02;
//     canvasInfo.current.context.fillRect(
//       0,
//       0,
//       canvasInfo.current.canvas.width,
//       canvasInfo.current.canvas.height
//     );

//     // Speed alpha
//     const cursorDistance = new THREE.Vector2(
//       canvasInfo.current.canvasCursorPreviousX,
//       canvasInfo.current.canvasCursorPreviousY
//     ).distanceTo(
//       new THREE.Vector2(canvasInfo.current.canvasCursorX, canvasInfo.current.canvasCursorY)
//     );
//     new THREE.Vector2(
//       canvasInfo.current.canvasCursorPreviousX,
//       canvasInfo.current.canvasCursorPreviousY
//     ).copy(new THREE.Vector2(canvasInfo.current.canvasCursorX, canvasInfo.current.canvasCursorY));
//     const alpha = Math.min(cursorDistance * 0.1, 1);

//     //draw glow
//     const glowSize = canvasInfo.current.canvas.width * 0.25;
//     canvasInfo.current.context.globalCompositeOperation = "lighten";
//     canvasInfo.current.context.globalAlpha = alpha;
//     canvasInfo.current.context.drawImage(
//       brushTexture,
//       canvasInfo.current.canvasCursorX - glowSize * 0.5,
//       canvasInfo.current.canvasCursorY - glowSize * 0.5,
//       glowSize,
//       glowSize
//     );

//     // update the canvas texture that it is sent to the shader
//     canvasInfo.current.displacementTexture.needsUpdate = true;
//   });

//   return (
//     <>
//       {/* <CameraControls /> */}
//       <ambientLight intensity={1} color={"#babad1"} />
//       <Center>
//         <points geometry={particlesGeometry}>
//           <particlesMaterial
//             ref={materialRef}
//             uPictureTexture={pictureTexture}
//             uDisplacementTexture={canvasInfo.current.displacementTexture}
//             blending={THREE.AdditiveBlending}
//           />
//         </points>

//         <mesh onPointerMove={drawOnMove}>
//           <planeGeometry args={[10, 10]} />
//           <meshBasicMaterial wireframe={true} />
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

export default function Exp({ image }) {
  const materialRef = useRef();
  const canvasInfo = useRef({
    canvas: null,
    context: null,
    canvasCursorX: 0,
    canvasCursorY: 0,
    displacementTexture: null,
    // canvasCursorPreviousX: 9999,
    // canvasCursorPreviousY: 9999,
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

    return () => {
      document.body.removeChild(newCanvas);
    };
  }, [pictureTexture]);

  const drawOnMove = (e) => {
    if (!canvasInfo.current.canvas || !canvasInfo.current.context) return;
    const uv = e.intersections[0].uv;
    const newCanvasCursorX = uv.x * canvasInfo.current.canvas.width;
    const newCanvasCursorY = (1 - uv.y) * canvasInfo.current.canvas.height;
    canvasInfo.current.canvasCursorX = newCanvasCursorX;
    canvasInfo.current.canvasCursorY = newCanvasCursorY;
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

    const glowSize = canvasInfo.current.canvas.width * 0.25;
    canvasInfo.current.context.globalCompositeOperation = "lighten";
    canvasInfo.current.context.globalAlpha = 1;
    canvasInfo.current.context.drawImage(
      brushTexture,
      canvasInfo.current.canvasCursorX - glowSize * 0.5,
      canvasInfo.current.canvasCursorY - glowSize * 0.5,
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
