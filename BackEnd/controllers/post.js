// Import du modèle "Post"
const Post = require('../models/post');
// Import du modèle "comment"
const Comment = require('../models/comment');
// Import du modèle "like/dislike"
const Reaction = require('../models/reaction');


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


// Commentaire
// Création d'un commentaire
exports.createComment = (req, res, next) => {
  console.log('createComment')
  // Vérification de la requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne doit pas être vide !"
    });
  }
    //Création du commentaire
  const comment = new Comment({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    comment: req.body.comment
  });
   console.log(comment)
  // Sauvegarde dans la base de données
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur est apparue lors de la création du commentaire."
      });
    else res.send(data);
  });
};

// Suppression d'un commentaire 
exports.deleteComment = (req, res, next) => {
    Comment.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Le commentaire n'existe pas ou plus.`
                });
            } else {
                res.status(500).send({
                    message: 'Suppression impossible !'
                });
            }
        } else res.send({ message: `Le commentaire a été supprimé.` });
    });
};

// Like et Dislike 
exports.getReactions = (req, res, next) => {
  // Vérification de la requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne doit pas être vide !"
    });
  }
    //Création du commentaire
  const reaction = new Reaction({
    id: req.body.id,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    reactions: req.body.reactions
  });
  // Sauvegarde dans la base de données
  Reaction.like(reaction, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur est apparue lors de la création du commentaire."
      });
    else res.send(data);
  });
};