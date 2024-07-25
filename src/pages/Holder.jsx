import LeftSidebar from "../components/LeftSidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import IdeaBreakdown from "./IdeaBreakdown";
import IdeasList from "./IdeasList";
import OceanExperience from "@/canvas/Ocean";

const Holder = () => {
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="w-full md:max-h-screen min-h-screen overflow-x-hidden overflow-y-auto relative">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/about" element={<OceanExperience />} />
          <Route path="/ideas" element={<IdeasList />} />
          <Route path="/ideas/:id" element={<IdeaBreakdown />} />
        </Routes>
      </div>
    </div>
  );
};

export default Holder;
