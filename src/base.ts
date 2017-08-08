// Types
type Database = App.Database;
type AuthProvider = firebase.auth.AuthProvider;
//

import * as firebase from 'firebase';

const base: Database = firebase.initializeApp({
  apiKey: 'AIzaSyC-SguVlp91tIuIM9pBY4-yTqM9_us8jrg',
  authDomain: 'react-maps-api-app.firebaseapp.com',
  databaseURL: 'https://react-maps-api-app.firebaseio.com',
});

const FacebookAuthProvider: AuthProvider = new firebase.auth.FacebookAuthProvider();
const GithubAuthProvider: AuthProvider = new firebase.auth.GithubAuthProvider();
const GoogleAuthProvider: AuthProvider = new firebase.auth.GoogleAuthProvider();
const TwitterAuthProvider: AuthProvider = new firebase.auth.TwitterAuthProvider();

base.authMethods = [
  {
    name: 'Facebook',
    provider: FacebookAuthProvider,
  }, {
    name: 'Github',
    provider: GithubAuthProvider,
  }, {
    name: 'Google',
    provider: GoogleAuthProvider,
  }, {
    name: 'Twitter',
    provider: TwitterAuthProvider,
  },
];

export default base;
