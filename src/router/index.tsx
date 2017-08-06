import * as React from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from '../components/app';
import store from '../store';

const history = createHistory();

const AppRouter: JSX.Element = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path={'/'} component={App} />
    </ConnectedRouter>
  </Provider>
);

export { history };
export default AppRouter;
