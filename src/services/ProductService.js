const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const ProductOption = require('../models/ProductOption');
const Category = require('../models/Category');
const { Op } = require('sequelize');

class ProductService {
  async searchProducts(options = {}) {
    const {
      limit = 12,
      page = 1,
      fields,
      match,
      category_ids,
      'price-range': priceRange,
    } = options;

    const queryOptions = {
      where: {},
      limit: limit === '-1' ? null : parseInt(limit),
      offset: limit === '-1' ? 0 : (page - 1) * parseInt(limit),
      include: []
    };

    if (fields) {
      queryOptions.attributes = fields.split(',');
    }

    if (match) {
      queryOptions.where[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } }
      ];
    }

    if (category_ids) {
      queryOptions.include.push({
        model: Category,
        as: 'categories',
        where: {
          id: {
            [Op.in]: category_ids.split(',').map(id => parseInt(id))
          }
        },
        through: { attributes: [] }
      });
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(price => parseFloat(price));
      queryOptions.where.price = {
        [Op.between]: [min, max]
      };
    }

    queryOptions.include.push(
      { model: ProductImage, as: 'images' },
      { model: ProductOption, as: 'options' }
    );

    const { count, rows: products } = await Product.findAndCountAll(queryOptions);

    return {
      data: products,
      total: count,
      limit: limit === '-1' ? -1 : parseInt(limit),
      page: parseInt(page)
    };
  }

  async getProductById(id) {
    const product = await Product.findByPk(id, {
      include: [
        { model: ProductImage, as: 'images' },
        { model: ProductOption, as: 'options' },
        { 
          model: Category,
          as: 'categories',
          through: { attributes: [] }
        }
      ]
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async createProduct(productData) {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options
    } = productData;

    const product = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    });

    if (category_ids?.length) {
      await product.setCategories(category_ids);
    }

    if (images?.length) {
      await ProductImage.bulkCreate(
        images.map(image => ({
          product_id: product.id,
          enabled: true,
          path: image.content
        }))
      );
    }

    if (options?.length) {
      await ProductOption.bulkCreate(
        options.map(option => ({
          product_id: product.id,
          ...option
        }))
      );
    }

    return product;
  }

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error('Product not found');
    }

    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options
    } = productData;

    await product.update({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    });

    if (category_ids) {
      await product.setCategories(category_ids);
    }

    if (images) {
      for (const image of images) {
        if (image.deleted) {
          await ProductImage.destroy({ where: { id: image.id } });
        } else if (image.id) {
          await ProductImage.update(
            { path: image.content },
            { where: { id: image.id } }
          );
        } else {
          await ProductImage.create({
            product_id: product.id,
            enabled: true,
            path: image.content
          });
        }
      }
    }

    if (options) {
      for (const option of options) {
        if (option.deleted) {
          await ProductOption.destroy({ where: { id: option.id } });
        } else if (option.id) {
          await ProductOption.update(
            option,
            { where: { id: option.id } }
          );
        } else {
          await ProductOption.create({
            product_id: product.id,
            ...option
          });
        }
      }
    }
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error('Product not found');
    }

    await product.destroy();
  }
}

module.exports = new ProductService();