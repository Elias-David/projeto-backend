const AuthService = require('../services/AuthService');

class AuthController {
  async generateToken(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.generateToken(email, password);
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ error: 'Error generating token' });
    }
  }
}

module.exports = new AuthController();