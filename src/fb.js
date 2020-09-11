import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDuXVqTAzQuzOvVWwGcT5gS7WmTxmc4zm8',
  authDomain: 'nepvine.firebaseapp.com',
  databaseURL: 'https://nepvine.firebaseio.com',
  projectId: 'nepvine',
  storageBucket: 'nepvine.appspot.com',
  messagingSenderId: '572558959088',
  appId: '1:572558959088:web:91a53d2048675f79753d35',
  measurementId: 'G-C77E7YQZX6',
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
export default firebase
