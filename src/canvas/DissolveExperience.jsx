import { Environment, OrbitControls } from "@react-three/drei";
import { DissolveMaterial } from "./DissolveMaterial";

// import { useControls } from "leva";
import { useState } from "react";
import * as THREE from "three";
// import { Chair } from "./Chair";
// import { Table } from "./Table";

const boxMaterial = new THREE.MeshStandardMaterial({ color: "white" });
const sphereMaterial = new THREE.MeshStandardMaterial({ color: "white" });
const torusMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: "white" });

export const DissolveExperience = ({ visibleItem, setVisibleItem }) => {
  //   const { itemDisplayed } = useControls({
  //     itemDisplayed: {
  //       value: "box",
  //       options: ["box", "sphere", "table", "chair"],
  //     },
  //   });

  const onFadeOut = () => setVisibleItem(visibleItem);

  return (
    <>
      <group position-y={12}>
        {visibleItem === null && (
          <mesh>
            <sphereGeometry args={[15, 32, 16]} />
            <DissolveMaterial
              baseMaterial={sphereMaterial}
              visible={visibleItem === null}
              onFadeOut={onFadeOut}
              color="#00c11e"
            />
          </mesh>
        )}
        {visibleItem === "educationModel" && (
          <mesh>
            <boxGeometry args={[30, 30, 30]} />
            <DissolveMaterial
              baseMaterial={boxMaterial}
              visible={visibleItem === "educationModel"}
              onFadeOut={onFadeOut}
              color="#0082b2"
            />
          </mesh>
        )}

        {visibleItem === "interestModel" && (
          <mesh>
            <sphereGeometry args={[15, 32, 16]} />
            <DissolveMaterial
              baseMaterial={sphereMaterial}
              visible={visibleItem === "interestModel"}
              onFadeOut={onFadeOut}
              color="#00c11e"
            />
          </mesh>
        )}
        {visibleItem === "aboutModel" && (
          <mesh>
            <torusGeometry args={[12, 5, 16, 100]} />
            <DissolveMaterial
              baseMaterial={torusMaterial}
              visible={visibleItem === "aboutModel"}
              onFadeOut={onFadeOut}
              color="#00c11e"
            />
          </mesh>
        )}
        {visibleItem === "skillModel" && (
          <mesh>
            <torusGeometry args={[10, 3, 100, 16]} />
            <DissolveMaterial
              baseMaterial={sphereMaterial}
              visible={visibleItem === "skillModel"}
              onFadeOut={onFadeOut}
              color="#00c11e"
            />
          </mesh>
        )}
      </group>
      <Environment preset="sunset" />
    </>
  );
};

// import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
// import { DissolveMaterial } from "./DissolveMaterial";

// // import { useControls } from "leva";
// import { useState } from "react";
// import * as THREE from "three";
// // import { Chair } from "./Chair";
// // import { Table } from "./Table";

// const boxMaterial = new THREE.MeshStandardMaterial({ color: "white" });
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: "white" });
// const torusMaterial = new THREE.MeshStandardMaterial({ color: "red" });
// const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: "white" });

// export const DissolveExperience = ({ visibleItem, setVisibleItem }) => {
//   //   const { itemDisplayed } = useControls({
//   //     itemDisplayed: {
//   //       value: "box",
//   //       options: ["box", "sphere", "table", "chair"],
//   //     },
//   //   });
//   const { scene } = useGLTF("/models/tower.glb");

//   const material = new THREE.MeshBasicMaterial({ color: "#c1d7de" });

//   // Traverse through the model and apply the material to each mesh
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material = material;
//     }
//   });
//   // const mesh = new THREE.Mesh(model.scene.children[0].geometry, material);
//   const onFadeOut = () => setVisibleItem(visibleItem);

//   return (
//     <>
//       {/* <group position-y={12}> */}
//       <group>
//         {visibleItem === "box" && (
//           // <mesh>
//           //   <boxGeometry args={[30, 30, 30]} />
//           //   <DissolveMaterial
//           //     baseMaterial={boxMaterial}
//           //     visible={visibleItem === "box"}
//           //     onFadeOut={onFadeOut}
//           //     color="#0082b2"
//           //   />
//           // </mesh>
//           <primitive object={scene}>
//             <DissolveMaterial
//               baseMaterial={boxMaterial}
//               visible={visibleItem === "box"}
//               onFadeOut={onFadeOut}
//               color="#0082b2"
//             />
//           </primitive>
//         )}

//         {visibleItem === "sphere" && (
//           <mesh>
//             <sphereGeometry args={[15, 32, 16]} />
//             <DissolveMaterial
//               baseMaterial={sphereMaterial}
//               visible={visibleItem === "sphere"}
//               onFadeOut={onFadeOut}
//               color="#00c11e"
//             />
//           </mesh>
//         )}
//         {visibleItem === "torus" && (
//           <mesh>
//             <torusGeometry args={[12, 5, 16, 100]} />
//             <DissolveMaterial
//               baseMaterial={torusMaterial}
//               visible={visibleItem === "torus"}
//               onFadeOut={onFadeOut}
//               color="#00c11e"
//             />
//           </mesh>
//         )}
//         {visibleItem === "torusKnot" && (
//           <mesh>
//             <torusGeometry args={[10, 3, 100, 16]} />
//             <DissolveMaterial
//               baseMaterial={sphereMaterial}
//               visible={visibleItem === "torusKnot"}
//               onFadeOut={onFadeOut}
//               color="#00c11e"
//             />
//           </mesh>
//         )}
//       </group>
//       <Environment preset="sunset" />
//     </>
//   );
// };
