const express = require('express');
const router = express.Router();
const User = require('./Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.use(verifyToken);


router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/names', async (req, res) => {
    try {
        const names = await User.find().select('nom_complet');
        res.json(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/add', async (req, res) => {
    const user = new User({
        email: req.body.email,
        nom_complet: req.body.nom_complet,
        username: req.body.username,
        mdp: req.body.mdp
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/update/:name', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.name });
        if (user) {
            user.email = req.body.email;
            user.nom_complet = req.body.nom_complet;
            user.mdp = req.body.mdp;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/delete/:name', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ username: req.params.name });
        if (user) {
            res.json({ message: "Utilisateur supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
