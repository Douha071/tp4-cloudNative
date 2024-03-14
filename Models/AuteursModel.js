const mongoose = require('mongoose');

const auteurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    nationalite: {
        type: String
    },
    date_naissance: {
        type: Date
    },
    date_deces: {
        type: Date
    }
});

module.exports = mongoose.model('Auteur', auteurSchema);