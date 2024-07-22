import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "./components/Topbar";
import Holder from "./pages/Holder";

function App() {
  return (
    <Router>
      <main className="max-md:mt-16">
        <Topbar />
        <Holder />
      </main>
    </Router>
  );
}

export default App;
