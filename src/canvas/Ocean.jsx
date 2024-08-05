// import { useRef, useEffect, useState } from "react";
// import { useThree, useFrame, Canvas } from "@react-three/fiber";
// import * as THREE from "three";
// import { Water } from "three/examples/jsm/objects/Water.js";
// import { Sky } from "three/examples/jsm/objects/Sky.js";
// import { useTexture, OrbitControls, Preload } from "@react-three/drei";
// import { gsap, Power2 } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { DissolveExperience } from "./DissolveExperience";
// import InfoOverlay from "@/components/InfoOverlay";
// import CameraRig from "./CameraRig";

// const Ocean = () => {
//   const [visibleItem, setVisibleItem] = useState("sphere");
//   const waterRef = useRef();
//   const sceneRef = useRef();
//   const waterNormalTexture = useTexture("/textures/waternormals.jpg");
//   waterNormalTexture.wrapS = THREE.RepeatWrapping;
//   waterNormalTexture.wrapT = THREE.RepeatWrapping;
//   const ballTexture = useTexture("/images/Portfolio.png");
//   ballTexture.wrapS = THREE.RepeatWrapping;
//   ballTexture.wrapT = THREE.RepeatWrapping;
//   const { scene, gl, camera } = useThree();
//   const sun = new THREE.Vector3();
//   const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

//   useEffect(() => {
//     const water = new Water(waterGeometry, {
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals: waterNormalTexture,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xffffff,
//       waterColor: 0x001e0f,
//       distortionScale: 3.7,
//       fog: scene.fog !== undefined,
//     });

//     water.rotation.x = -Math.PI / 2;
//     waterRef.current = water;
//     sceneRef.current.add(water);

//     const sky = new Sky();
//     sky.scale.setScalar(10000);
//     sceneRef.current.add(sky);

//     const skyUniforms = sky.material.uniforms;
//     skyUniforms["turbidity"].value = 10;
//     skyUniforms["rayleigh"].value = 2;
//     skyUniforms["mieCoefficient"].value = 0.005;
//     skyUniforms["mieDirectionalG"].value = 0.8;

//     const parameters = {
//       elevation: 20,
//       azimuth: 70,
//     };

//     const pmremGenerator = new THREE.PMREMGenerator(gl);
//     let renderTarget;

//     const updateSun = () => {
//       const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
//       const theta = THREE.MathUtils.degToRad(parameters.azimuth);

//       sun.setFromSphericalCoords(1, phi, theta);
//       sky.material.uniforms["sunPosition"].value.copy(sun);
//       water.material.uniforms["sunDirection"].value.copy(sun).normalize();

//       if (renderTarget !== undefined) renderTarget.dispose();
//       renderTarget = pmremGenerator.fromScene(sky);
//       scene.environment = renderTarget.texture;
//     };

//     updateSun();

//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       gl.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [scene, gl, camera]);

//   useGSAP(() => {
//     if (camera) {
//       const timeline = gsap.timeline();
//       timeline.to(camera.position, {
//         x: 0,
//         y: 15,
//         z: 100,
//         ease: Power2.easeInOut,
//         duration: 3.2,
//         onComplete: () => {
//           const overlay = document.querySelector(".overlay");
//           overlay.style.display = "flex";
//           gsap.to(overlay, {
//             opacity: 1,
//             duration: 1,
//           });
//         },
//       });
//     }
//   }, []);

//   useFrame((state) => {
//     const time = performance.now() * 0.001;
//     if (waterRef.current) {
//       waterRef.current.material.uniforms["time"].value += 1.0 / 60.0;
//     }
//   });

//   return (
//     <group ref={sceneRef}>
//       <OrbitControls
//         makeDefault
//         enableZoom={false}
//         enablePan={false}
//         enableRotate={false}
//         target={[0, 10, 0]}
//       />
//       <DissolveExperience visibleItem={visibleItem} setVisibleItem={setVisibleItem} />
//       <InfoOverlay visibleItem={visibleItem} setVisibleItem={setVisibleItem} />
//     </group>
//   );
// };

// const OceanExperience = () => {
//   return (
//     <Canvas camera={{ fov: 55, near: 1, far: 20000, position: [-50, 2300, 2000] }} className="">
//       <CameraRig>
//         <Ocean />
//       </CameraRig>
//       <Preload all />
//     </Canvas>
//   );
// };

// export default OceanExperience;

/////////////////////////////
import { useRef, useState, useMemo } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Water } from "three-stdlib";
import { OrbitControls, Sky, useTexture, Preload } from "@react-three/drei";
import { gsap, Power2 } from "gsap";
import { useGSAP } from "@gsap/react";
import { DissolveExperience } from "./DissolveExperience";
import InfoOverlay from "@/components/InfoOverlay";
import CameraRig from "./CameraRig";

extend({ Water });

function Ocean() {
  const [visibleItem, setVisibleItem] = useState(null);
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const waterNormals = useTexture("/textures/waternormals.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );

  useGSAP(() => {
    if (camera) {
      const timeline = gsap.timeline();
      timeline.to(camera.position, {
        x: 0,
        y: 15,
        z: 100,
        ease: Power2.easeInOut,
        duration: 3.2,
        onComplete: () => {
          const overlay = document.querySelector(".overlay");
          overlay.style.display = "flex";
          gsap.to(overlay, {
            opacity: 1,
            duration: 1,
          });
        },
      });
    }
  }, []);

  useFrame((_, delta) => (ref.current.material.uniforms.time.value += delta));
  return (
    <>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={[0, 10, 0]}
      />
      <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
      <DissolveExperience visibleItem={visibleItem} setVisibleItem={setVisibleItem} />
      <InfoOverlay visibleItem={visibleItem} setVisibleItem={setVisibleItem} />
    </>
  );
}

export default function OceanExperience() {
  return (
    <Canvas camera={{ fov: 55, near: 1, far: 20000, position: [-50, 2300, 2000] }}>
      <CameraRig>
        <pointLight position={[100, 100, 100]} />
        <pointLight position={[-100, -100, -100]} />

        <Ocean />
        <Sky
          scale={10000}
          sunPosition={[500, 150, -1000]}
          turbidity={0.1}
          mieCoefficient={0.005}
          rayleigh={1.5}
          mieDirectionalG={0.8}
        />
      </CameraRig>
      <Preload all />
    </Canvas>
  );
}
