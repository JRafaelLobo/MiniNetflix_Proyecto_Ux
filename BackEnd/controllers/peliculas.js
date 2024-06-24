const { getMovieDataID, getMovieDataName, getRandomMovies, getMoviesByCategoryRandom, getVideoIds, getMovieImage } = require('../config/axios');
const { peliculasFavoritasModel } = require('../models/index');
const { auth } = require('../config/firebase');
/**
 * Funcion para marcar una pelicula como favorita 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const marcarFavorita = async (req, res) => {

  const user = auth().currentUser;
  if (!user) {
    return res.status(401).send("Usuario no ha iniciado sesión");
  }

  const userId = user.uid;
  const { idPelicula } = req.body;

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
const obtenerPeliculasFavoritasID = async (req, res) => {
  const user = auth().currentUser;
  if (!user) {
    return res.status(401).send("Usuario no ha iniciado sesión");
  }

  const idUsuario = user.uid;

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
 * Funcion para obtener las peliculas favoritas de ese usuario
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const obtenerPeliculasFavoritas = async (req, res) => {
  const user = auth().currentUser;
  if (!user) {
    return res.status(401).send("Usuario no ha iniciado sesión");
  }

  const idUsuario = user.uid;

  try {
    const peliculasFav = await peliculasFavoritasModel.findOne({ usuarioId: idUsuario });
    if (!peliculasFav) {
      return res.status(404).send("No se encontraron películas favoritas para este usuario");
    } else {
      const peliculasArray = Array.isArray(peliculasFav.peliculas) ? peliculasFav.peliculas : [];

      // Obtener los detalles de cada película usando sus IDs
      const detallesPeliculas = await Promise.all(
        peliculasArray.map(async (idPelicula) => {
          try {
            const pelicula = await getMovieDataID(idPelicula);
            return pelicula;
          } catch (error) {
            console.error(`Error al obtener detalles de la película con ID ${idPelicula}:`, error);
            return null;
          }
        })
      );

      // Filtrar las películas que no se pudieron obtener
      const peliculasValidas = detallesPeliculas.filter(pelicula => pelicula !== null);

      return res.status(200).send(peliculasValidas);
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

const borrarPeliculaFavorita = async (req, res) => {
  const user = auth().currentUser;
  if (!user) {
    return res.status(401).send("Usuario no ha iniciado sesión");
  }

  const idUsuario = user.uid;

  const { idPeliculaEliminar } = req.body;
  if (!idPeliculaEliminar) {
    return res.status(400).send("Falta la idPelicula");
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

const getMoviesByCategory = async (req, res) => {
  const { endpoint, cantidad } = req.body;

  if (!endpoint || !cantidad) {
    return res.status(400).send("Faltan parámetros: endpoint o cantidad");
  }

  try {
    const movies = await getMoviesByCategoryRandom(endpoint, cantidad);
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error al obtener películas por categoría:', error);
    res.status(500).send('Error al obtener películas por categoría');
  }

}

const obtenerImagen = async (req, res) => {
  const { idPelicula } = req.body;
  if (!idPelicula) {
    return res.status(400).send("Falta el idPelicula");
  }
  try {
    const resultado = await getMovieImage(idPelicula);
    if (resultado) {
      res.send({ imageUrl: `https://image.tmdb.org/t/p/w500${resultado}` });
    } else {
      res.status(404).send("Película no encontrada");
    }
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    res.status(500).send('Error al obtener la imagen');
  }
}

module.exports = { obtenerPeliculasFavoritasID, marcarFavorita, encontrarPorNombre, obtenerAleatorio, obtenerVideos, obtenerPeliculasFavoritas, borrarPeliculaFavorita, getMoviesByCategory, obtenerImagen };

