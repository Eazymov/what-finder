import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppToolbar from 'components/toolbar';
import AppSearch from 'components/search';
import AppPlaceDescription from 'components/placeDescription';

class SidebarComponent extends Component<{}, {}> {
  constructor (props: {}) {
    super(props);
  }

  render() {
    return (
      <section id="sidebar">
        <AppToolbar />
        <AppSearch />
        <Route path={'/:coords?/place'} component={AppPlaceDescription} />
      </section>
    );
  }
}

export default SidebarComponent;
