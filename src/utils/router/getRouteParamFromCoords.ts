import { MapCoords } from 'Types'

function getRouteParamFromCoords (coords: MapCoords): string {
  const { center, zoom } = coords
  const lat: string = center.lat.toFixed(7)
  const lng: string = center.lng.toFixed(7)

  return `@${lat},${lng},${zoom}`
}

export default getRouteParamFromCoords
