import { request } from '@/requestMethod';
import useStore  from '@/store/useStore';
import { useProgress } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';

const useAssetLoaded = () => {
    const setAssetLoaded = useStore(state => state.setAssetLoaded)
    const progress = useProgress(state => state.progress)
  

  useEffect(() => {
    if(progress >= 100){
        setAssetLoaded(true)
    }
  }, [progress]);
};

export default useAssetLoaded;