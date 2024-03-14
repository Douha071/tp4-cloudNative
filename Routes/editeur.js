const express = require('express');
const router = express.Router();
const Editeur = require('./Models/EditeursModel');


router.get('/all', async (req, res) => {
    try {
        const editeurs = await Editeur.find();
        res.json(editeurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/names', async (req, res) => {
    try {
        const names = await Editeur.find().select('nom');
        res.json(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/add', async (req, res) => {
    const editeur = new Editeur({
        nom: req.body.nom,
        pays: req.body.pays,
        date_creation: req.body.date_creation
    });

    try {
        const newEditeur = await editeur.save();
        res.status(201).json(newEditeur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/update/:name', async (req, res) => {
    try {
        const editeur = await Editeur.findOne({ nom: req.params.name });
        if (editeur) {
            editeur.nom = req.body.nom;
            editeur.pays = req.body.pays;
            editeur.date_creation = req.body.date_creation;
            const updatedEditeur = await editeur.save();
            res.json(updatedEditeur);
        } else {
            res.status(404).json({ message: "Éditeur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:name', async (req, res) => {
    try {
        const editeur = await Editeur.findOneAndDelete({ nom: req.params.name });
        if (editeur) {
            res.json({ message: "Éditeur supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Éditeur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
