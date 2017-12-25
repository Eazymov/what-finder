/* tslint:disable */
const MOBILE_BROWSER_REGEX: RegExp = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
/* tslint:enable */
const FLOAT_REGEX: string = '[+-]?([0-9]*[.])?[0-9]+'
const COORDS_REGEX: RegExp = new RegExp(`@${FLOAT_REGEX},${FLOAT_REGEX},${FLOAT_REGEX}`)
const PLACE_REGEX: RegExp = /place\/.*/

export {
  MOBILE_BROWSER_REGEX,
  COORDS_REGEX,
  FLOAT_REGEX,
  PLACE_REGEX,
}
