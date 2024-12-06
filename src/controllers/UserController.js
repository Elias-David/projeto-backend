const UserService = require('../services/UserService');

class UserController {
  async show(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      return res.json(user);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      await UserService.updateUser(req.params.id, req.body);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Error updating user' });
    }
  }

  async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Error deleting user' });
    }
  }
}

module.exports = new UserController();