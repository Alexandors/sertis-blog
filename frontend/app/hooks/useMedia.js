import { useState, useEffect } from 'react';
import _ from 'lodash';

export default (queries, values, defaultValue) => {
  const mediaQueryLists = queries.map((query) => window.matchMedia(query));

  const getValue = () => {
    const index = mediaQueryLists.findIndex((list) => list.matches);

    return !_.isNil(values[index]) ? values[index] : defaultValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const listener = () => setValue(getValue);
    mediaQueryLists.forEach((list) => list.addListener(listener));
    return () => mediaQueryLists.forEach((list) => list.removeListener(listener));
  }, []);

  return value;
};
