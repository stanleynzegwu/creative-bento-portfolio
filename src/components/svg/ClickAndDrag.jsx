import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ClickAndDrag = () => {
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });

    timeline
      .to(leftArrowRef.current, { opacity: 0.2, duration: 1 })
      .to(leftArrowRef.current, { opacity: 1, duration: 1 })
      .to(rightArrowRef.current, { opacity: 0.2, duration: 1 }, "-=1")
      .to(rightArrowRef.current, { opacity: 1, duration: 1 });
  }, []);

  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      className="absolute left-1/2 bottom-0 -translate-x-1/2 w-16 h-16 pointer-events-none z-20"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M13,22.5,7.82,17.36a2,2,0,0,1-.59-1.43,2,2,0,0,1,2-2,2,2,0,0,1,1.43.59L12,15.82V6.38a2,2,0,0,1,1.74-2,1.87,1.87,0,0,1,1.51.56,1.83,1.83,0,0,1,.57,1.34V12l5,.72a1.91,1.91,0,0,1,1.64,1.89h0a17.18,17.18,0,0,1-1.82,7.71l-.09.18"
          fill="none"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          strokeWidth="1.91"
        />
        <path
          d="M15.82,10.64a4.54,4.54,0,0,0,1.47-1,4.78,4.78,0,1,0-6.76,0,4.54,4.54,0,0,0,1.47,1"
          fill="none"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          strokeWidth="1.91"
        />
        <polyline
          ref={leftArrowRef}
          points="4.36 9.14 1.5 6.27 4.36 3.41"
          fill="none"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          strokeWidth="1.91"
        />
        <line
          ref={leftArrowRef}
          x1="9.14"
          y1="6.27"
          x2="1.5"
          y2="6.27"
          fill="none"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          strokeWidth="1.91"
        />
        <polyline
          ref={rightArrowRef}
          points="27.64 9.14 30.5 6.27 27.64 3.41"
          fill="none"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          strokeWidth="1.91"
        />
        <line
          ref={rightArrowRef}
          x1="22.86"
          y1="6.27"
          x2="30.5"
          y2="6.27"
          fill="none"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          strokeWidth="1.91"
        />
      </g>
    </svg>
  );
};

export default ClickAndDrag;
