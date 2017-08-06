import * as firebase from 'firebase';

const base: App.Database = firebase.initializeApp({
  apiKey: 'AIzaSyC-SguVlp91tIuIM9pBY4-yTqM9_us8jrg',
  authDomain: 'react-maps-api-app.firebaseapp.com',
  databaseURL: 'https://react-maps-api-app.firebaseio.com'
});

export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const TwitterAuthProvider = new firebase.auth.TwitterAuthProvider();

base.authMethods = [
  {
    name: 'Facebook',
    provider: FacebookAuthProvider
  }, {
    name: 'Github',
    provider: GithubAuthProvider
  }, {
    name: 'Google',
    provider: GoogleAuthProvider
  }, {
    name: 'Twitter',
    provider: TwitterAuthProvider
  }
];

export default base;
