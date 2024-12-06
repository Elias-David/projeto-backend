const User = require('../models/User');

class UserService {
  async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: ['id', 'firstname', 'surname', 'email']
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async createUser(userData) {
    const { firstname, surname, email, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const user = await User.create({
      firstname,
      surname,
      email,
      password
    });

    return {
      id: user.id,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email
    };
  }

  async updateUser(id, userData) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    const { firstname, surname, email } = userData;
    await user.update({
      firstname,
      surname,
      email
    });
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
  }
}

module.exports = new UserService();