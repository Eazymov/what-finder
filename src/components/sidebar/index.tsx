import * as React from 'react';
import { Component } from 'react';

import AppToolbar from '../toolbar';
import AppSearch from '../search';

import './style.styl';

class SidebarComponent extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <section id="sidebar">
        <AppToolbar />
        <AppSearch />
      </section>
    );
  }
}

export default SidebarComponent;
