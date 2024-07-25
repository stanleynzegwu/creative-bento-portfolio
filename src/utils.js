import gsap from "gsap";

// export const animateToObject = (camera,controls) => {
//     controls.enabled = false;
//     const timeline = gsap.timeline();
  
//     timeline.to(camera.position, {
//       duration: 1,
//     //   x: x+ 1 ,
//     //   y: ObjectPosition.y ,
//       z: 40 ,
//       ease: "linear",
//     });
//     // timeline.to(
//     //   {},
//     //   {
//     //     onUpdate: () => {
//     //       camera.lookAt(ObjectPosition);
//     //     },
//     //   }
//     // );
//     timeline.play();
// };

export const animateToObject = (camera, controls) => {
  //     controls.enabled = false;
  const timeline = gsap.timeline();

  const mm = gsap.matchMedia();

  mm.add(
    {
      // Define breakpoints
      isSmall: "(max-width: 600px)",
      isMedium: "(min-width: 601px) and (max-width: 1200px)",
      isLarge: "(min-width: 1201px)"
    },
    (context) => {
      const { isSmall, isMedium, isLarge } = context.conditions;

      let targetZ;

      if (isSmall) {
        targetZ = 80; // Example value for small screens
      } else if (isMedium) {
        targetZ = 70; // Example value for medium screens
      } else if (isLarge) {
        targetZ = 50; // Example value for large screens
      }

      timeline.to(camera.position, {
        duration: 1,
        z: targetZ,
        ease: "linear"
      });

      timeline.play();

      return () => {
        // Clean up if needed
      };
    }
  );
};