import React from 'react'
import { Route } from 'react-router-dom'
import DocTitle from 'react-document-title'

import ToolbarContainer from 'Components/toolbar'
import SearchContainer from 'Components/search'
import PlaceContainer from 'Components/place'
import GoogleMapContainer from 'Components/googleMap'

import { isMobileDevice } from 'Utils'

const AppComponent = (): JSX.Element => {
  return isMobileDevice() ? <AppMobile /> : <AppDesktop />
}

const AppDesktop = (): JSX.Element => (
  <main className="App">
    <DocTitle title="What Finder" />

    <section className="App-sidebar">
      <ToolbarContainer />
      <SearchContainer />
      <Route
        path={'/:coords/place/:placeId'}
        component={PlaceContainer}
      />
    </section>
    <Route path={'/:coords?'} component={GoogleMapContainer} />
  </main>
)

const AppMobile = (): JSX.Element => (
  <main className="App">
    <DocTitle title="What Finder" />
    <ToolbarContainer />
    <SearchContainer />
    <Route path={'/:coords?'} component={GoogleMapContainer} />
    <Route
      path={'/:coords/place/:placeId'}
      component={PlaceContainer}
    />
  </main>
)

export default AppComponent;
