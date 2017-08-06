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

  setUser (user: App.User): void {
    const userJSON = JSON.stringify(user);

    localStorage.setItem(`${prefix}.user`, userJSON);
  },

  getUser (): App.User | null {
    const savedUser = localStorage.getItem(`${prefix}.user`);

    return savedUser ? JSON.parse(savedUser) : null;
  },

  removeUser (): void {
    localStorage.removeItem(`${prefix}.user`);
  },

  setLastCoords (coords: App.mapCoords): void {
    const coordsJSON = JSON.stringify(coords);

    localStorage.setItem(`${prefix}.lastCoords`, coordsJSON);
  },

  getLastCoords (): App.mapCoords | null {
    const savedCoords = localStorage.getItem(`${prefix}.lastCoords`);

    return savedCoords ? JSON.parse(savedCoords) : null;
  }
};

export default Storage;
