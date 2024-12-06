const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

// Rotas públicas
router.post('/v1/user', UserController.store);

// Rotas protegidas
router.use(authMiddleware);
router.get('/v1/user/:id', UserController.show);
router.put('/v1/user/:id', UserController.update);
router.delete('/v1/user/:id', UserController.delete);

module.exports = router;