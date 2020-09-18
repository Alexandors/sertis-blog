import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Notification from 'components/notification';
import Loading from 'components/loading';
import styles from './routes.module.scss';


const NotFoundPage = React.lazy(() => import('pages/not-found-page'));
const BlogPage = React.lazy(() => import('pages/blog-page'));

const Routes = () => (
  <React.Fragment>
    <Notification/>
    <div className={styles.routeWrapper}>
      <Suspense fallback={<Loading center/>}>
        <Switch>
          <Route exact path="/" component={BlogPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Suspense>
    </div>
  </React.Fragment>
);

export default Routes;
