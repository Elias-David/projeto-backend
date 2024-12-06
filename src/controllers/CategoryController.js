const { mergeDefaults } = require('sequelize/lib/utils');
const CategoryService = require('../services/CategoryService');

class CategoryController {
  async search(req, res) {
    try {
      const result = await CategoryService.searchCategories(req.query);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: 'Error searching categories' });
    }
  }

  async show(req, res) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      return res.json(category);
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Error getting category' });
    }
  }

  async store(req, res) {
    try {
      const category = await CategoryService.createCategory(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: 'Error creating category' });
    }
  }

  async update(req, res) {
    try {
      await CategoryService.updateCategory(req.params.id, req.body);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Error updating category' });
    }
  }

  async delete(req, res) {
    try {
      await CategoryService.deleteCategory(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Error deleting category' });
    }
  }
}

module.exports = new CategoryController();