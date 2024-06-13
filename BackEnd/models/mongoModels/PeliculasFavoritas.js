const mongoose = require('mongoose');

const peliculasFavoritasSchema = new mongoose.Schema(
    {
        usuarioId: { type: String, required: true, unique: true },
        peliculas: [{ type: String }]
    }, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('PeliculasFav', peliculasFavoritasSchema);