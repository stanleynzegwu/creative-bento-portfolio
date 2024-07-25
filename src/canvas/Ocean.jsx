// import { useRef, useEffect, Suspense } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// import { Water } from "three/examples/jsm/objects/Water.js";
// import { Sky } from "three/examples/jsm/objects/Sky.js";
// import { OrbitControls, Preload, Loader, useTexture, Sphere } from "@react-three/drei";
// import InfoOverlay from "@/components/InfoOverlay";

// const Oceann = () => {
//   const waterRef = useRef();
//   const meshRef = useRef();
//   const sphereRef = useRef();
//   const waterNormalTexture = useTexture("/textures/waternormals.jpg");
//   waterNormalTexture.wrapS = THREE.RepeatWrapping;
//   waterNormalTexture.wrapT = THREE.RepeatWrapping;

//   const ballTexture = useTexture("/images/Portfolio.png");
//   ballTexture.wrapS = THREE.RepeatWrapping;
//   ballTexture.wrapT = THREE.RepeatWrapping;
//   const { scene, gl, camera } = useThree();
//   const sun = new THREE.Vector3();
//   const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
//   /**BOX */
//   const boxGeometry = new THREE.BoxGeometry(30, 30, 30);
//   const boxMaterial = new THREE.MeshStandardMaterial({ roughness: 0 });
//   /**Sphere */

//   useEffect(() => {
//     const water = new Water(waterGeometry, {
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals: waterNormalTexture,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xffffff,
//       //   waterColor: 0x001e0f,
//       waterColor: 0x000f06,
//       distortionScale: 3.7,
//       fog: scene.fog !== undefined,
//     });

//     water.rotation.x = -Math.PI / 2;
//     waterRef.current = water;
//     scene.add(water);

//     const sky = new Sky();
//     sky.scale.setScalar(10000);
//     scene.add(sky);

//     const skyUniforms = sky.material.uniforms;
//     skyUniforms["turbidity"].value = 10;
//     skyUniforms["rayleigh"].value = 2;
//     skyUniforms["mieCoefficient"].value = 0.005;
//     skyUniforms["mieDirectionalG"].value = 0.8;

//     const parameters = {
//       elevation: 38,
//       azimuth: 64,
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

//     // const gui = new GUI();
//     // const folderSky = gui.addFolder("Sky");
//     // folderSky.add(parameters, "elevation", 0, 90, 0.1).onChange(updateSun);
//     // folderSky.add(parameters, "azimuth", -180, 180, 0.1).onChange(updateSun);
//     // folderSky.open();

//     const waterUniforms = water.material.uniforms;
//     // const folderWater = gui.addFolder("Water");
//     // folderWater.add(waterUniforms.distortionScale, "value", 0, 8, 0.1).name("distortionScale");
//     // folderWater.add(waterUniforms.size, "value", 0.1, 10, 0.1).name("size");
//     // folderWater.open();

//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       gl.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       //   gui.destroy();
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [scene, gl, camera]);

//   useFrame((state) => {
//     const time = performance.now() * 0.001;
//     // if (meshRef.current && waterRef.current) {
//     //   meshRef.current.position.y = Math.sin(time) * 20 + 5;
//     //   meshRef.current.rotation.x = time * 0.5;
//     //   meshRef.current.rotation.z = time * 0.51;
//     //   waterRef.current.material.uniforms["time"].value += 1.0 / 60.0;
//     // }
//     if (sphereRef.current && waterRef.current) {
//       sphereRef.current.position.y = Math.sin(time * 0.5) * 4 + 5;
//       sphereRef.current.rotation.x = time * 0.5;
//       sphereRef.current.rotation.z = time * 0.51;
//       waterRef.current.material.uniforms["time"].value += 1.0 / 60.0;
//     }
//   });

//   return (
//     <>
//       {/* <mesh geometry={boxGeometry} material={boxMaterial} ref={meshRef} /> */}
//       <Sphere ref={sphereRef} args={[15, 32, 16]}>
//         <meshStandardMaterial color="#ffffff" map={ballTexture} />
//         <InfoOverlay />
//       </Sphere>
//     </>
//   );
// };

