/**
 * Types
 */

type User = App.User;

interface Props {
  setUser: (user: User) => void;
}
/* *** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DocTitle from 'react-document-title';

import Storage from 'Shared/Storage';

import ToolbarContainer from 'Containers/toolbar';
import SearchContainer from 'Containers/search';
import PlaceContainer from 'Containers/place';
import GoogleMapContainer from 'Containers/googleMap';

import { isMobileDevice } from 'Utils';

class AppComponent extends Component<Props, {}> {
  static propTypes = {
    setUser: PropTypes.func.isRequired
  };

  public componentWillMount (): void {
    const savedUser: User | undefined = Storage.getUser();

    if (savedUser !== undefined) {
      this.props.setUser(savedUser);
    }
  }

  public render(): JSX.Element {
    return isMobileDevice() ? this.renderForMobile() : this.renderForDesktop();
  }

  private renderForDesktop (): JSX.Element {
    return (
      <main id="App">
        <DocTitle title="What Finder" />
        <section id="sidebar">
          <ToolbarContainer />
          <SearchContainer />
          <Route
            path={'/:coords/place/:placeId'}
            component={PlaceContainer}
          />
        </section>
        <Route path={'/:coords?'} component={GoogleMapContainer} />
      </main>
    );
  }

  private renderForMobile (): JSX.Element {
    return (
      <main id="App">
        <DocTitle title="What Finder" />
        <ToolbarContainer />
        <SearchContainer />
        <Route path={'/:coords?'} component={GoogleMapContainer} />
        <Route
          path={'/:coords/place/:placeId'}
          component={PlaceContainer}
        />
      </main>
    );
  }
}

export default AppComponent;
