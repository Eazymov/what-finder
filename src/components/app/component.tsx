// Types
type User = App.User;
type JSXElement = JSX.Element;

interface Props {
  setUser: Function;
}
//

import * as React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Storage from '../../Storage';

import AppMap from '../map';
import AppSidebar from '../sidebar';

import './style.styl';

class AppComponent extends Component<Props, {}> {
  constructor (props: Props) {
    super(props);
  }

  componentWillMount() {
    const savedUser: User | undefined = Storage.getUser();

    if (savedUser !== undefined) {
      this.props.setUser(savedUser);
    }
  }

  render(): JSXElement {
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
