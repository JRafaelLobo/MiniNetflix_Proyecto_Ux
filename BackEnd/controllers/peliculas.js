const { getMovieDataID, getMovieDataName, getRandomMovies, getVideoIds } = require('../config/axios');
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

  /*
    try {
      for (let index = 0; index < numPeliculas; index++) {
        const idAleatorio = Math.floor(Math.random() * 1000000);
        try {
          const response = await getMovieData(idAleatorio);
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
  */
}
/**
 * Funcion para obtener videos
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const obtenerVideos = async (req, res) => {
  const idPelicula = req.body.id;
  const youtubeBasico = "https://www.youtube.com/watch?v=";

  try {
    const idVideos = await getVideoIds(idPelicula);
    const response = idVideos.map(videoId => youtubeBasico + videoId);
    res.json(response);
  } catch (error) {
    console.error('Error al obtener los videos:', error.message);
    res.status(500).send('Error al obtener los videos: ' + error.message);
  }
};

/**
 * Funcion para obtener las peliculas favoritas de ese usuario
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const obtenerPeliculasFavoritas = async (req, res) => {
  const { idUsuario } = req.body;
  if (!idUsuario) {
    return res.status(400).send("Falta el userId");
  }
  try {
    const peliculasFav = await peliculasFavoritasModel.findOne({ usuarioId: idUsuario });
    if (!peliculasFav) {
      return res.status(404).send("No se encontraron películas favoritas para este usuario");
    } else {
      return res.status(200).send(peliculasFav.peliculas);
    }
  } catch (error) {
    console.error('Error al obtener las películas favoritas:', error);
    res.status(500).send('Error al obtener las películas favoritas');
  }
};

/**
 * Funcion para borrar una pelicula favorita de ese usuario
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const borrarPeliculaFavorita = async (req,res) => {
  const {idUsuario,idPeliculaEliminar} = req.body;
  if (!idUsuario || !idPeliculaEliminar) {
    return res.status(400).send("Falta el userId o el idPelicula");
  }
  try {
    const resultado = await peliculasFavoritasModel.updateOne(
      { usuarioId: idUsuario },
      { $pull: { peliculas: idPeliculaEliminar } }
    );
    if (resultado.modifiedCount > 0) {
      res.status(200).send("Película eliminada de favoritos");
    } else {
      res.status(404).send("Película no encontrada en favoritos o usuario no encontrado");
    }
  } catch (error) {
    console.error('Error al borrar la película favorita:', error);
    res.status(500).send('Error al borrar la película favorita');
  }
}
module.exports = { marcarFavorita, encontrarPorNombre, obtenerAleatorio,obtenerVideos,obtenerPeliculasFavoritas,borrarPeliculaFavorita };