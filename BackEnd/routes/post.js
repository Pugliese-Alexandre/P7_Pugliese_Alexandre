// Import
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

//Importation des controllers
const postsCtrl = require('../controllers/post');

//Importation du middleware de configuration de multer
const multer = require('../middlewares/multer');


// Les différentes routes pour les articles
// Créer un nouvel article
router.post('/', auth, multer, postsCtrl.createPost);
// Modification d'un article
router.put('/:id', auth, multer, postsCtrl.modifyPost);
// Suppression d'un article
router.delete('/:id', auth, postsCtrl.deletePost);


module.exports = router;