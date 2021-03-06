import { User, MapCoords } from 'Types'

const prefix: string = 'what-finder'
const localStorage = window.localStorage

const Storage = {
  defaultCoords: {
    center: {
      lat: 55.75,
      lng: 37.61
    },
    zoom: 12
  },

  setUser (user: User): void {
    const userJSON = JSON.stringify(user)

    localStorage.setItem(`${prefix}.user`, userJSON)
  },

  getUser (): User | undefined {
    const savedUser = localStorage.getItem(`${prefix}.user`)

    return savedUser ? JSON.parse(savedUser) : undefined
  },

  removeUser (): void {
    localStorage.removeItem(`${prefix}.user`)
  },

  setLastCoords (coords: MapCoords): void {
    const { center: { lat, lng }, zoom } = coords
    const isInvalid = [lat, lng, zoom].some(isNaN)

    if (isInvalid) {
      return
    }

    const coordsJSON = JSON.stringify(coords)

    localStorage.setItem(`${prefix}.lastCoords`, coordsJSON)
  },

  getLastCoords (): MapCoords | undefined {
    const savedCoords = localStorage.getItem(`${prefix}.lastCoords`)

    return savedCoords ? JSON.parse(savedCoords) : undefined
  }
}

export default Storage
