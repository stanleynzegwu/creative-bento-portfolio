import LeftSidebar from "../components/LeftSidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import IdeasList from "./IdeasList";
import Breakdown from "./Breakdown";

const Holder = () => {
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="w-full md:max-h-screen min-h-screen overflow-x-hidden overflow-y-auto relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ideas" element={<IdeasList />} />
          <Route path="/idea/:id" element={<Breakdown />} />
          <Route path="/project/:id" element={<Breakdown />} />
        </Routes>
      </div>
    </div>
  );
};

export default Holder;
