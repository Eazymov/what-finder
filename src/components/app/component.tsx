import * as React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Storage from '../../models/Storage';

import AppMap from '../map';
import AppSidebar from '../sidebar';

import './style.styl';

interface Props {
  setUser: Function;
}

class AppComponent extends Component<Props, {}> {
  constructor (props: Props) {
    super(props);
  }

  componentWillMount() {
    const savedUser: App.User | null = Storage.getUser();

    if (savedUser !== null) {
      this.props.setUser(savedUser);
    }
  }

  render() {
    return (
      <section id="App">
        <AppSidebar />
        <Switch>
          <Route exact={true} path={'/'} component={AppMap} />
          <Route
            exact={true}
            path={'/:coords'}
            component={AppMap}
          />
          <Route path={'*'}>
            <Redirect to={'/'} />
          </Route>
        </Switch>
      </section>
    );
  }
}

export default AppComponent;
