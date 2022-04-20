// J'utilise "bcrypt" pour hasher le mot de passe des utilisateurs
const bcrypt = require('bcrypt'); 
// Package "verifInput"
const verifInput = require('../utils/verifInput')
// Import du modèle "User"
const User = require('../models/user');
//Importation du système de gestion de fichiers file system de Node
const fs = require('fs');
// Package "Jsonwebtoken"
const jwt = require("jsonwebtoken");

// Pour crée un nouvel utilisateur
exports.signup = (req, res) => {
    console.log(req.body)
  let email = req.body.email;
  let login = req.body.login;
  let password = req.body.password;

  if (email == null || login == null || password == null) {
      res.status(400).json({ error: 'Il vous manque un paramètre' })
  }
// Vérification des saisies de l'utilisateur
  let emailOk = verifInput.validEmail(email);
  let mdpOK = verifInput.validPassword(password);
  let loginOk = verifInput.validlogin(login);
  console.log(emailOk, mdpOK, loginOk)
  if (emailOk == true && mdpOK == true && loginOk == true) {
// Vérification si l'utilisateur n'existe pas déjà
      User.getOne(email, (err, user) => {
          console.log(user)
              if (!user) {
                  bcrypt.hash(password, 10, function (err, bcryptPassword) {
                      // Création de l'utilisateur
                      User.create({
                          email: email,
                          login: login,
                          password: bcryptPassword                      
                      }, (err, newUser) => {
                        if(err){
                            return res.status(500).json({ err })
                        }else{
                            return res.status(201).json({ 'id': newUser.id })
                        }
                      })         
                  })
              }
              else {
                  res.status(409).json({ error: 'Cette utilisateur existe déjà' })
              }
          } 
      )
          
  } 
};

// Connection d'un utilisateur
exports.login = (req, res) => {
    console.log(req.body)
  // Récupération et validation des paramètres
  let email = req.body.email;
  let password = req.body.password;
  if (email == null || password == null) {
     return res.status(400).json({ error: 'Il vous manque un paramètre' })
  }
  // Vérification si l'utilisateur existe
  User.getOne(email, (err, user) => {
    if (user) {
        bcrypt.compare(password, user.password, (err, resComparePassword) => {
            if (resComparePassword) {
               return res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
              });
            } 
            else {
               return res.status(403).json({ error: 'Mot de passe incorrect !' });
            };
        })
    } else {
      return  res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
    }
  })
  };
 
// Récupération de l'id pour l'affichage du profil
exports.getOneUser = (req, res) => {
    User.getOneId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                    message: `Cet utilisateur n'existe pas ou plus.`
                });
            } else {
              res.status(500).send({
                    message: err.message || 'Erreur lors de la réception du user'
                });
            }
          } else res.send(data);
        });
      };

    // Mise à jour d'un profil utilisateur.
exports.update = (req, res, next) => {
    // Validation de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    }
    const user = new User({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        birth: req.body.birth,
        user_city: req.body.user_city,
        img: req.body.img,
    });
    User.update(req.params.id, user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Cet utilisateur n'existe pas.`
                });
            } else {
                res.status(500).send({
                    message: 'Erreur lors de la modification de l utilisateur'
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
    User.getOneId(req.params.id, (err, data) => {
        const filename = data.image?.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            User.delete(req.params.id, (err, data) => {
                if (err) {
                    if (err, kind === "not_found") {
                        res.status(404).send({
                            message: `L'utilisateur n'existe pas ou plus.`
                        });
                    } else {
                        res.status(500).send({
                            message: 'Suppression impossible'
                        });
                    }
                } else res.send({ message: `L'utilisateur a été supprimé !` });
            });
        })
    })
};