// const OceannExperience = () => {
//   return (
//     <Canvas
//       camera={{ fov: 55, near: 1, far: 20000, position: [30, 30, 100] }}
//       className="cursor-grab"
//     >
//       <OrbitControls
//         enableZoom={false}
//         target={[0, 10, 0]}
//         maxPolarAngle={Math.PI * 0.495}
//         minPolarAngle={Math.PI / 2}
//         minDistance={40.0}
//         maxDistance={200.0}
//       />
//       {/* <Suspense fallback={<Loader />}> */}
//       <Oceann />
//       <Preload all />
//       {/* </Suspense> */}
//     </Canvas>
//   );
// };

// export default OceannExperience;

///////////////////////////////////////////////
///////////////////////////////////////////

// import { useRef, useEffect, Suspense, useState } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// import { Water } from "three/examples/jsm/objects/Water.js";
// import { Sky } from "three/examples/jsm/objects/Sky.js";
// import { OrbitControls, Preload, Loader, useTexture, Sphere } from "@react-three/drei";
// import InfoOverlay from "@/components/InfoOverlay";
// import { DissolveExperience } from "./DissolveExperience";
// import { gsap, Power2 } from "gsap";
// import { Bloom, EffectComposer } from "@react-three/postprocessing";
// import { useGSAP } from "@gsap/react";
// import CameraRig from "./CameraRig";

// const Oceann = () => {
//   const [visibleItem, setVisibleItem] = useState("sphere");
//   const waterRef = useRef();
//   const controlsRef = useRef();
//   const waterNormalTexture = useTexture("/textures/waternormals.jpg");
//   waterNormalTexture.wrapS = THREE.RepeatWrapping;
//   waterNormalTexture.wrapT = THREE.RepeatWrapping;

//   const ballTexture = useTexture("/images/Portfolio.png");
//   ballTexture.wrapS = THREE.RepeatWrapping;
//   ballTexture.wrapT = THREE.RepeatWrapping;
//   const { scene, gl, camera, controls } = useThree();
//   const sun = new THREE.Vector3();
//   const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
//   /**Sphere */

//   useEffect(() => {
//     const water = new Water(waterGeometry, {
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals: waterNormalTexture,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xffffff,
//       waterColor: 0x001e0f,
//       //   waterColor: 0x000f06,
//       distortionScale: 3.7,
//       fog: scene.fog !== undefined,
//     });

//     water.rotation.x = -Math.PI / 2;
//     waterRef.current = water;
//     scene.add(water);

//     const sky = new Sky();
//     sky.scale.setScalar(10000);
//     scene.add(sky);

//     const skyUniforms = sky.material.uniforms;
//     skyUniforms["turbidity"].value = 10;
//     skyUniforms["rayleigh"].value = 2;
//     skyUniforms["mieCoefficient"].value = 0.005;
//     skyUniforms["mieDirectionalG"].value = 0.8;

//     const parameters = {
//       elevation: 38,
//       azimuth: 64,
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

//     const waterUniforms = water.material.uniforms;

//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       gl.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       //   gui.destroy();
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [scene, gl, camera]);

//   //////////////////

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

//   // const gui = new GUI();
//   // const cameraFolder = gui.addFolder("camera");
//   // cameraFolder.add(camera.position, "x", -300, 300, 0.1).name("cameraposX");
//   // cameraFolder.add(camera.position, "y", -300, 300, 0.1).name("cameraposY");
//   // cameraFolder.add(camera.position, "z", -300, 300, 0.1).name("cameraposZ");
//   // cameraFolder.add(camera.rotation, "x", -Math.PI * 2, Math.PI * 2, 0.1).name("camerarotX");
//   // cameraFolder.add(camera.rotation, "y", Math.PI * 2, Math.PI * 2, 0.1).name("camerarotY");
//   // cameraFolder.add(camera.rotation, "z", Math.PI * 2, Math.PI * 2, 0.1).name("camerarotZ");
//   // cameraFolder.open();

//   useFrame((state) => {
//     const time = performance.now() * 0.001;
//     if (waterRef.current) {
//       //   sphereRef.current.position.y = Math.sin(time * 0.5) * 4 + 5;
//       //   sphereRef.current.rotation.x = time * 0.5;
//       //   sphereRef.current.rotation.z = time * 0.51;
//       waterRef.current.material.uniforms["time"].value += 1.0 / 60.0;
//     }
//   });

