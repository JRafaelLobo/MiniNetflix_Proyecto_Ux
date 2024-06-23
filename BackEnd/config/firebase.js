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

let auth1;
const iniciar = async () => {
    const firebaseApp = await initializeApp(firebaseConfig);
    auth1 = getAuth(firebaseApp);
    console.log('Se ha conectado el firebase');
}
const auth = () => {
    return auth1;
}
module.exports = { iniciar, auth };
