import { Plane, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { easing, geometry } from "maath";
import { useRef, useState } from "react";

export default function FadingImageDisplacement({ image1, image2, image3 }) {
  const ref = useRef(null);
  const [hovered, setHover] = useState(false);
  const [texture1, texture2, dispTexture] = useTexture([image1, image2, image3]);
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);

  useFrame((_, delta) => {
    easing.damp(ref.current, "dispFactor", hovered ? 1 : 0, 0.4, delta);
  });

  //   useGSAP(() => {
  //     const opacify = document.getElementsByClassName("opacify");
  //     const timeline = gsap.timeline({
  //       onComplete: () => {
  //         gsap.to(camera.position, {
  //           z: "+=2",
  //           duration: 0.5,
  //           ease: "linear",
  //         });
  //         gsap.to(ref.current.uniforms.dispFactor, {
  //           value: 0,
  //           duration: 1,
  //           ease: "linear",
  //         });
  //         dispatch(updateIntroCompleted());
  //       },
  //       yoyo: true,
  //     });
  //     timeline
  //       .to(
  //         camera.position,
  //         {
  //           z: "-=2",
  //           duration: 8,
  //           ease: "linear",
  //         },
  //         "same"
  //       )
  //       .to(
  //         ref.current.uniforms.dispFactor,
  //         {
  //           value: 1,
  //           duration: 1,
  //           ease: "linear",
  //         },
  //         "-=4" // Start this animation 2.5 seconds into the previous animation
  //       )
  //       .to(
  //         opacify,
  //         {
  //           opacity: 0.6,
  //           duration: 5,
  //           ease: "linear",
  //         },
  //         "same"
  //       );
  //     return () => {
  //       timeline.kill(); // Clean up to prevent memory leaks if component unmounts
  //     };
  //   }, []);

  const ImageFadeMaterialDisplacement = shaderMaterial(
    {
      effectFactor: 1.2,
      dispFactor: 0,
      tex: texture1,
      tex2: texture2,
      disp: dispTexture,
      toneMapped: false,
    },
    /*glsl*/ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
    /*glsl*/ ` 
      varying vec2 vUv;
      uniform sampler2D tex;
      uniform sampler2D tex2;
      uniform sampler2D disp;
      uniform float _rot;
      uniform float dispFactor;
      uniform float effectFactor;
      void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
        vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
        vec4 _texture = texture2D(tex, distortedPosition);
        vec4 _texture2 = texture2D(tex2, distortedPosition2);
        vec4 finalTexture = mix(_texture, _texture2, dispFactor);
        gl_FragColor = finalTexture;
        #include <tonemapping_fragment>
      }`
  );

  extend({ ImageFadeMaterialDisplacement, RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });
  // Calculate the width and height for the 9:16 aspect ratio
  const isLargeScreen = size.width > 1024; // Adjust breakpoint as needed
  const isMdScreen = size.width >= 768 && size.width <= 1024;
  const aspectRatio = isLargeScreen ? 13 / 16 : 12 / 16;
  const height = viewport.height;
  const width = height * aspectRatio;
  return (
    <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <roundedPlaneGeometry
        args={[width, height]} // 9:16 aspect ratio
      />
      <imageFadeMaterialDisplacement ref={ref} />
    </mesh>
  );
}
