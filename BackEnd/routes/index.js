const express = require('express');
const fs = require('fs')
const router = express.Router();

const PATH_Routes = __dirname;

const removeExtention = (fileName) => {
    return fileName.split('.').shift();
}

const a = fs.readdirSync(PATH_Routes).filter((file) => {
    const name = removeExtention(file);
    if (name != 'index') {
        router.use(`/${name}`, require(`./${file}`));
    }
})



module.exports = router;