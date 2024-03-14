const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auteur'
    },
    editeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editeur'
    },
    categorie: {
        type: String
    },
    annee_publication: {
        type: Number
    }
});

module.exports = mongoose.model('Livre', livreSchema);