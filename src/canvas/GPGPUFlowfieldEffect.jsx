import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import GUI from "lil-gui"; // Ensure lil-gui is available in your project

import vertexShader from "../shaders/GPGPUFlowfieldShader/vertex.glsl";
import fragmentShader from "../shaders/GPGPUFlowfieldShader/fragment.glsl";

import gpgpuParticlesShader from "../shaders/gpgpu/particles.glsl";

import { Center, OrbitControls, Preload, shaderMaterial, Text, useGLTF } from "@react-three/drei";
import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

const GpgpuflowfieldMaterial = shaderMaterial(
  {
    uSize: 0.05,
    uResolution: new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio),
    uParticlesTexture: new THREE.Uniform(),
  },
  vertexShader,
  fragmentShader
);

extend({ GpgpuflowfieldMaterial });

const GPGPUFlowfieldEffect = ({ model }) => {
  const materialRef = useRef();
  const particlesRef = useRef();
  const renderer = useThree((state) => state.gl);
  // Effects on resize
  useEffect(() => {
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

      // Update materials or elements that depend on sizes
      materialRef.current.uniforms.uResolution.value.set(
        sizes.width * sizes.pixelRatio,
        sizes.height * sizes.pixelRatio
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sizes]);

  /**
   * Load model
   */
  // const mod = useGLTF("/models/clientModel4.glb");

  const gltf = useGLTF(model);
  // console.log(mod.scene.children[0].geometry.attributes);
  // console.log(gltf.scene.children[0].geometry.attributes);

  /**
   * Base geometry
   */
  const baseGeometry = {};
  //   baseGeometry.instance = new THREE.SphereGeometry(3);
  baseGeometry.instance = gltf.scene.children[0].geometry;
  baseGeometry.count = baseGeometry.instance.attributes.position.count;

  /**GPU Compute   **/
  // Setup
  const gpgpu = {};
  gpgpu.size = Math.ceil(Math.sqrt(baseGeometry.count));
  gpgpu.computation = new GPUComputationRenderer(gpgpu.size, gpgpu.size, renderer);
  // Base particles
  const baseParticlesTexture = gpgpu.computation.createTexture();
  for (let i = 0; i < baseGeometry.count; i++) {
    const i3 = i * 3;
    const i4 = i * 4;

    // Position based on geometry
    baseParticlesTexture.image.data[i4 + 0] =
      baseGeometry.instance.attributes.position.array[i3 + 0];
    baseParticlesTexture.image.data[i4 + 1] =
      baseGeometry.instance.attributes.position.array[i3 + 1];
    baseParticlesTexture.image.data[i4 + 2] =
      baseGeometry.instance.attributes.position.array[i3 + 2];
    baseParticlesTexture.image.data[i4 + 3] = Math.random();
  }

  // Particles variable
  gpgpu.particlesVariable = gpgpu.computation.addVariable(
    "uParticles",
    gpgpuParticlesShader,
    baseParticlesTexture
  );
  gpgpu.computation.setVariableDependencies(gpgpu.particlesVariable, [gpgpu.particlesVariable]);

  // Uniforms
  gpgpu.particlesVariable.material.uniforms.uTime = new THREE.Uniform(0);
  gpgpu.particlesVariable.material.uniforms.uBase = new THREE.Uniform(baseParticlesTexture);
  gpgpu.particlesVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0);
  gpgpu.particlesVariable.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(0.5);
  gpgpu.particlesVariable.material.uniforms.uFlowFieldStrength = new THREE.Uniform(2);
  gpgpu.particlesVariable.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(0.5);
  // Init
  gpgpu.computation.init();
  // Debug
  const gpgpu_Debug_Ref = useRef();

  /**
   * Particles
   */
  // Geometry
  const particlesUvArray = new Float32Array(baseGeometry.count * 2);
  const sizesArray = new Float32Array(baseGeometry.count);
  for (let y = 0; y < gpgpu.size; y++) {
    for (let x = 0; x < gpgpu.size; x++) {
      const i = y * gpgpu.size + x;
      const i2 = i * 2;

      // Particles UV
      const uvX = (x + 0.5) / gpgpu.size;
      const uvY = (y + 0.5) / gpgpu.size;

      particlesUvArray[i2 + 0] = uvX;
      particlesUvArray[i2 + 1] = uvY;

      // Size
      sizesArray[i] = Math.random();
    }
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setDrawRange(0, baseGeometry.count);
  particlesGeometry.setAttribute("aParticlesUv", new THREE.BufferAttribute(particlesUvArray, 2));
  particlesGeometry.setAttribute("aColor", baseGeometry.instance.attributes.color);
  particlesGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizesArray, 1));

  useFrame(({ clock }, deltaTime) => {
    const elapsedTime = clock.getElapsedTime();
    // GPGPU Update
    gpgpu.particlesVariable.material.uniforms.uTime.value = elapsedTime;
    gpgpu.particlesVariable.material.uniforms.uDeltaTime.value = deltaTime;
    gpgpu.computation.compute();
    materialRef.current.uniforms.uParticlesTexture.value = gpgpu.computation.getCurrentRenderTarget(
      gpgpu.particlesVariable
    ).texture;
  });
  return (
    <>
      {/* gpgpu debug */}
      <mesh
        visible={false}
        ref={gpgpu_Debug_Ref}
        position-x={3}
        geometry={new THREE.PlaneGeometry(3, 3)}
        material={
          new THREE.MeshBasicMaterial({
            map: gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture,
          })
        }
      />

      <points ref={particlesRef} geometry={particlesGeometry}>
        <gpgpuflowfieldMaterial ref={materialRef} />
      </points>
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 3} // Minimum elevation angle (looking downwards)
        maxPolarAngle={Math.PI - Math.PI / 2} // Maximum elevation angle (looking upwards)
      />
    </>
  );
};

const GPGPUExperience = ({ model, position }) => {
  return (
    <Canvas camera={{ fov: 40, near: 0.1, far: 200, position }}>
      <color attach="background" args={["#222222"]} />
      <Suspense
        fallback={
          <Text color="black" anchorX="center" anchorY="middle">
            Loading...
          </Text>
        }
      >
        <GPGPUFlowfieldEffect model={model} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default GPGPUExperience;
