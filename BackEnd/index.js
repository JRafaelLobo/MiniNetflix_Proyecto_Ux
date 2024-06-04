const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const mongoURI = 'mongodb+srv://admin:6Ikry9U4a88k1ktY@mininetflixdatabase.kgwvbmp.mongodb.net/?retryWrites=true&w=majority&appName=MiniNetflixDatabase';
const port = 5001;

//Conexion a cors
app.use(cors())

//Rafa Base
//User admin
//password: 6Ikry9U4a88k1ktY
//Enlace de Conexion: mongodb+srv://admin:6Ikry9U4a88k1ktY@mininetflixdatabase.kgwvbmp.mongodb.net/?retryWrites=true&w=majority&appName=MiniNetflixDatabase

//Marcela BAse
//User: tovarmarcela518
//Password: KaHwYrVXNZct328D
//Enlace de Conexion: mongodb+srv://tovarmarcela518:<KaHwYrVXNZct328D>@mininetflix.kbk7hsd.mongodb.net/?retryWrites=true&w=majority&appName=MiniNetflix

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

  app.options('*', cors())

app.get('/', (req, res) => {
    res.send('<h1>Buenas</h1>')
})

app.listen(port, () => {
    console.log('Port is ' + port)
})