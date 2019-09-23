import { useState, useEffect } from 'react';

const getSizes = () => ({
  height: window.innerHeight,
  width: window.innerWidth,
});

const useDimensions = () => {
  const [dimensions, setDimensions] = useState(getSizes());

  const handleResize = () => setDimensions(getSizes());
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

export default useDimensions;
