import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "./components/Topbar";
import Holder from "./pages/Holder";
import useFetchData from "./hooks/useFetchData";
import LoadingScreen from "./components/LoadingScreen";
import useStore from "./store/useStore";

function App() {
  useFetchData(); // Call the custom hook to fetch data
  const isLoading = useStore((state) => state.isLoading);

  const dataProgress = useStore((state) => state.dataProgress);
  // console.log(dataProgress);

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
