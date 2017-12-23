import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'Store';
import AppContainer from 'Components/app';

const history = createBrowserHistory({
  basename: 'what-finder'
})

const AppRouter: JSX.Element = (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path={'/'} component={AppContainer} />
        <Redirect to={'/'} />
      </Switch>
    </Router>
  </Provider>
);

export default AppRouter;
