const { validatorResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validatorResult(req).throw();
        return next();
    } catch (err) {
        res.status(403);
        res.send({ errors: err.array() });
    }
};

module.exports = validateResult; 