// Types
type User = App.User;
type MapCoords = App.MapCoords;
//

const prefix: string = 'what-finder';
const localStorage = window.localStorage;

const Storage = {
  defaultCoords: {
    center: {
      lat: 55.75,
      lng: 37.61
    },
    zoom: 12
  },

  setUser (user: User): void {
    const userJSON = JSON.stringify(user);

    localStorage.setItem(`${prefix}.user`, userJSON);
  },

  getUser (): User | undefined {
    const savedUser = localStorage.getItem(`${prefix}.user`);

    return savedUser ? JSON.parse(savedUser) : null;
  },

  removeUser (): void {
    localStorage.removeItem(`${prefix}.user`);
  },

  setLastCoords (coords: MapCoords): void {
    const coordsJSON = JSON.stringify(coords);

    localStorage.setItem(`${prefix}.lastCoords`, coordsJSON);
  },

  getLastCoords (): MapCoords | undefined {
    const savedCoords = localStorage.getItem(`${prefix}.lastCoords`);

    return savedCoords ? JSON.parse(savedCoords) : undefined;
  }
};

export default Storage;
