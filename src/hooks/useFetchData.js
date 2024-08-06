// import { request } from '@/requestMethod';
// import useStore from '@/store/useStore';
// import { useEffect } from 'react';

// const useFetchData = () => {
// const setIsLoading = useStore((state) => state.setIsLoading); 

//   const updateDataFromDB = useStore((state) => state.updateDataFromDB)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from your database
//         const projectResponseData = await request.get('/project')
//         updateDataFromDB('projectData', projectResponseData.data)

//         const ideaResponseData = await request.get('/idea')
//         updateDataFromDB('ideaData', ideaResponseData.data)

//         const aboutResponseData = await request.get('/about')
//         updateDataFromDB('aboutData', aboutResponseData.data)

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         // Set loading state to false after fetch is complete
//         setIsLoading(false);
//       }
//     };

//     fetchData();
// //   }, [setLoading, setAboutContent]);
// }, []);
// };

// export default useFetchData;

// useFetchData.js
import { request } from '@/requestMethod';
import useStore  from '@/store/useStore';
import { useEffect, useState } from 'react';

const useFetchData = () => {
  const setIsLoading = useStore((state) => state.setIsLoading); 
  const setDataProgress = useStore((state) => state.setDataProgress); 
  const updateDataFromDB = useStore((state) => state.updateDataFromDB);
  // const [dataProgress, setDataProgress] = useState(0);
  // console.log(dataProgress)

  useEffect(() => {
    const fetchData = async () => {
      const totalRequests = 3;
      let completedRequests = 0;

      const incrementProgress = () => {
        completedRequests += 1;
        setDataProgress((completedRequests / totalRequests) * 100);
      };

      try {
        const projectResponseData = await request.get('/project');
        updateDataFromDB('projectData', projectResponseData.data);
        incrementProgress();

        const ideaResponseData = await request.get('/idea');
        updateDataFromDB('ideaData', ideaResponseData.data);
        incrementProgress();

        const aboutResponseData = await request.get('/about');
        updateDataFromDB('aboutData', aboutResponseData.data);
        incrementProgress();

      } catch (error) {
        console.error('Error fetching data:', error);
      }
        finally {
        // Set loading state to false after fetch is complete
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
};

export default useFetchData;
