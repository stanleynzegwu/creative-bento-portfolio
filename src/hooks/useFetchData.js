import { request } from '@/requestMethod';
import useStore from '@/store/useStore';
import { useEffect } from 'react';

const useFetchData = () => {
const setIsLoading = useStore((state) => state.setIsLoading); 

  const updateDataFromDB = useStore((state) => state.updateDataFromDB)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your database
        const projectResponseData = await request.get('/project')
        updateDataFromDB('projectData', projectResponseData.data)

        const ideaResponseData = await request.get('/idea')
        updateDataFromDB('ideaData', ideaResponseData.data)

        const aboutResponseData = await request.get('/about')
        updateDataFromDB('aboutData', aboutResponseData.data)

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
