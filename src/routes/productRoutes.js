const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

// Rotas públicas
router.get('/search', ProductController.search);
router.get('/:id', ProductController.show);

// Rotas protegidas
router.use(authMiddleware);
router.post('/', ProductController.store);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;