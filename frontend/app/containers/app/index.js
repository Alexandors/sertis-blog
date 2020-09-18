import React from 'react';
import Routes from 'routes';
import LoaderMask from 'components/loader-mask';

import styles from './index.module.scss';

const App = () => (
  <React.Fragment>
    <LoaderMask/>
    <div className={styles.appBody}>
      <Routes/>
    </div>
  </React.Fragment>
);

export default App;
