// src/hooks/useFetchData.js
import { request } from '@/requestMethod';
import useStore from '@/store/useStore';
import { useEffect } from 'react';

const useFetchData = () => {
const setIsLoading = useStore((state) => state.setIsLoading); 

  const updateDataFromDB = useStore((state) => state.updateDataFromDB)
//   const dbData = useStore((state) => state.dbData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading state to true before starting the fetch
        // setLoading(true);

        // Fetch data from your database
        const projectResponseData = await request.get('/project')
        updateDataFromDB('projectData', projectResponseData.data)

        const ideaResponseData = await request.get('/idea')
        updateDataFromDB('ideaData', ideaResponseData.data)

        const aboutResponseData = await request.get('/about')
        updateDataFromDB('aboutData', aboutResponseData.data)

        const ideaView360DataResponseData = await request.get('/idea-view360')
        updateDataFromDB('ideaView360Data', ideaView360DataResponseData.data)

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading state to false after fetch is complete
        setIsLoading(false);
      }
    };

    fetchData();
//   }, [setLoading, setAboutContent]);
}, []);
};

export default useFetchData;
