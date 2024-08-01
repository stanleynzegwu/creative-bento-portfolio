import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "./components/Topbar";
import Holder from "./pages/Holder";
import useFetchData from "./hooks/useFetchData";
import LoadingScreen from "./components/LoadingScreen";
import useStore from "./store/useStore";

function App() {
  const isLoading = useStore((state) => state.isLoading);
  useFetchData(); // Call the custom hook to fetch data
  return (
    <Router>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="max-md:mt-16">
          <Topbar />
          <Holder />
        </main>
      )}
    </Router>
  );
}

export default App;
