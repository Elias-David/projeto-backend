const ProductService = require('../services/ProductService');

class ProductController {
  async search(req, res) {
    try {
      const result = await ProductService.searchProducts(req.query);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: 'Error searching products' });
    }
  }

  async show(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      return res.json(product);
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Error getting product' });
    }
  }

  async store(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: 'Error creating product' });
    }
  }

  async update(req, res) {
    try {
      await ProductService.updateProduct(req.params.id, req.body);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Error updating product' });
    }
  }

  async delete(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Error deleting product' });
    }
  }
}

module.exports = new ProductController();