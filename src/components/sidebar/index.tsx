import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppToolbar from 'Components/toolbar';
import AppSearch from 'Components/search';
import AppPlaceDescription from 'Components/placeDescription';

class SidebarComponent extends Component<{}, {}> {
  constructor (props: {}) {
    super(props);
  }

  render() {
    return (
      <section id="sidebar">
        <AppToolbar />
        <AppSearch />
        <Route
          path={'/:coords/place/:placeId'}
          component={AppPlaceDescription}
        />
      </section>
    );
  }
}

export default SidebarComponent;
