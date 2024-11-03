const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import de la configuration de la base de données

// Définition du modèle Subscription
const Subscriptions = sequelize.define('subscriptions', {  // Utilise des minuscules pour le nom de la table
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',  // Référence au modèle 'users' en minuscule
      key: 'id',
    },
    onDelete: 'CASCADE',  // Si l'utilisateur est supprimé, l'abonnement est aussi supprimé
    onUpdate: 'CASCADE',
  },
  plan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Assure que chaque transaction ait un identifiant unique
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'XOF',  // Définit la monnaie par défaut en franc CFA (XOF)
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',  // Par défaut, l'abonnement est en attente
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,  // La date de début sera renseignée lors de l'activation
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,  // La date de fin sera renseignée si l'abonnement expire ou est annulé
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',  // Utiliser le nom de colonne en minuscules
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',  // Utiliser le nom de colonne en minuscules
  }
}, {
  tableName: 'subscriptions',  // Nom explicite de la table en minuscule
  timestamps: true,  // Active les colonnes createdAt et updatedAt
});

module.exports = Subscriptions;
