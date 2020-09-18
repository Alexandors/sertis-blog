import { useState, useEffect } from 'react';
import _ from 'lodash';
import { QUERIES } from 'global-constants';

export default (options, defaultValue) => {
  let { queries = QUERIES, values } = options; // eslint-disable-line
  if (Array.isArray(options)) {
    values = options;
  }
  const mediaQueryLists = queries.map((query) => window.matchMedia(query));

  const getValue = () => {
    const index = _.findLastIndex(mediaQueryLists, 'matches');
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
