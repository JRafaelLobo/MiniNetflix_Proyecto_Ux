const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
    {
        nombre: { type: String },
        apellido: { type: String },
        _id: { type: String },
        correo: { type: String },
        ubicacion: { type: String }
    }, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Usuario', usuarioSchema)