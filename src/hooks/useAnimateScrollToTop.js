import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const useAnimateScrollToTop = (element) => {
    useGSAP(() => {
        // Animation setup
        const animation = gsap.fromTo(
          element,
          { y: "20%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
        );
        // Cleanup function to stop animation on component unmount
        return () => {
          animation.kill();
        };
      }, []);
};

export default useAnimateScrollToTop;
