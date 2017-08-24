/**
 * Types
 */
type MapCoords = App.MapCoords;
/* *** */

const float: string = '[+-]?([0-9]*[.])?[0-9]+';
const coordsRegex: RegExp = new RegExp(`@${float},${float},${float}`);
const placeRegex: RegExp = /place\/.*/;

function getNewRouteCoords (coords: MapCoords): string {
  const pathname: string = window.location.pathname;
  const newCoordsRoute: string = getRouteParamFromCoords(coords);
  const [oldCoordsRoute]: string[] = pathname.match(coordsRegex) || [''];

  if (!oldCoordsRoute) {
    return newCoordsRoute + pathname;
  }

  const newUrl: string = pathname.replace(coordsRegex, newCoordsRoute);

  return newUrl;
}

function getNewRoutePlace (placeId: string): string {
  const newRoute: string = `place/${placeId}`;
  const oldUrl: string = window.location.pathname;
  const newUrl: string = oldUrl.replace(placeRegex, newRoute);

  return newUrl;
}

function getRouteParamFromCoords (coords: MapCoords): string {
  const { center, zoom } = coords;
  const lat: string = center.lat.toFixed(7);
  const lng: string = center.lng.toFixed(7);

  return `@${lat},${lng},${zoom}`;
}

export {
  getNewRouteCoords,
  getNewRoutePlace,
  getRouteParamFromCoords
};
