const sequelize = require('../config/database');
const Users = require('./users');  // Import du modèle Users

// Synchroniser la base de données
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie!');
    
    // Synchroniser les modèles
    await sequelize.sync();
    console.log('La base de données est synchronisée.');
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
  }
};

// Exporter le modèle Users pour l'utiliser dans les routes
module.exports = {
  initDb,
  Users  // Ajoute l'export du modèle ici
};

