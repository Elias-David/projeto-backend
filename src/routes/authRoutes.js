const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rota de geração de token
router.post('/v1/user/token', AuthController.generateToken);

module.exports = router;