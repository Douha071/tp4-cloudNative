const express = require('express');
const router = express.Router();
const Auteur = require('./Models/AuteursModel');


router.use(verifyToken);


router.get('/all', async (req, res) => {
    try {
        const auteurs = await Auteur.find();
        res.json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/names', async (req, res) => {
    try {
        const names = await Auteur.find().select('nom');
        res.json(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/add', async (req, res) => {
    const auteur = new Auteur({
        nom: req.body.nom,
        nationalite: req.body.nationalite,
        date_naissance: req.body.date_naissance,
        date_deces: req.body.date_deces
    });

    try {
        const newAuteur = await auteur.save();
        res.status(201).json(newAuteur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/update/:name', async (req, res) => {
    try {
        const auteur = await Auteur.findOne({ nom: req.params.name });
        if (auteur) {
            auteur.nationalite = req.body.nationalite;
            auteur.date_naissance = req.body.date_naissance;
            auteur.date_deces = req.body.date_deces;
            const updatedAuteur = await auteur.save();
            res.json(updatedAuteur);
        } else {
            res.status(404).json({ message: "Auteur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/delete/:name', async (req, res) => {
    try {
        const auteur = await Auteur.findOneAndDelete({ nom: req.params.name });
        if (auteur) {
            res.json({ message: "Auteur supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Auteur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
