const { check } = require('express-validator');
const validateResult = require('../utils/handleValidator.js');

const validatorCreateItem = [
    check("name").exists().notEmpty().isLength({ min: 5, max: 90 }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validatorCreateItem };