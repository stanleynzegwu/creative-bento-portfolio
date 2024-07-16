import Footer from "@/components/Footer";
import BentoGrid from "../components/BentoGrid";
import LeftSidebar from "../components/LeftSidebar";
import Scroll from "../components/Scroll";
import Wrapper from "@/components/Wrapper";

const Home = () => {
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="w-full max-h-screen min-h-screen overflow-x-hidden overflow-y-auto relative">
        <div className="p-8 lg:p-12">
          <span className="inline-block pb-6 text-xl font-semibold text-gray-400">
            Hello there👋
          </span>
          <p className="text-xl md:text-4xl lg:text-5xl font-semibold text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deleniti natus
            excepturi voluptatem dolorem consectetur. Assumenda, dolores asperiores eaque obcaecati,
            amet cumque quisquam quae, quod illo rerum a temporibus ex?
          </p>
        </div>
        <Wrapper name={"craft"}>
          <BentoGrid />
        </Wrapper>
        <Wrapper name={"interdisciplinary"}>
          <Scroll />
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
