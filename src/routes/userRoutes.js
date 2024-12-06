const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

// Rotas públicas
router.post('/', UserController.store);

// Rotas protegidas
router.use(authMiddleware);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;