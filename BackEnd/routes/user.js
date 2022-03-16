// Import
const router = require('express').Router();
const userCtrl = require('../controllers/user');

// Les différentes routes utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//Ajouter une route pour supprimer un utilisateur
//Ajouter une route pour Modifier un utilisateur


module.exports = router;
