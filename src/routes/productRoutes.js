const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

// Rotas públicas
router.get('/v1/product/search', ProductController.search);
router.get('/v1/product/:id', ProductController.show);

// Rotas protegidas
router.use(authMiddleware);
router.post('/v1/product', ProductController.store);
router.put('/v1/product/:id', ProductController.update);
router.delete('/v1/product/:id', ProductController.delete);

module.exports = router;