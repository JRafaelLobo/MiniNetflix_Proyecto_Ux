const mongoose = require('mongoose');

const dbConnect = async () => {
    const db_url = process.env.db_url;
    try {
        await mongoose.connect(db_url);
        console.log('La Base de datos se ha conectado correctamente');
        console.log(process.env.db_url)
    } catch (err) {
        console.log('La base de datos ha dado un error:', err);
    }

}

module.exports = dbConnect;