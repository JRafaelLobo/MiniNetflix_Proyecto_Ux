const express = require('express');
const { marcarFavorita, encontrarPorNombre, obtenerAleatorio, obtenerVideos, obtenerPeliculasFavoritas, borrarPeliculaFavorita, getMoviesByCategory } = require('../controllers/peliculas.js')
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

module.exports = router;