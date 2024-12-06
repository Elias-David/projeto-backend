const ProductService = require('../../../src/services/ProductService');
const Product = require('../../../src/models/Product');
const ProductImage = require('../../../src/models/ProductImage');
const ProductOption = require('../../../src/models/ProductOption');
const Category = require('../../../src/models/Category');

const { Op } = require('sequelize');

jest.mock('../../../src/models/Product');
jest.mock('../../../src/models/ProductImage');
jest.mock('../../../src/models/ProductOption');
jest.mock('../../../src/models/Category');

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchProducts', () => {
    it('should return products with default pagination', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' }
      ];

      Product.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: mockProducts
      });

      const result = await ProductService.searchProducts();

      expect(Product.findAndCountAll).toHaveBeenCalledWith({
        where: {},
        limit: 12,
        offset: 0,
        include: [
          { model: ProductImage, as: 'images' },
          { model: ProductOption, as: 'options' }
        ]
      });

      expect(result).toEqual({
        data: mockProducts,
        total: 2,
        limit: 12,
        page: 1
      });
    });

    it('should apply search filters when provided', async () => {
      const options = {
        match: 'test',
        'price-range': '10-20'
      };

      await ProductService.searchProducts(options);

      expect(Product.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          [Op.or]: [
            { name: { [Op.like]: '%test%' } },
            { description: { [Op.like]: '%test%' } }
          ],
          price: {
            [Op.between]: [10, 20]
          }
        }
      }));
    });
  });

  describe('getProductById', () => {
    it('should return product with all relations when found', async () => {
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        images: [],
        options: [],
        categories: []
      };

      Product.findByPk.mockResolvedValue(mockProduct);

      const result = await ProductService.getProductById(1);

      expect(Product.findByPk).toHaveBeenCalledWith(1, {
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
      expect(result).toEqual(mockProduct);
    });

    it('should throw error when product not found', async () => {
      Product.findByPk.mockResolvedValue(null);

      await expect(ProductService.getProductById(999))
        .rejects
        .toThrow('Product not found');
    });
  });
});