// import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Topbar from "./components/Topbar";

function App() {
  return (
    <Router>
      <main className="max-md:mt-16">
        <Topbar />
        {/* Defining routes path and rendering components as element */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
