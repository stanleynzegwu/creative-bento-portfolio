// import Footer from "@/components/Footer";
// import BentoGrid from "../components/BentoGrid";
// import LeftSidebar from "../components/LeftSidebar";
// import Scroll from "../components/Scroll";
// import Wrapper from "@/components/Wrapper";
// import GPGPUExperience from "@/canvas/GPGPUFlowfieldEffect";
// import TextExperience from "@/canvas/Test";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// const Home = () => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     // Animation setup
//     const animation = gsap.fromTo(
//       elementRef.current,
//       { y: "20%", opacity: 0 },
//       { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
//     );

//     // Cleanup function to stop animation on component unmount
//     return () => {
//       animation.kill();
//     };
//   }, []);

//   return (
//     <div className="flex">
//       <LeftSidebar />
//       <div
//         className=" w-full md:max-h-screen min-h-screen overflow-x-hidden overflow-y-auto relative"
//         ref={elementRef}
//       >
//         {/* <GPGPUExperience model={"/models/car-test3.glb"} position={[0, 0, 6]} /> */}
//         {/* <TextExperience /> */}
//         {/* <div className="w-full h-screen">
//           <GPGPUExperience model={"/models/model.glb"} />
//         </div> */}
//         <div className="p-8 lg:p-12 ">
//           <span className="inline-block pb-6 text-xl font-semibold text-gray-400">
//             Hello there👋
//           </span>
//           <p className="text-xl md:text-4xl lg:text-5xl font-semibold text-gray-500">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deleniti natus
//             excepturi voluptatem dolorem consectetur. Assumenda, dolores asperiores eaque obcaecati,
//             amet cumque quisquam quae, quod illo rerum a temporibus ex?
//           </p>
//         </div>
//         <Wrapper name={"craft"}>
//           <BentoGrid />
//         </Wrapper>
//         <Wrapper name={"interdisciplinary"}>
//           <Scroll />
//         </Wrapper>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useRef } from "react";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import Wrapper from "@/components/Wrapper";
import Scroll from "../components/Scroll";
import gsap from "gsap";
import { BENTO_DATA } from "@/constants";
import OceannExperience from "@/canvas/Ocean";

const Home = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    // Animation setup
    const animation = gsap.fromTo(
      elementRef.current,
      { y: "20%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    // Cleanup function to stop animation on component unmount
    return () => {
      animation.kill();
    };
  }, []);
  return (
    <>
      <div className="p-8 lg:p-12 py-10" ref={elementRef}>
        {/* <div className="h-[100vh] w-full">
          <OceannExperience />
        </div> */}
        <span className="inline-block pb-6 text-xl font-semibold text-gray-400">Hello there👋</span>
        <p className="text-xl md:text-4xl lg:text-5xl font-semibold text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deleniti natus
          excepturi voluptatem dolorem consectetur. Assumenda, dolores asperiores eaque obcaecati,
          amet cumque quisquam quae, quod illo rerum a temporibus ex?
        </p>
      </div>
      <Wrapper name={"craft"}>
        <div className="p-6 md:p-8 lg:p-12">
          <BentoGrid BENTO_DATA={BENTO_DATA} />
        </div>
      </Wrapper>
      <Wrapper name={"interdisciplinary"}>
        <Scroll />
      </Wrapper>
      <Footer />
    </>
  );
};

export default Home;
