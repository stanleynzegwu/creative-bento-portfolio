// const CurvedText = ({ text, radius, width, gap }) => {
//   const lines = [];
//   let currentLine = "";
//   let currentWidth = 0;

import { Html } from "@react-three/drei";
import { useMemo } from "react";

//   // Split text into lines based on the specified width
//   for (let i = 0; i < text.length; i++) {
//     const charWidth = gap; // Use gap as the character width
//     if (currentWidth + charWidth > width) {
//       lines.push(currentLine);
//       currentLine = "";
//       currentWidth = 0;
//     }
//     currentLine += text[i];
//     currentWidth += charWidth;
//   }
//   lines.push(currentLine);

//   return (
//     <group>
//       {lines.map((line, lineIndex) => (
//         <group key={lineIndex}>
//           {line.split("").map((char, charIndex) => {
//             const angleOffset = width / radius / lines.length; // Adjust to avoid full circle wrapping
//             const angle = (charIndex * gap) / radius - angleOffset / 2;
//             const x = Math.sin(angle) * radius;
//             const z = Math.cos(angle) * radius;
//             const y = -lineIndex * 1.2; // Adjust line spacing as needed

//             return (
//               <Text
//                 key={charIndex}
//                 position={[x, y, z]}
//                 rotation={[0, angle, 0]}
//                 fontSize={0.5}
//                 color="white"
//                 anchorX="center"
//                 anchorY="middle"
//               >
//                 {char}
//               </Text>
//             );
//           })}
//         </group>
//       ))}
//     </group>
//   );
// };

// const CurvedText = ({ text, radius, width, gap }) => {
//   const { lines, positions, rotations } = useMemo(() => {
//     const lines = [];
//     let currentLine = "";
//     let currentWidth = 0;

//     // Split text into lines based on the specified width
//     for (let i = 0; i < text.length; i++) {
//       const charWidth = gap; // Use gap as the character width
//       if (currentWidth + charWidth > width) {
//         lines.push(currentLine);
//         currentLine = "";
//         currentWidth = 0;
//       }
//       currentLine += text[i];
//       currentWidth += charWidth;
//     }
//     lines.push(currentLine);

//     const positions = [];
//     const rotations = [];

//     lines.forEach((line, lineIndex) => {
//       const lineWidth = line.length * gap; // Calculate line width
//       const startAngle = -lineWidth / (2 * radius); // Start angle of the line

//       line.split("").forEach((char, charIndex) => {
//         const angle = startAngle + (charIndex * gap) / radius;
//         const x = Math.sin(angle) * radius;
//         const z = Math.cos(angle) * radius;
//         const y = -lineIndex * 1.2; // Adjust line spacing as needed

//         positions.push(new THREE.Vector3(x, y, z));
//         rotations.push(new THREE.Euler(0, angle, 0));
//       });
//     });

//     return { lines, positions, rotations };
//   }, [text, radius, width, gap]);

//   return (
//     <group>
//       {positions.map((position, i) => (
//         <Text
//           key={i}
//           position={position.toArray()}
//           rotation={rotations[i].toArray()}
//           fontSize={0.5}
//           color="white"
//           anchorX="center"
//           anchorY="middle"
//         >
//           {text[i % text.length]} {/* Use modulo to repeat text */}
//         </Text>
//       ))}
//     </group>
//   );
// };

////////////////////////////

// const CurvedText = ({ text, radius, width, gap }) => {
//   const lines = useMemo(() => {
//     const result = [];
//     let currentLine = "";
//     let currentWidth = 0;

//     // Split text into lines based on the specified width
//     for (let i = 0; i < text.length; i++) {
//       const charWidth = gap; // Use gap as the character width
//       if (currentWidth + charWidth > width) {
//         result.push(currentLine);
//         currentLine = "";
//         currentWidth = 0;
//       }
//       currentLine += text[i];
//       currentWidth += charWidth;
//     }
//     result.push(currentLine);
//     return result;
//   }, [text, width, gap]);

//   return (
//     <group>
//       {lines.map((line, lineIndex) => (
//         <group key={lineIndex}>
//           {line.split("").map((char, charIndex) => {
//             const angleOffset = width / radius / lines.length;
//             const angle = (charIndex * gap) / radius - angleOffset / 2;
//             const x = Math.sin(angle) * radius;
//             const z = Math.cos(angle) * radius;
//             const y = -lineIndex * 1.2; // Adjust line spacing as needed

//             return (
//               <Html
//                 className=""
//                 key={charIndex}
//                 position={[x, y, z]}
//                 style={{ transform: `rotateY(${angle}rad)` }}
//                 distanceFactor={10} // Adjust based on scene scale
//               >
//                 <span style={{ color: "white", fontSize: "20px" }}>{char}</span>
//               </Html>
//             );
//           })}
//         </group>
//       ))}
//     </group>
//   );
// };

// export default CurvedText;

///////////////////////////

const CurvedText = ({ text, radius, width, gap, position = [0, 0, 0] }) => {
  const lines = useMemo(() => {
    const result = [];
    let currentLine = "";
    let currentWidth = 0;

    // Split text into lines based on the specified width
    for (let i = 0; i < text.length; i++) {
      const charWidth = gap; // Use gap as the character width
      if (currentWidth + charWidth > width) {
        result.push(currentLine);
        currentLine = "";
        currentWidth = 0;
      }
      currentLine += text[i];
      currentWidth += charWidth;
    }
    result.push(currentLine);
    return result;
  }, [text, width, gap]);

  return (
    <group position={position}>
      {lines.map((line, lineIndex) => {
        const angleOffset = width / radius / lines.length;
        return (
          <group key={lineIndex} position={[0, -lineIndex * 1.2, 0]} rotation={[0, 0, Math.PI]}>
            {line.split("").map((char, charIndex) => {
              const angle = (charIndex * gap) / radius - angleOffset / 2;
              const x = Math.sin(angle) * radius;
              const z = Math.cos(angle) * radius;

              return (
                <Html
                  key={charIndex}
                  position={[x, 0, z]}
                  style={{ transform: `rotateY(${angle}rad)` }}
                  distanceFactor={10} // Adjust based on scene scale
                  className="pointer-events-none select-none"
                >
                  <span
                    style={{ color: "white" }}
                    className="pointer-events-none select-none text-2xl lg:text-7xl font-bold"
                  >
                    {char}
                  </span>
                </Html>
              );
            })}
          </group>
        );
      })}
    </group>
  );
};

export default CurvedText;