//   return (
//     <>
//       <OrbitControls
//         ref={controlsRef}
//         makeDefault
//         enableZoom={false}
//         enablePan={false}
//         enableRotate={false}
//         target={[0, 10, 0]}
//         // maxPolarAngle={Math.PI * 0.495}
//         // minPolarAngle={Math.PI / 2}
//         // minDistance={40.0}
//         // maxDistance={200.0}
//       />
//       <DissolveExperience visibleItem={visibleItem} setVisibleItem={setVisibleItem} />
//       <InfoOverlay setVisibleItem={setVisibleItem} />
//     </>
//   );
// };

// const OceannExperience = () => {
//   return (
//     <Canvas
//       // camera={{ fov: 55, near: 1, far: 20000, position: [30, 30, 100] }}
//       camera={{ fov: 55, near: 1, far: 20000, position: [100, 2300, 2000] }}
//       className="cursor-grab"
//     >
//       {/* <Suspense fallback={<Loader />}> */}
//       <CameraRig>
//         <Oceann />
//       </CameraRig>
//       {/* <EffectComposer>
//         <Bloom luminanceThreshold={1} intensity={0.3} mipmapBlur />
//       </EffectComposer> */}
//       <Preload all />
//       {/* </Suspense> */}
//     </Canvas>
//   );
// };

// export default OceannExperience;

////////////////////////

import { useRef, useEffect, useState } from "react";
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { useTexture, OrbitControls, Preload } from "@react-three/drei";
import { gsap, Power2 } from "gsap";
import { useGSAP } from "@gsap/react";
import { DissolveExperience } from "./DissolveExperience";
import InfoOverlay from "@/components/InfoOverlay";
import CameraRig from "./CameraRig";

const Ocean = () => {
  const [visibleItem, setVisibleItem] = useState("sphere");
  const waterRef = useRef();
  const sceneRef = useRef(); // New group ref for the entire scene
  const waterNormalTexture = useTexture("/textures/waternormals.jpg");
  waterNormalTexture.wrapS = THREE.RepeatWrapping;
  waterNormalTexture.wrapT = THREE.RepeatWrapping;
  const ballTexture = useTexture("/images/Portfolio.png");
  ballTexture.wrapS = THREE.RepeatWrapping;
  ballTexture.wrapT = THREE.RepeatWrapping;
  const { scene, gl, camera } = useThree();
  const sun = new THREE.Vector3();
  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

  useEffect(() => {
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormalTexture,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      // sunColor: 0x4682b4,
      // waterColor: 0xffffff,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });

    water.rotation.x = -Math.PI / 2;
    waterRef.current = water;
    sceneRef.current.add(water); // Add water to the group

    const sky = new Sky();
    sky.scale.setScalar(10000);
    sceneRef.current.add(sky); // Add sky to the group

    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.8;

    // const parameters = {
    //   elevation: 30,
    //   azimuth: 64,
    // };
    const parameters = {
      elevation: 20,
      azimuth: 70,
    };

    const pmremGenerator = new THREE.PMREMGenerator(gl);
    let renderTarget;

    const updateSun = () => {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);
      sky.material.uniforms["sunPosition"].value.copy(sun);
      water.material.uniforms["sunDirection"].value.copy(sun).normalize();

      if (renderTarget !== undefined) renderTarget.dispose();
      renderTarget = pmremGenerator.fromScene(sky);
      scene.environment = renderTarget.texture;
    };

    updateSun();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      gl.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scene, gl, camera]);

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

  useFrame((state) => {
    const time = performance.now() * 0.001;
    if (waterRef.current) {
      waterRef.current.material.uniforms["time"].value += 1.0 / 60.0;
    }
  });

  return (
    <group ref={sceneRef}>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={[0, 10, 0]}
      />
      <DissolveExperience visibleItem={visibleItem} setVisibleItem={setVisibleItem} />
      <InfoOverlay setVisibleItem={setVisibleItem} />
    </group>
  );
};

const OceanExperience = () => {
  return (
    <Canvas camera={{ fov: 55, near: 1, far: 20000, position: [-50, 2300, 2000] }}>
      <CameraRig>
        <Ocean />
      </CameraRig>
      <Preload all />
    </Canvas>
  );
};

export default OceanExperience;
