// Import du modèle "Post"
const Post = require('../models/post');

// Importation du système de gestion de fichiers
const fs = require('fs');

// Crée un post
exports.createPost = (req, res, next) => {
    // Vérification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    }
    // Création de l article
    const post = new Post({
        title: req.body.title,
        Contenu: req.body.Contenu,
        Contenu_court : req.body.Contenu_court,
        user_id : req.body.user_id
    });

    // Sauvegarde dans la base de données
 Post.create(post, (err, data) => {
     if (err)
     res.status(500).send({
         message:
         err.message || "Une erreur est apparue lors de la création de l article."
     });
     else res.send(data);
 });
};

// Modifier un article
exports.modifyPost = (req, res) => {
    // Validation de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    }
    console.log(req.body);
    Post.update(
        req.params.id,
        new Post(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `L'article n'existe pas. ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Erreur lors de la modification du post." + req.params.id
              });
            }
          } else res.send(data);
        }
      );
    };

// Suppression d'un Post

exports.deletePost = (req, res, next) => {
    Post.delete(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `L'article n'existe pas.`
          });
        } else {
          res.status(500).send({
            message: "Suppression de l article impossible" + req.params.id
          });
        }
      } else res.send({ message: `L article a été supprimé !` });
    });
  };
