const express = require('express');
const { marcarFavorita, encontrarPorNombre, obtenerAleatorio } = require('../controllers/peliculas.js')
const { validatorCreateItem } = require('../validators/ejemplo.js')
const router = express.Router();


router.put('/marcarFavorita', marcarFavorita);
router.post('/encontrarPorNombre', encontrarPorNombre);
router.post('/obtenerAleatorio', obtenerAleatorio);
router.get('/',)
module.exports = router;