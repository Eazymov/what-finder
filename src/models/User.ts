// Types
type UserInfo = firebase.UserInfo;
//

class User {
  public id: string;
  public name: string | null;
  public email: string | null;
  public photoURL: string | null;
  public phoneNumber: string | null;
  public providerId: string;

  constructor(userData: UserInfo) {
    this.id = userData.uid;
    this.name = userData.displayName;
    this.email = userData.email;
    this.photoURL = userData.photoURL;
    this.phoneNumber = userData.phoneNumber;
    this.providerId = userData.providerId;
  }
}

export default User;
