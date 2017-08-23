export const getNewRouteCoords = (newCoords: App.MapCoords) => {
  const { center, zoom } = newCoords;
  const lat: string = center.lat.toFixed(7);
  const lng: string = center.lng.toFixed(7);
  const newCoordsString = `@${lat},${lng},${zoom}`;
}