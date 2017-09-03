/**
 * Types
 */

type User = App.User;

interface Props {
  setUser: Function;
}
/* *** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DocTitle from 'react-document-title';

import Storage from 'Shared/Storage';

import AppSidebar from 'Components/sidebar';
import GoogleMapContainer from 'Containers/googleMap';

class AppComponent extends Component<Props, {}> {
  static propTypes = {
    setUser: PropTypes.func.isRequired
  };

  constructor (props: Props) {
    super(props);
  }

  componentWillMount() {
    const savedUser: User | undefined = Storage.getUser();

    if (savedUser !== undefined) {
      this.props.setUser(savedUser);
    }
  }

  render(): JSX.Element {
    return (
      <main id="App">
        <DocTitle title="What Finder" />
        <AppSidebar />
        <Route path={'/:coords?'} component={GoogleMapContainer} />
      </main>
    );
  }
}

export default AppComponent;
