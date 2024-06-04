const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const mongoURI = 'mongodb+srv://admin:6Ikry9U4a88k1ktY@mininetflixdatabase.kgwvbmp.mongodb.net/?retryWrites=true&w=majority&appName=MiniNetflixDatabase';
const port = 3000; 

// Configuración de CORS
app.use(cors());

const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDA0NGUwNWY5ZWUwYjRhODk5ZmJlYmI2NGVlZGRmNCIsInN1YiI6IjY2NWY2OTRiNzUyZWQ1YjBlYTdkNWI2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZL-TdUZdqjUPNDAFdssr8RzL2DIGvJpp0N40sesXGU";

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

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
