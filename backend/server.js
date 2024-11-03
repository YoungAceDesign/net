const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const sequelize = require('./config/database');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const signupRoutes = require('./routes/signup');  // Le chemin correct vers signup.js
const Subscriptions = require('./models/Subscriptions'); 
const paymentRoutes = require('./routes/payment');

// Charger les variables d'environnement
require('dotenv').config();

// Initialiser l'application Express

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/signup', signupRoutes); // Assure-toi d'utiliser le bon chemin
app.use('/api/payment', paymentRoutes);

// Route de test pour la racine
app.get('/', (req, res) => {
  res.send('API Comptabilité opérationnelle!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données :', error);
  });

  // Synchroniser les modèles avec la base de données
sequelize.sync()
.then(() => {
  console.log('Base de données synchronisée');
})
.catch(err => console.error('Erreur de synchronisation de la base de données :', err));


// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
