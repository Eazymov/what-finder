import { MOBILE_BROWSER_REGEX } from 'Constants/regexps'

const isString = (arg: any): arg is string => {
  return typeof arg === 'string'
}

const isMobileDevice = (): boolean => {
  return MOBILE_BROWSER_REGEX.test(navigator.userAgent)
}

export {
  isString,
  isMobileDevice,
}
