const Product = require('../models/product');

// Créer un produit
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    const product = await Product.create({ name, price, stock, description });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du produit', error });
  }
};

// Obtenir tous les produits
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.description = description;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit', error });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error });
  }
};
