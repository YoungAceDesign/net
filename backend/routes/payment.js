const express = require('express');
const axios = require('axios');
const { Subscriptions, Users } = require('../models');
const router = express.Router();

// Fonction pour formater les données de l'utilisateur
const formatUserData = (user) => ({
  customer_name: user.name,
  customer_surname: user.name.split(' ')[1] || '',
  customer_email: user.email,
  customer_phone_number: user.phone,
  customer_address: user.address || 'Adresse inconnue',
  customer_city: user.city || 'Ville inconnue',
  customer_country: user.country || 'CI',  // Défaut à Côte d'Ivoire si non spécifié
  customer_zip_code: user.zip_code || '00000', // Ajoute le code postal par défaut si manquant
});

// Route pour initier le paiement avec CinetPay pour Visa
router.post('/visa', async (req, res) => {
  const { userId, plan } = req.body;

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoie une réponse ici et quitte la fonction
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const transactionId = Math.floor(Math.random() * 100000000).toString();

    // Récupérer les données formatées de l'utilisateur
    const userData = formatUserData(user);

    const paymentData = {
      apikey: process.env.CINETPAY_APIKEY,
      site_id: process.env.CINETPAY_SITE_ID,
      transaction_id: transactionId,
      amount: 100, // Montant fixe
      currency: 'XOF',
      description: 'Paiement par carte Visa',
      channels: 'CREDIT_CARD',  // Spécifique à Visa
      ...userData,  // Intègre les données de l'utilisateur
      notify_url: 'https://tondomaine.com/notify',
      return_url: 'https://tondomaine.com/payment/success',
      metadata: 'Paiement par carte Visa',
    };

    // Effectue la requête à l'API de CinetPay
    const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment', paymentData, {
      headers: { 'Content-Type': 'application/json' },
    });

    const paymentUrl = response.data.data.payment_url;

    // Envoie une réponse au client une seule fois ici
    res.json({ paymentUrl });

    // Ensuite, sauvegarde l'abonnement sans envoyer une nouvelle réponse
    await Subscriptions.create({
      user_id: userId,
      plan: plan,
      transaction_id: transactionId,
      status: 'pending',
    });

  } catch (error) {
    // En cas d'erreur, vérifie si une réponse n'a pas déjà été envoyée
    if (!res.headersSent) {
      console.error('Erreur lors de l\'initiation du paiement Visa:', error);
      res.status(500).json({ message: 'Échec de l\'initiation du paiement' });
    }
  }
});

// Route pour initier le paiement avec CinetPay pour Wave
router.post('/wave', async (req, res) => {
  const { userId, plan } = req.body;

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const transactionId = Math.floor(Math.random() * 100000000).toString();

    const userData = formatUserData(user);

    const paymentData = {
      apikey: process.env.CINETPAY_APIKEY,
      site_id: process.env.CINETPAY_SITE_ID,
      transaction_id: transactionId,
      amount: 30000, // Montant fixe ou variable selon ton plan
      currency: 'XOF',
      description: 'Paiement par Mobile Money Wave',
      channels: 'MOBILE_MONEY',  // Spécifique à Wave
      ...userData,
      notify_url: 'https://tondomaine.com/notify', // Modifie les URLs
      return_url: 'https://tondomaine.com/payment/success',
      metadata: 'Paiement via Wave',
    };

    // Effectue la requête à l'API CinetPay
    const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment', paymentData, {
      headers: { 'Content-Type': 'application/json' },
    });

    const paymentUrl = response.data.data.payment_url;

    // Envoie une réponse contenant l'URL de paiement
    res.json({ paymentUrl });

    // Sauvegarde la transaction en base de données
    await Subscriptions.create({
      user_id: userId,
      plan: plan,
      transaction_id: transactionId,
      status: 'pending',
    });

  } catch (error) {
    if (!res.headersSent) {
      console.error('Erreur lors de l\'initiation du paiement Wave:', error);
      res.status(500).json({ message: 'Échec de l\'initiation du paiement Wave' });
    }
  }
});


module.exports = router;
