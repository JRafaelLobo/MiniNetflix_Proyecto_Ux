const { userModel } = require('../models/index')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const firebaseApp = require('../config/firebase')

/**
 * LogIn de Usuario
 * @param {*} req 
 * @param {*} res 
 */
const logIn = async (req, res) => {
    const auth = getAuth(firebaseApp);
    const email = req.body.email;
    const password = req.body.password;

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        res.status(200).send("Sesión inciada con éxito");
    } catch (err) {
        res.status(500).send('Error al iniciar sesion: ' + err.message);
    }
}

/**
 * LogOut de Usuario
 * @param {*} req 
 * @param {*} res 
 */
const logOut = async (req, res) => {
    const auth = getAuth(firebaseApp);
    try {
        await signOut(auth);
        res.status(200).send("Sesión cerrada con éxito");
    } catch (err) {
        res.status(500).send('Error al cerrar sesión: ' + err.message);
    }
}

/**
 * 
 */
const buscar = async (req, res) => {
    try {
        const { _id } = req.body;
        const existeUsuario = await Usuario.find({ _id });
        if (existeUsuario != 0) {
            res.status(200).send('Usuario existe en la base de datos: ' + existeUsuario);
        } else {
            res.status(404).send('Usuario no encontrado en la base de datos');
        }
    } catch (err) {
        res.status(500).send('Error al buscar el usuario: ' + err.message);
    }
};

/**
 * Crea el usuario
 * @param {*} req 
 * @param {*} res 
 */
const agregar = async (req, res) => {
    const auth = getAuth(firebaseApp);
    const { email, password, nombre, apellido, ubicacion } = req.body;

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredentials.user.uid;

        const nuevoUsuario = new userModel({
            nombre: nombre,
            apellido: apellido,
            _id: uid,  // Usar el UID de Firebase como _id en MongoDB
            correo: email,
            ubicacion: ubicacion
        });

        await nuevoUsuario.save();

        console.log('Nuevo usuario creado:', nuevoUsuario);
        res.status(201).send('Nuevo usuario creado: ' + nuevoUsuario);
    } catch (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).send('Error al crear el usuario: ' + err.message);
    }
}

module.exports = { logIn, logOut, buscar, agregar }