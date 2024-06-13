const express = require('express');
const { marcarFavorita, encontrarPorNombre, obtenerAleatorio, getMoviesByCategory } = require('../controllers/peliculas.js')
const { validatorCreateItem } = require('../validators/ejemplo.js')
const router = express.Router();


router.put('/marcarFavorita', marcarFavorita);
router.post('/encontrarPorNombre', encontrarPorNombre);
router.post('/obtenerAleatorio', obtenerAleatorio);
router.post('/obtenerAleatorioPorCategorias', getMoviesByCategory);

module.exports = router;