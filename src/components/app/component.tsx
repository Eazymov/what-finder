/**
 * Types
 */

type User = App.User;
type JSXElement = JSX.Element;

interface Props {
  setUser: Function;
}
/* *** */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Storage from 'Shared/Storage';

import AppMap from 'Components/map';
import AppSidebar from 'Components/sidebar';

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
        <Route path={'/:coords?'} component={AppMap} />
      </section>
    );
  }
}

export default AppComponent;
