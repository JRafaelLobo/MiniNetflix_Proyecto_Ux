const express = require('express');
<<<<<<< HEAD
const { marcarFavorita, encontrarPorNombre, obtenerAleatorio, obtenerVideos, obtenerPeliculasFavoritas, borrarPeliculaFavorita, getMoviesByCategory, obtenerImagen} = require('../controllers/peliculas.js')
=======
const { marcarFavorita, encontrarPorNombre, obtenerAleatorio, obtenerVideos, obtenerPeliculasFavoritas, borrarPeliculaFavorita, getMoviesByCategory } = require('../controllers/peliculas.js')
>>>>>>> af1bae32e9971277d43ade17c9b1e6a01a3efbb2
const { validatorCreateItem } = require('../validators/ejemplo.js')
const router = express.Router();


router.put('/marcarFavorita', marcarFavorita);
router.post('/encontrarPorNombre', encontrarPorNombre);
router.post('/obtenerAleatorio', obtenerAleatorio);
router.post('/obtenerVideos', obtenerVideos);
router.post('/obtenerVideos', obtenerVideos);
router.post('/obtenerPeliculasFavoritas', obtenerPeliculasFavoritas);
router.delete('/borrarPeliculaFavorita', borrarPeliculaFavorita);
router.post('/obtenerAleatorioPorCategorias', getMoviesByCategory);
<<<<<<< HEAD
router.post('/obtenerImagen',obtenerImagen)
=======
>>>>>>> af1bae32e9971277d43ade17c9b1e6a01a3efbb2

module.exports = router;