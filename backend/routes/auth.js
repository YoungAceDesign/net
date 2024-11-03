const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Import du modèle utilisateur
const Subscriptions = require('../models/Subscriptions'); // Import du modèle des abonnements
const router = express.Router();
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token reçu:', token); // Ajoutez ce log pour vérifier que le token est bien reçu

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};



// Inscription (Register)
router.post('/register', async (req, res) => {
  const { name, email, password, company_name, phone, type, address, city, country, zip_code } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: 'Email déjà utilisé.' });

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec 'type' par défaut à 'user'
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      company_name,
      phone,
      type: type || 'user', // Type par défaut 'user' si non spécifié
      address,
      city,
      country,
      zip_code,
      subscriptionStatus: 'inactive' // Abonnement inactif par défaut
    });

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Utilisateur créé avec succès', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
  }
});

// Connexion (Login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouver l'utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé.' });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

    // Vérifier l'état de l'abonnement de l'utilisateur via la table `subscriptions`
    const subscription = await Subscriptions.findOne({ where: { user_id: user.id, status: 'active' } });
    const hasSubscription = subscription !== null;

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      hasSubscription, // Utilisé pour rediriger vers le tableau de bord ou la page de paiement
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({
      name: user.name,
      email: user.email,
      company_name: user.company_name,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      zip_code: user.zip_code
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour mettre à jour le profil utilisateur
router.put('/profile', authenticateToken, async (req, res) => {
  console.log('PUT /profile route called'); // Vérifie que la route est bien appelée

  const { name, email, company_name, phone, address, city, country, zip_code } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Met à jour les informations de l'utilisateur
    user.name = name || user.name;
    user.email = email || user.email;
    user.company_name = company_name || user.company_name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.city = city || user.city;
    user.country = country || user.country;
    user.zip_code = zip_code || user.zip_code;

    await user.save();

    res.json({
      message: 'Profil mis à jour avec succès',
      user,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du profil' });
  }
});


module.exports = router;
