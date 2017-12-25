import { PLACE_REGEX } from 'Constants/regexps'

function replaceRoutePlace (route: string, placeId: string): string {
  const placeParam: string = `place/${placeId}`

  let newRoute: string

  if (PLACE_REGEX.test(route)) {
    newRoute = route.replace(PLACE_REGEX, placeParam)
  } else {
    newRoute = route + placeParam
  }

  return newRoute
}

export default replaceRoutePlace
