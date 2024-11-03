const { Sequelize } = require('sequelize');
require('dotenv').config();  // Charger les variables d'environnement

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false  // Désactiver les logs de Sequelize
});

module.exports = sequelize;
