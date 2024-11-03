const express = require('express');
const bcrypt = require('bcryptjs');
const { Users } = require('../models');
const router = express.Router();

// Route for signup
router.post('/', async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    company_name, 
    phone, 
    address, 
    city, 
    country, 
    zip_code 
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Ensure phone does not have double +225 prefix
    const formattedPhone = phone.startsWith('+225') ? phone : `+225${phone.replace(/^0/, '')}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      company_name,
      phone: formattedPhone,  // Correct phone formatting before saving
      address,
      city,
      country: country || 'CI',  // Default to CI if not provided
      zip_code,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup.' });
  }
});

module.exports = router;
