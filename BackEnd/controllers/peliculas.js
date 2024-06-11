const getMovieData = require('../config/axios');
const { peliculasFavoritasModel } = require('../models/index');


/**
 * Funcion para marcar una pelicula como favorita 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const marcarFavorita = async (req, res) => {
  const apiKey = '14044e05f9ee0b4a899fbebb64eeddf4';
  const { userId, idPelicula } = req.body;

  if (!userId || !idPelicula) {
    return res.status(400).send("Faltan datos: userId o idPelicula");
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${idPelicula}`, {
      params: {
        api_key: apiKey
      }
    });

    if (response.data && response.data.id) {
      let peliculasFav = await PeliculasFav.findOne({ usuarioId: userId });

      if (!peliculasFav) {
        peliculasFav = new peliculasFavoritasModel({
          usuarioId: userId,
          peliculas: [idPelicula]
        });
      } else {
        if (peliculasFav.peliculas.includes(idPelicula)) {
          return res.status(200).send("La película ya está marcada como favorita");
        }
        peliculasFav.peliculas.push(idPelicula);
      }

      await peliculasFav.save();
      res.status(200).send('Película marcada como favorita');
    } else {
      res.status(404).send("Película no encontrada");
    }
  } catch (error) {
    console.error('Error al marcar la película como favorita:', error);
    res.status(500).send("Error al marcar la película como favorita");
  }
}

/**
 * Funcion para encontrar una pelicula basandose en el nombre 
 * @param {*} req 
 * @param {*} res 
 */
const encontrarPorNombre = async (req, res) => {
  const apiKey = '14044e05f9ee0b4a899fbebb64eeddf4';
  if (!req.body.nombre) {
    res.status(200).send("No se envio el nombre");
  } else {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: apiKey,
          query: req.body.nombre
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        res.status(200).json(response.data.results);
      } else {
        res.status(404).send("Película no encontrada");
      }
    } catch (error) {
      console.error('Error al buscar la película:', error);
      res.status(500).send("Error al buscar la película");
    }
  }

}

/**
 * Este codigo produce una cantidad especifica de informacion sobre peliculas completamente aleatorias 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const obtenerAleatorio = async (req, res) => {
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
}

module.exports = { marcarFavorita, encontrarPorNombre, obtenerAleatorio };