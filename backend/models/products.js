const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle Product avec Sequelize
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Synchroniser le modèle avec la base de données
Product.sync({ alter: true });

module.exports = Product;
