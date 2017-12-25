import { COORDS_REGEX } from 'Constants/regexps'
import getRouteParamFromCoords from './getRouteParamFromCoords'
import { MapCoords } from 'Types'

function replaceRouteCoords (route: string, coords: MapCoords): string {
  const newCoordsRoute: string = getRouteParamFromCoords(coords)

  let newRoute: string
  
  if (COORDS_REGEX.test(route)) {
    newRoute = route.replace(COORDS_REGEX, newCoordsRoute)
  } else {
    newRoute = newCoordsRoute + route
  }

  return newRoute
}

export default replaceRouteCoords
