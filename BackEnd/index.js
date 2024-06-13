require("dotenv").config()
const express = require('express');
const dbConnect = require('./config/mongo.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.Port || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./routes'));

// Middleware

const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDA0NGUwNWY5ZWUwYjRhODk5ZmJlYmI2NGVlZGRmNCIsInN1YiI6IjY2NWY2OTRiNzUyZWQ1YjBlYTdkNWI2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZL-TdUZdqjUPNDAFdssr8RzL2DIGvJpp0N40sesXGU";


app.post('/buscarUnicaPelicula', async (req, res) => {

});

/*Funcion para marcar una pelicula como favorita */

app.listen(port, () => {
  console.log('Server running on port ' + port);
});


dbConnect();