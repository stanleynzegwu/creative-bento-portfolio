import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import FadingImageDisplacement from "@/canvas/FadeInImageDisplacement";
import { ABOUT_THINGS_I_LOVE_DOING } from "@/constants";

const About = () => {
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
    <div className="relative p-8 lg:p-12 py-10 flex flex-col gap-8" ref={elementRef}>
      <span className="text-sm uppercase text-gray-400">Let that fog settle..</span>
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 mb-20">
        <span className="relative capitalize text-gray-500 text-7xl md:text-8xl lg:text-9xl font-bold">
          michan <br /> kim
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-radial-gradient" />
        </span>

        <div className="relative rounded-lg z-10 h-96 w-full ">
          <Canvas camera={{ position: [0, 0, 8], fov: 42 }}>
            <FadingImageDisplacement
              image1={"/images/dispImage1.jpg"}
              image2={"/images/dispImage2.jpg"}
              image3={"/images/dispImage2.jpg"}
            />
          </Canvas>
          {/* Gradient overlay */}
          <div className="absolute inset-0 -z-10 bg-radial-gradient" />
        </div>
      </div>
      {/* ---- */}
      <Wrapper>
        <div className="relative flex gap-8">
          <div className="relative hidden flex-1 md:flex gap-4">
            <img src="/images/dispImage2.jpg" alt="" className=" rounded-lg h-96 aspect-auto" />
            <div className="mt-10">
              <img
                src="/images/dispImage1.jpg"
                alt=""
                className=" rounded-lg h-60 w-full aspect-auto"
              />
              <span className="capitalize">my craft began here</span>
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-10 bg-radial-gradient" />
          </div>
          <div className="relative flex-1">
            <span className="absolute -top-10 left-0 text-sm uppercase text-gray-400">Info</span>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, obcaecati repellat
              laboriosam numquam reprehenderit aspernatur magni.
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore deleniti in
              unde animi non repudiandae voluptate, eos porro necessitatibus enim quis explicabo
              natus sed minus quod itaque quibusdam iste! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Incidunt aspernatur voluptates nesciunt quasi, veniam mollitia
              excepturi sint suscipit magnam corrupti ut, assumenda ipsa. Suscipit similique
              exercitationem numquam doloremque tempore iste?
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore deleniti in
              unde animi non repudiandae voluptate, eos porro necessitatibus enim quis explicabo
              natus sed minus quod itaque quibusdam iste! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Incidunt aspernatur voluptates nesciunt quasi, veniam mollitia
              excepturi sint suscipit magnam corrupti ut, assumenda ipsa. Suscipit similique
              exercitationem numquam doloremque tempore iste?
            </p>
          </div>
        </div>
      </Wrapper>
      {/* ---- */}
      <Wrapper>
        <div>
          <span className="inline-block mb-4 text-sm text-gray-400 uppercase">Education</span>
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="capitalize font-semibold text-2xl">
                university of california,berkeley <br />{" "}
                <span className="text-gray-400">college of environmental design</span>
              </h2>
              <p className="text-sm">
                Bachelors of Arts in Architecture- Undergraduate Thesis Berkeley Certification in
                Design Innovation
              </p>
            </div>
            <div className="flex-1">
              <div className="relative">
                <img src="/images/womantree2.jpg" alt="" className=" w-full h-64 rounded-lg" />
                {/* Gradient overlay */}
                <div className="absolute inset-0 z-10 bg-radial-gradient" />
              </div>
              <p className="mt-4 text-sm">Berkeley campus during the spring</p>
            </div>
          </div>
        </div>
      </Wrapper>
      {/* ---- */}
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-1 ">
          <span className="inline-block uppercase text-gray-400 text-sm mb-4">
            things i love to do
          </span>
          <div className="flex flex-col ">
            {ABOUT_THINGS_I_LOVE_DOING.map((item, index) => (
              <span key={index} className="font-semibold text-2xl">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden flex-1 md:flex gap-4">
          <img src="/images/dispImage2.jpg" alt="" className=" rounded-lg h-80 aspect-auto" />
          <div className="mt-10">
            <img
              src="/images/dispImage1.jpg"
              alt=""
              className=" rounded-lg h-80 w-full aspect-auto"
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-radial-gradient" />
        </div>
      </div>
    </div>
  );
};

export default About;

function Wrapper({ children }) {
  return (
    <>
      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full border-t-[1px] border-gray-200 mt-10" /> */}
      <div className="w-full border-b-[1px] border-gray-200 pb-20">{children}</div>
    </>
  );
}
