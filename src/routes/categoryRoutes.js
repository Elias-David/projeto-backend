const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middleware/auth');

// Rotas públicas
router.get('/v1/category/search', CategoryController.search);
router.get('/v1/category/:id', CategoryController.show);

// Rotas protegidas
router.use(authMiddleware);
router.post('/v1/category', CategoryController.store);
router.put('/v1/category/:id', CategoryController.update);
router.delete('/v1/category/:id', CategoryController.delete);

module.exports = router;