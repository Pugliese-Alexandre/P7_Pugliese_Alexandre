// Ecoute des requetes HTTP et reponses
const express = require('express');
// Helmet : Modules intégrés pour augmenter la sécurité de l'application Express.
const helmet = require('helmet');
const db = require('./config/db');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// Création application Express
  const app = express();  
  app.use(express.json())

// Utilisation d'Helmet : Sécurise HTTP headers
app.use(helmet());

// Pour gérer les problèmes de CORS (Cross-Origin Request Sharing)
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Pour les routes dédiées aux utilisateurs
  app.use('/api/user', userRoutes);
// Pour les routes dédiées aux posts
  app.use('/api/post', postRoutes);
  
db.query('SELECT * from user', (err, results, fields)=> {
  console.error(err)
  console.log('results',results);
})

module.exports = app;
