const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const firebaseConfig = {
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebaseMessagingSenderId,
    appId: process.env.firebaseAppId,
    measurementId: process.env.firebaseMeasurementId
};

let authOriginal;
const iniciar = async () => {
    const firebaseApp = await initializeApp(firebaseConfig);
    authOriginal = getAuth(firebaseApp);
    console.log('Se ha conectado el firebase');
}
const auth = () => {
    return authOriginal;
}
module.exports = { iniciar, auth };
