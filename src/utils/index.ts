/**
 * Types
 */
type MapCoords = App.MapCoords;
/* *** */

const float: string = '[+-]?([0-9]*[.])?[0-9]+';
const coordsRegex: RegExp = new RegExp(`@${float},${float},${float}`);
const placeRegex: RegExp = /place\/.*/;

function replaceRouteCoords (route: string, coords: MapCoords): string {
  const newCoordsRoute: string = getRouteParamFromCoords(coords);

  let newRoute: string;
  
  if (coordsRegex.test(route)) {
    newRoute = route.replace(coordsRegex, newCoordsRoute);
  } else {
    newRoute = newCoordsRoute + route;
  }

  return newRoute;
}

function replaceRoutePlace (route: string, placeId: string): string {
  const placeParam: string = `place/${placeId}`;

  let newRoute: string;

  if (placeRegex.test(route)) {
    newRoute = route.replace(placeRegex, placeParam);
  } else {
    newRoute = route + placeParam;
  }

  return newRoute;
}

function getRouteParamFromCoords (coords: MapCoords): string {
  const { center, zoom } = coords;
  const lat: string = center.lat.toFixed(7);
  const lng: string = center.lng.toFixed(7);

  return `@${lat},${lng},${zoom}`;
}

export {
  replaceRouteCoords,
  replaceRoutePlace,
  getRouteParamFromCoords
};
