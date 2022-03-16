const bcrypt = require('bcrypt'); 
const verifInput = require('../utils/verifInput')

// Pour crée un nouvel utilisateur
exports.signup = (req, res) => {
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
  if (emailOk == true && mdpOK == true && loginOk == true) {
// Vérification si l'utilisateur n'existe pas déjà
      models.User.findOne({
          attributes: ['email'],
          where: { email: email }
      })
          .then(user => {
              if (!user) {
                  bcrypt.hash(password, 10, function (err, bcryptPassword) {
                      // Création de l'utilisateur
                      const user = models.User.create({
                          email: email,
                          username: username,
                          password: bcryptPassword                      
                      })
                          .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                          .catch(err => {
                              res.status(500).json({ err })
                          })
                  })
              }
              else {
                  res.status(409).json({ error: 'Cette utilisateur existe déjà' })
              }
          })
          .catch(err => { res.status(500).json({ err }) })
  } 
};

// Connection d'un utilisateur
exports.login = (req, res) => {
  // Récupération et validation des paramètres
  let username = req.body.username;
  let password = req.body.password;
  if (username == null || password == null) {
      res.status(400).json({ error: 'Il vous manque un paramètre' })
  }
  // Vérification si l'utilisateur existe
  models.User.findOne({
      where: { username: username }
  })
      .then(user => {
          if (user) {
              bcrypt.compare(password, user.password, (resComparePassword) => {
                  if (resComparePassword) {
                      res.status(200).json({
                          userId: user.id,
                          token: utils.generateToken(user)
                      })
                  } else {
                      res.status(403).json({ error: 'Mot de passe incorrect !' });
                  };
              })
          } else {
              res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
          }
      })
      .catch(err => { res.status(500).json({ err }) })
};
