// import BentoGrid from "@/components/BentoGrid";
// import { IDEA_DATA } from "@/constants";
// import { useRef } from "react";
// import gsap from "gsap";
// import useStore from "@/store/useStore";
// import { useGSAP } from "@gsap/react";

// const IdeasList = () => {
//   const elementRef = useRef(null);
//   const ideaData = useStore((state) => state.dbData).ideaData;

//   useGSAP(() => {
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
//     <div className="relative p-8 lg:p-12 py-10 flex flex-col gap-8" ref={elementRef}>
//       <span className="text-sm uppercase text-gray-400">speculative</span>
//       <div>
//         <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-3">
//           Ideas about interfaces
//         </h2>
//         <p className="text-sm">
//           Some ideas about interfaces that i have thought of and decided to build for fun . if you
//           have any thoughts about this let me know!
//         </p>
//       </div>
//       <div className="w-full border-b-[1px] border-gray-200" />
//       <BentoGrid BENTO_DATA={ideaData} />
//     </div>
//   );
// };

// export default IdeasList;

import BentoGrid from "@/components/BentoGrid";
import { IDEA_DATA } from "@/constants";
import { useRef } from "react";
import gsap from "gsap";
import useStore from "@/store/useStore";
import { useGSAP } from "@gsap/react";

const IdeasList = () => {
  const elementRef = useRef(null);
  const ideaData = useStore((state) => state.dbData).ideaData;

  useGSAP(() => {
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
    <div className="relative p-8 lg:p-12 py-10 flex flex-col gap-8" ref={elementRef}>
      <span className="text-sm uppercase text-gray-400">speculative</span>
      <div>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-3">
          Ideas about interfaces
        </h2>
        <p className="text-sm">
          Some ideas about interfaces that i have thought of and decided to build for fun . if you
          have any thoughts about this let me know!
        </p>
      </div>
      <div className="w-full border-b-[1px] border-gray-200" />
      <BentoGrid route={"idea"} BENTO_DATA={ideaData} />
    </div>
  );
};

export default IdeasList;
