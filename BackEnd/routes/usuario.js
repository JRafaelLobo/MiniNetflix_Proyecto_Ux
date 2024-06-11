const express = require('express');
const { logIn, logOut, buscar, agregar } = require('../controllers/usuario.js')
const { validatorCreateItem } = require('../validators/ejemplo.js')
const router = express.Router();


router.post('/logIn', logIn);
router.post('/logOut', logOut);
router.post('/buscar', buscar);
router.post('/agregar', agregar);


module.exports = router;