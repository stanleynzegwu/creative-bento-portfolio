import GPGPUExperience from "@/canvas/GPGPUFlowfieldEffect";
import { IDEA_DATA } from "@/constants";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const IdeaBreakdown = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const idea = IDEA_DATA.find((_, index) => index === +id);

  const handleGoBack = () => {
    navigate(-1);
  };

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
    <div className="p-8 lg:p-12 py-10" ref={elementRef}>
      <div className="text-sm text-gray-400 cursor-pointer mb-14" onClick={handleGoBack}>
        Back
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex justify-between ">
          <h2 className="capitalize text-xl font-semibold">{idea.header}</h2>
          <span className="text-sm text-gray-400">{idea.date}</span>
        </div>
        <p className="text-sm ">{idea.desc}</p>
        <div className="border-[1px] border-gray-300 bg-gray-100 rounded-md h-96">
          <GPGPUExperience model={idea.model} position={[0, 0, 10]} />
        </div>
      </div>
    </div>
  );
};

export default IdeaBreakdown;
