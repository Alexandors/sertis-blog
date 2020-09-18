import React from 'react';
import { ReactReduxContext } from 'react-redux';
import getInjectors from 'utils/reducerInjectors';

const useInjectReducer = ({ key, reducer }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  }, []);
};

export default useInjectReducer;
