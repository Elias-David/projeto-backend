const Category = require('../models/Category');

class CategoryService {
  async searchCategories(options = {}) {
    const { limit = 12, page = 1, fields, use_in_menu } = options;

    const queryOptions = {
      where: {},
      limit: limit === '-1' ? null : parseInt(limit),
      offset: limit === '-1' ? 0 : (page - 1) * parseInt(limit)
    };

    if (fields) {
      queryOptions.attributes = fields.split(',');
    }

    if (use_in_menu !== undefined) {
      queryOptions.where.use_in_menu = use_in_menu === 'true';
    }

    const { count, rows: categories } = await Category.findAndCountAll(queryOptions);

    return {
      data: categories,
      total: count,
      limit: limit === '-1' ? -1 : parseInt(limit),
      page: parseInt(page)
    };
  }

  async getCategoryById(id) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  async createCategory(categoryData) {
    const { name, slug, use_in_menu } = categoryData;
    return await Category.create({
      name,
      slug,
      use_in_menu
    });
  }

  async updateCategory(id, categoryData) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new Error('Category not found');
    }

    const { name, slug, use_in_menu } = categoryData;
    await category.update({
      name,
      slug,
      use_in_menu
    });
  }

  async deleteCategory(id) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new Error('Category not found');
    }

    await category.destroy();
  }
}

module.exports = new CategoryService();