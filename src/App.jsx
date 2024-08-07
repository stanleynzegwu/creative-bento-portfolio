// import { BrowserRouter as Router } from "react-router-dom";
// import Topbar from "./components/Topbar";
// import Holder from "./pages/Holder";
// import useFetchData from "./hooks/useFetchData";
// import LoadingScreen from "./components/LoadingScreen";
// import useStore from "./store/useStore";
// import useAssetLoaded from "./hooks/useAssetLoaded";

// function App() {
//   useFetchData(); // Call the custom hook to fetch data
//   useAssetLoaded();
//   const isLoading = useStore((state) => state.isLoading);
//   const dataProgress = useStore((state) => state.dataProgress);

//   return (
//     <Router>
//       {isLoading ? (
//         <LoadingScreen dataProgress={dataProgress} />
//       ) : (
//         <main className="max-md:mt-16">
//           <Topbar />
//           <Holder />
//         </main>
//       )}
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router } from "react-router-dom";
// import Topbar from "./components/Topbar";
// import Holder from "./pages/Holder";
// import useFetchData from "./hooks/useFetchData";
// import LoadingScreen from "./components/LoadingScreen";
// import useStore from "./store/useStore";

// function App() {
//   useFetchData(); // Call the custom hook to fetch data
//   // useAssetLoaded();
//   const isLoading = useStore((state) => state.isLoading);
//   const assetLoaded = useStore((state) => state.assetLoaded);
//   console.log(assetLoaded, isLoading);

//   return (
//     <Router>
//       <main className="max-md:mt-16">
//         <LoadingScreen className={`${!isLoading && assetLoaded && "hidden"}`} />
//         <Topbar />
//         <Holder />
//       </main>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Holder from "./pages/Holder";
import useFetchData from "./hooks/useFetchData";
import LoadingScreen from "./components/LoadingScreen";
import useStore from "./store/useStore";
import { transitionOutLoadingScreen } from "./utils";

function App() {
  useFetchData(); // Call the custom hook to fetch data
  const isLoading = useStore((state) => state.isLoading);
  const assetLoaded = useStore((state) => state.assetLoaded);
  const [istimePassed, setIstimePassed] = useState(false);

  // Start a timer when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIstimePassed(true);
    }, 8000); // 8 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && assetLoaded && istimePassed) {
      transitionOutLoadingScreen();
    }
  }, [isLoading, assetLoaded, istimePassed]);

  return (
    <Router>
      <main className={``}>
        <LoadingScreen />
        <Holder />
      </main>
    </Router>
  );
}

export default App;
