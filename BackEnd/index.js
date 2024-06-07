const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { initializeApp } =require('firebase/app');
const { getAuth,createUserWithEmailAndPassword} = require("firebase/auth");


const app = express();
//const mongoURI = 'mongodb+srv://admin:6Ikry9U4a88k1ktY@mininetflixdatabase.kgwvbmp.mongodb.net/?retryWrites=true&w=majority';
const mongoURI = 'mongodb+srv://admin:6Ikry9U4a88k1ktY@mininetflixdatabase.kgwvbmp.mongodb.net/MiniNetflix?retryWrites=true&w=majority&appName=MiniNetflixDatabase';
const port = 3000;
const firebaseConfig = {
  apiKey: "AIzaSyD2ws9DwWSj3cW5HaG4iDnkH7c60sIL5DE",
  authDomain: "experienciausuario-37738.firebaseapp.com",
  projectId: "experienciausuario-37738",
  storageBucket: "experienciausuario-37738.appspot.com",
  messagingSenderId: "751453774480",
  appId: "1:751453774480:web:0f0dbc39c6c56387166e15",
  measurementId: "G-RHYSJ0TSF4"
};
const firebaseApp = initializeApp(firebaseConfig);
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDA0NGUwNWY5ZWUwYjRhODk5ZmJlYmI2NGVlZGRmNCIsInN1YiI6IjY2NWY2OTRiNzUyZWQ1YjBlYTdkNWI2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZL-TdUZdqjUPNDAFdssr8RzL2DIGvJpp0N40sesXGU";

//Base de datos - Todo lo relacionado a MongoDB
/*Aquí establecemos la conexión a Mongo */
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

/*Aquí creamos un esquema a Mongo */
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
  nombre: String,
  apellido: String,
  _id: String,
  correo: String,
  ubicacion:String
});

const peliculasFavoritasSchema = new Schema({
  usuarioId: { type: String, required: true },
  _id: [{ type: String }]
});



/*Aquí creamos un modelo en Mongo */
const Usuario = mongoose.model('Usuario', usuarioSchema);
const PeliculasFav = mongoose.model('PeliculasFav', peliculasFavoritasSchema)



//Rutas de conexión
/*Agregar un usuario a la base de datos */
app.post('/agregarUsuario', async (req, res) => {
  const auth = getAuth(firebaseApp);
  const { email, password, nombre, apellido, ubicacion } = req.body;

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredentials.user.uid;

    const nuevoUsuario = new Usuario({
      nombre: nombre,
      apellido: apellido,
      _id: uid,  // Usar el UID de Firebase como _id en MongoDB
      correo:email,
      ubicacion: ubicacion
    });

    await nuevoUsuario.save();

    console.log('Nuevo usuario creado:', nuevoUsuario);
    res.status(201).send('Nuevo usuario creado: ' + nuevoUsuario);
  } catch (err) {
    console.error('Error al crear el usuario:', err);
    res.status(500).send('Error al crear el usuario: ' + err.message);
  }
});


/*Buscar un usuario en la base de datos */
app.post('/buscarUsuario', async (req, res) => {
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
});

/*Este codigo produce una cantidad especifica de informacion sobre peliculas completamente aleatorias  */
app.post('/obtenerPeliculasAleatorias', async (req, res) => {
  const urlBase = "https://api.themoviedb.org/3/movie/";
  const apiKey = '14044e05f9ee0b4a899fbebb64eeddf4';
  const numPeliculas = req.body.numPeliculas; 
  let peliculas = [];
  if (!numPeliculas || isNaN(numPeliculas) || numPeliculas <= 0) {
    return res.status(400).send('Número de películas no válido');
  }
  try {
    for (let index = 0; index < numPeliculas; index++) {
      const idAleatorio = Math.floor(Math.random() * 1000000);
      try {
        const response = await axios.get(`${urlBase}${idAleatorio}?api_key=${apiKey}`);
        if (response.data && response.data.id) {
          peliculas.push(response.data);
        } else {
          index--; 
        }
      } catch (error) {
        console.error(`Error al obtener la película con ID ${idAleatorio}:`, error.message);
        index--; 
      }
    }
    res.status(200).send(peliculas);
  } catch (err) {
    res.status(500).send('Error al buscar las películas: ' + err.message);
  }
});

app.post('/obetenerId', async (req,res)=>{
  axios.get('https://api.themoviedb.org/3/movie/157336/videos?api_key=14044e05f9ee0b4a899fbebb64eeddf4');
})



//API


axios.get('https://api.themoviedb.org/3/movie/157336?api_key=14044e05f9ee0b4a899fbebb64eeddf4')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
