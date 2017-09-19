import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import store from 'Store';

import AppContainer from 'Containers/app';

const history = createHistory({
  basename: '/what-finder/',
});

const AppRouter: JSX.Element = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={'/'} component={AppContainer} />
        <Redirect to={'/'} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export { history };
export default AppRouter;
