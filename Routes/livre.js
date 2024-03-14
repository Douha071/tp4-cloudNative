const express = require('express');
const router = express.Router();
const Livre = require('./Models/LivresModel');
const { verifyToken } = require('./Middlewares/auth');


router.use(verifyToken);


router.get('/all', async (req, res) => {
    try {
        const livres = await Livre.find();
        res.json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/add', async (req, res) => {
    const livre = new Livre({
        titre: req.body.titre,
        auteur: req.body.auteur,
        editeur: req.body.editeur,
        categorie: req.body.categorie,
        annee_publication: req.body.annee_publication
    });

    try {
        const newLivre = await livre.save();
        res.status(201).json(newLivre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/auteurs/:livrename', async (req, res) => {
    try {
        const livre = await Livre.findOne({ titre: req.params.livrename });
        if (livre) {
            res.json(livre.auteur);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/editeurs/:livrename', async (req, res) => {
    try {
        const livre = await Livre.findOne({ titre: req.params.livrename });
        if (livre) {
            res.json(livre.editeur);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/listCategorie/:category', async (req, res) => {
    try {
        const livres = await Livre.find({ categorie: req.params.category });
        res.json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:annee1/:annee2', async (req, res) => {
    try {
        const livres = await Livre.find({
            annee_publication: { $gte: req.params.annee1, $lte: req.params.annee2 }
        });
        res.json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/update/:name', async (req, res) => {
    try {
        const livre = await Livre.findOne({ titre: req.params.name });
        if (livre) {
            livre.titre = req.body.titre;
            livre.auteur = req.body.auteur;
            livre.editeur = req.body.editeur;
            livre.categorie = req.body.categorie;
            livre.annee_publication = req.body.annee_publication;
            const updatedLivre = await livre.save();
            res.json(updatedLivre);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/delete/:name', async (req, res) => {
    try {
        const livre = await Livre.findOneAndDelete({ titre: req.params.name });
        if (livre) {
            res.json({ message: "Livre supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
