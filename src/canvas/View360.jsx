import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  Image,
  MeshReflectorMaterial,
  Environment,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import CameraRig from "./CameraRig";
import "../utils";
import useStore from "@/store/useStore";
import { ABOUT_CONTENTS } from "@/constants";

const View360 = ({ data }) => {
  const currentContent = useStore((state) => state.current_About_Content);
  const cylinderRef = useRef();

  return (
    <group>
      {/* Main Cylinder */}
      <mesh ref={cylinderRef}>
        <cylinderGeometry args={[13, 13, 22, 32, 1, true]} />
        <meshStandardMaterial color="black" side={THREE.BackSide} />
      </mesh>
      {/* Mapped contents */}
      {/* <Carousel radius={12} data={data} /> */}
      <Carousel radius={12} data={ABOUT_CONTENTS[currentContent]} />
      {/* White rounded floor Light */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-10}>
        <torusGeometry args={[13, 0.3, 40, 60]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-10}>
        <planeGeometry args={[25, 25]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={0.5}
          mixStrength={80}
          roughness={0.5}
          depthScale={0.5}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          // color="#ffffff"
          metalness={1}
        />
      </mesh>
      <Banner
        image={
          currentContent
            ? `/textures/${currentContent.toUpperCase()}.png`
            : "/textures/EDUCATION.png"
        }
        position={[0, 8, 0]}
        height={3}
        posX={-0.6}
        width={1.3}
      />
      <Banner
        image={
          currentContent === "about"
            ? `/textures/kim.png`
            : currentContent === "skills"
            ? "/textures/skills_quote.png"
            : "/textures/interest_quote1.png"
        }
        position={[0, -8, 0]}
        height={2}
        posX={-0.35}
        width={0.7}
        visible={
          currentContent === "about" ||
          currentContent === "interests" ||
          currentContent === "skills"
        }
      />
    </group>
  );
};

const View360Experience = () => {
  const isControlsEnabled = useStore((state) => state.isControlsEnabled);
  const data = [
    { name: "Item 1", image: "/images/dispImage2.jpg" },
    {
      name: "Item 2",
      image:
        "https://images.unsplash.com/photo-1721626782208-ecfdc6625fc0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { name: "Item 3", image: "/images/dispImage1.jpg" },
    {
      name: "Item 4",
      image:
        "https://images.unsplash.com/photo-1721778775422-8cf9894040a9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Item 5",
      image:
        "https://images.unsplash.com/photo-1721905126607-6700881aaa95?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Item 6",
      image:
        "https://images.unsplash.com/photo-1721743141802-f01a0437c19b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { name: "Item 7", image: "/textures/kim.png" },
    // { name: "Item 8", image: "/images/dispImage1.jpg" },
    // { name: "Item 9", image: "/images/dispImage1.jpg" },
    // { name: "Item 10", image: "/images/dispImage1.jpg" },
    // { name: "Item 7", image: "/images/dispImage1.jpg" },
    // { name: "Item 8", image: "/images/dispImage1.jpg" },
    // { name: "Item 9", image: "/images/dispImage1.jpg" },
    // { name: "Item 10", image: "/images/dispImage1.jpg" },
  ];

  return (
    <Canvas camera={{ fov: 55, near: 1, far: 20000, position: [0, 0, -17] }}>
      <ambientLight intensity={0.5} />
      <color attach="background" args={["#0f0f0f"]} />
      <OrbitControls
        enableZoom={false}
        enabled={isControlsEnabled}
        enableDamping={true}
        maxPolarAngle={Math.PI * 0.495}
        minPolarAngle={Math.PI / 2}
      />
      <CameraRig axisXDivisor={12}>
        <View360 data={data} />
      </CameraRig>
      <Environment preset="city" />
    </Canvas>
  );
};

export default View360Experience;

// function Carousel({ radius, data }) {
//   // Calculate the width and height dynamically based on the number of items
//   const numberOfItems = data.length;
//   const circumference = Math.PI * 2 * radius; // Circumference of the cylinder
//   const gapSize = 0.2; // Desired gap size between items
//   const totalGapSize = gapSize * numberOfItems; // Total gap size around the cylinder
//   const availableSpace = circumference - totalGapSize; // Space available for items
//   const planeWidth = availableSpace / numberOfItems; // Width of each plane
//   const planeHeight = 8; // Fixed height for simplicity, but can be adjusted similarly

//   return data.map((item, index) => (
//     <Card
//       key={index}
//       url={item.image}
//       width={planeWidth}
//       height={planeHeight}
//       position={[
//         Math.sin((index / numberOfItems) * Math.PI * 2) * radius,
//         0,
//         Math.cos((index / numberOfItems) * Math.PI * 2) * radius,
//       ]}
//       rotation={[0, Math.PI + (index / numberOfItems) * Math.PI * 2, 0]}
//       onClick={() => console.log(`clicked ${index}`)}
//     />
//   ));
// }

function Carousel({ radius, data }) {
  const updatAboutDisplayMode = useStore((state) => state.updatAboutDisplayMode);
  const currentContent = useStore((state) => state.current_About_Content);
  // Calculate the width and height dynamically based on the number of items
  const numberOfItems = data?.length;
  const circumference = Math.PI * 2 * radius; // Circumference of the cylinder
  const gapSize = 0.2; // Desired gap size between items
  const totalGapSize = gapSize * numberOfItems; // Total gap size around the cylinder
  const availableSpace = circumference - totalGapSize; // Space available for items
  const planeWidth = availableSpace / numberOfItems; // Width of each plane
  const planeHeight = 8; // Fixed height for simplicity, but can be adjusted similarly

  return data?.map((item, index) => (
    <Card
      key={index}
      url={item.image}
      width={planeWidth}
      height={planeHeight}
      position={[
        Math.sin((index / numberOfItems) * Math.PI * 2) * radius,
        0,
        Math.cos((index / numberOfItems) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (index / numberOfItems) * Math.PI * 2, 0]}
      /**show the display page with thier info depending on the currentcontent */
      onClick={currentContent === "skills" ? null : updatAboutDisplayMode}
    />
  ));
}

function Card({ url, width, height, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(ref.current.material, "radius", hovered ? 0.25 : 0.1, 0.2, delta);
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  });

  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.FrontSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      {/* <bentPlaneGeometry args={[0.1, width, height, 20, 20]} /> */}
      <bentPlaneGeometry args={[0.1, 10, 10, 20, 20]} />
    </Image>
  );
}

function Banner({ image, position, height, posX, width, visible = true }) {
  const ref = useRef();
  const texture = useTexture(image);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[12, 12, height, 128, 16, true, posX, width]} />
      <flipMaterial map={texture} transparent={true} side={THREE.BackSide} visible={visible} />
    </mesh>
  );
}
