import * as firebase from 'firebase'
// import firestore from firebase/firestore

const firebaseConfig = {
    apiKey: "AIzaSyAdc2gAF0D2ksJb1eLcbrtLgaRnw9khXFM",
    authDomain: "to-do-list-881a6.firebaseapp.com",
    databaseURL: "https://to-do-list-881a6.firebaseio.com",
    projectId: "to-do-list-881a6",
    storageBucket: "to-do-list-881a6.appspot.com",
    messagingSenderId: "163426287512",
    appId: "1:163426287512:web:e382e523949a10495335ed",
    measurementId: "G-9G48LFCFL6"
};

firebase.initializeApp(firebaseConfig)

export default firebase