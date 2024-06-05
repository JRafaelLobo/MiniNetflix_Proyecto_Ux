const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
//const mongoURI = 'mongodb+srv://admin:6Ikry9U4a88k1ktY@mininetflixdatabase.kgwvbmp.mongodb.net/?retryWrites=true&w=majority';
const mongoURI = 'mongodb+srv://admin:6Ikry9U4a88k1ktY@mininetflixdatabase.kgwvbmp.mongodb.net/MiniNetflix?retryWrites=true&w=majority&appName=MiniNetflixDatabase';
const port = 3000;

// Configuración de CORS
app.use(cors());

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
  contraseña: String
});

const peliculasFavoritasSchema = new Schema({
  usuarioId: { type: String, required: true },
  _id: [{ type: String }]
});



/*Aquí creamos un modelo en Mongo */
const Usuario = mongoose.model('Usuario', usuarioSchema);
const PeliculasFav = mongoose.model('PeliculasFav',peliculasFavoritasSchema)


/*Aqui guardamos un usuario */
// const nuevoUsuario = new Usuario({
//   nombre: 'Marcela',
//   apellido: 'Tovar',
//   _id: 'marcela.tovar@example.com',
//   contraseña: 'password123'
// });

// nuevoUsuario.save()
//   .then(doc => {
//     console.log('Nuevo usuario creado:', doc);
//   })
//   .catch(err => {
//     console.error('Error al crear el usuario:', err);
//   });

//Rutas de conexión


//API
app.get('/', (req, res) => {
  res.send('<h1>Buenas</h1>');
});

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
