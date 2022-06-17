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

// Les différentes routes pour les commentaires
// Route poster un commentaire
router.post('/:id', auth, postsCtrl.createComment);
// Route DELETE pour supprimer un commentaire créé
router.delete('/:postId/comment/:id', auth, postsCtrl.deleteComment);

// Les routes pour Like/Dislike un post
// Crée une route pour gérer les Like/Dislike des différentes sauces 
router.post('/like/:id', postsCtrl.getReactions);

module.exports = router;

