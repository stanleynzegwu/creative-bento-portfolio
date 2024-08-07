import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

const useSmoothProgress = () => {
  const { progress } = useProgress();
  const [smoothProgress, setSmoothProgress] = useState(0);

  useEffect(() => {
    if (progress > smoothProgress) {
      setSmoothProgress(progress);
    }
  }, [progress, smoothProgress]);

  return smoothProgress;
};

export default useSmoothProgress;
