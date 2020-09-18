import { useRef, useEffect } from 'react';

export default (value, defaultValue) => {
  const ref = useRef(defaultValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
