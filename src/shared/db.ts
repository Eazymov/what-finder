import firebase from 'firebase/index.js'

type AuthProvider = firebase.auth.AuthProvider

const db = firebase.initializeApp({
  apiKey: 'AIzaSyC-SguVlp91tIuIM9pBY4-yTqM9_us8jrg',
  authDomain: 'react-maps-api-app.firebase.com',
  databaseURL: 'https://react-maps-api-app.firebaseio.com',
})

const FacebookAuthProvider: AuthProvider = new firebase.auth.FacebookAuthProvider()
const GithubAuthProvider: AuthProvider = new firebase.auth.GithubAuthProvider()
const GoogleAuthProvider: AuthProvider = new firebase.auth.GoogleAuthProvider()
const TwitterAuthProvider: AuthProvider = new firebase.auth.TwitterAuthProvider()

const authMethods = [
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
]

export {
  authMethods
}

export default db
