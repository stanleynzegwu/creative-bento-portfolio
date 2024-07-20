import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Topbar from "./components/Topbar";
import Ideas from "./pages/IdeasList";
import Holder from "./pages/Holder";

function App() {
  return (
    <Router>
      <main className="max-md:mt-16">
        <Topbar />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ideas" element={<Ideas />} />
        </Routes> */}
        <Holder />
      </main>
    </Router>
  );
}

export default App;
