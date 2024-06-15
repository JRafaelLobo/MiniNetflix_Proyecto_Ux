const mongoose = require('mongoose');


const dbConnect = async () => {
    const db_url = process.env.DB_url;
    try {
        await mongoose.connect(db_url);
        console.log('La Base de datos se ha conectado correctamente');
    } catch (err) {
        console.log('La base de datos ha dado un error:', err);
    }

}

module.exports = dbConnect;