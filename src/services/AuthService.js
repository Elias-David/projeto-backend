const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

class AuthService {
  async generateToken(email, password) {
    const user = await User.findOne({
      where: { email }
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.APP_KEY_TOKEN,
      { expiresIn: '1h' }
    );
  }
}

module.exports = new AuthService();