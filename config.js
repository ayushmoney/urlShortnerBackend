const { initializeApp } = require('firebase/app');
require('dotenv').config();
const { getFirestore} = require('firebase/firestore');
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
 module.exports = db;