// Types
type JSXElement = JSX.Element;
//

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from 'Components/app';
import store from 'Store';

const history = createHistory();

const AppRouter: JSXElement = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={'/'} component={App} />
        <Redirect to={'/'} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export { history };
export default AppRouter;
