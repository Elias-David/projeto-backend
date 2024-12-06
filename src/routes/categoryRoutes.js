const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middleware/auth');

// Rotas públicas
router.get('/search', CategoryController.search);
router.get('/:id', CategoryController.show);

// Rotas protegidas
router.post('/', authMiddleware, CategoryController.store);
router.put('/:id', authMiddleware, CategoryController.update);
router.delete('/:id', authMiddleware, CategoryController.delete);

module.exports = router;