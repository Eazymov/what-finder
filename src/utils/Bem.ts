import { isString } from 'Utils/is'

type Modifiers = {
  [key: string]: boolean
}

const modifiersToClass = (base: string, modifiers: Modifiers): string => {
  let modifierKeys: string[] = Object
    .keys(modifiers)
    .filter((key: string) => {
      return modifiers[key]
    })

  return modifierKeys.map((modifier: string) => {
    return `${base}--${modifier}`
  }).join(' ')
}

class Bem {
  private blockName: string

  constructor (blockName: string) {
    if (!isString(blockName)) {
      throw new Error('blockName must present')
    }

    this.blockName = blockName
  }

  public block = (modifiers?: Modifiers): string => {
    const { blockName } = this

    if (!modifiers) {
      return blockName
    }

    const modifierClasses = modifiersToClass(blockName, modifiers)

    return `${blockName} ${modifierClasses}`
  }

  public element = (elementName: string, modifiers?: Modifiers): string => {
    if (!isString(elementName)) {
      throw new Error('Element name must be a string')
    }

    const className: string = `${this.blockName}__${elementName}`

    if (!modifiers) {
      return className
    }

    const modifierClasses = modifiersToClass(className, modifiers)

    return `${className} ${modifierClasses}`
  }
}

export default Bem
