// Import
const express = require('express');
const router = require('express').Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

//Importation du middleware de configuration de multer
const multer = require('../middlewares/multer');

// Utilisation d'un limiter pour éviter les trop nombreuses tentatives de connexion
const max = require("../middlewares/limiter"); 

// Les différentes routes utilisateur
// Créer un nouvel utilisateur
router.post('/signup', userCtrl.signup);
// Connecte un utilisateur
router.post('/login', max.limiter, userCtrl.login);
// Modifie le profil d'un utilisateur
router.put('/update/:id', auth, multer, userCtrl.update);
// Affiche le profil d'un utilisateur
router.get('/:id', userCtrl.getOneUser);
// Supprime d'un compte utilisateur deja existant
router.delete('/delete/:id', multer, userCtrl.deleteUser);

module.exports = router;
