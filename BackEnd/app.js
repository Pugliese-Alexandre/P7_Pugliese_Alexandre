// Ecoute des requetes HTTP et reponses
const express = require('express');
const app = express();

const db = require('./config/db')

// Pour gérer les problèmes de CORS (Cross-Origin Request Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});


  // Pour les routes dédiées aux utilisateurs
  //app.use('/api/auth', userRoutes);

  // La route d'authentification 
  //app.use("/api/authentification", userRoutes);
db.query('SELECT * from user', (err, results, fields)=> {
  console.error(err)
  console.log('results',results);
 // console.log('fields', fields);
})

module.exports = app;