const { getMovieDataID, getMovieDataName, getRandomMovies, getMoviesByCategoryRandom } = require('../config/axios');
const { peliculasFavoritasModel } = require('../models/index');


/**
 * Funcion para marcar una pelicula como favorita 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const marcarFavorita = async (req, res) => {
  const { userId, idPelicula } = req.body;

  if (!userId || !idPelicula) {
    return res.status(400).send("Faltan datos: userId o idPelicula");
  }

  try {
    const response = await getMovieDataID(idPelicula);
    if (response && response.id) {
      let peliculasFav = await peliculasFavoritasModel.findOne({ usuarioId: userId });

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

  if (!req.body.nombre) {
    return res.status(400).send("No se envió el nombre");
  }
  try {
    const data = await getMovieDataName(req.body.nombre);

    if (data.results && data.results.length > 0) {
      res.status(200).json(data.results);
    } else {
      res.status(404).send("Película no encontrada");
    }
  } catch (error) {
    console.error('Error al buscar la película:', error);
    res.status(500).send("Error al buscar la película");
  }
}

/**
 * Este codigo produce una cantidad especifica de informacion sobre peliculas completamente aleatorias 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const obtenerAleatorio = async (req, res) => {
  const numPeliculas = req.body.numPeliculas;
  if (!numPeliculas || isNaN(numPeliculas) || numPeliculas <= 0) {
    return res.status(400).send('Número de películas no válido');
  }
  const response = await getRandomMovies(numPeliculas);
  res.send(response);
}

const getMoviesByCategory = async (req, res) => {
  await console.log(req.body.categoryId, req.body.numPeliculas);
  getMoviesByCategoryRandom(req.body.categoryId, req.body.numPeliculas)
    .then(peliculas => {
      console.log("si")
      console.log(peliculas)
      res.send(peliculas)
    })
    .catch(error => {
      console.log("no");
      console.error(error);
    });
}

module.exports = { marcarFavorita, encontrarPorNombre, obtenerAleatorio, getMoviesByCategory };