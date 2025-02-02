const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Routes pour les produits
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
