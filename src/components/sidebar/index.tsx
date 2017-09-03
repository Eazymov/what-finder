import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ToolbarContainer from 'Containers/toolbar';
import SearchContainer from 'Containers/search';
import PlaceContainer from 'Containers/place';

class SidebarComponent extends Component<{}, {}> {
  constructor (props: {}) {
    super(props);
  }

  render() {
    return (
      <section id="sidebar">
        <ToolbarContainer />
        <SearchContainer />
        <Route
          path={'/:coords/place/:placeId'}
          component={PlaceContainer}
        />
      </section>
    );
  }
}

export default SidebarComponent;
