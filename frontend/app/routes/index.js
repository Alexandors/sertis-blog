import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Notification from 'components/notification';
import Loading from 'components/loading';
import styles from './private-routes.module.scss';


const NotFoundPage = React.lazy(() => import('pages/not-found-page'));

const Routes = () => {

    return (
        <React.Fragment>
            <Notification/>
            <div className={styles.routeWrapper}>
                <Suspense fallback={<Loading center/>}>
                    <Switch>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </Suspense>
            </div>
        </React.Fragment>
    );
};

export default Routes;
