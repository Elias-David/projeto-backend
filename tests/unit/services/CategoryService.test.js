const CategoryService = require('../../../src/services/CategoryService');
const Category = require('../../../src/models/Category');

jest.mock('../../../src/models/Category');

describe('CategoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchCategories', () => {
    it('should return categories with default pagination', async () => {
      const mockCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' }
      ];

      Category.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: mockCategories
      });

      const result = await CategoryService.searchCategories();

      expect(Category.findAndCountAll).toHaveBeenCalledWith({
        where: {},
        limit: 12,
        offset: 0
      });

      expect(result).toEqual({
        data: mockCategories,
        total: 2,
        limit: 12,
        page: 1
      });
    });

    it('should apply correct filters when provided', async () => {
      const options = {
        limit: '20',
        page: '2',
        fields: 'name,slug',
        use_in_menu: 'true'
      };

      const mockCategories = [
        { id: 1, name: 'Category 1', slug: 'category-1' },
        { id: 2, name: 'Category 2', slug: 'category-2' }
      ];

      Category.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: mockCategories
      });

      await CategoryService.searchCategories(options);

      expect(Category.findAndCountAll).toHaveBeenCalledWith({
        where: { use_in_menu: true },
        limit: 20,
        offset: 20,
        attributes: ['name', 'slug']
      });
    });
  });

  describe('getCategoryById', () => {
    it('should return category when found', async () => {
      const mockCategory = {
        id: 1,
        name: 'Category 1',
        slug: 'category-1'
      };

      Category.findByPk.mockResolvedValue(mockCategory);

      const result = await CategoryService.getCategoryById(1);

      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCategory);
    });

    it('should throw error when category not found', async () => {
      Category.findByPk.mockResolvedValue(null);

      await expect(CategoryService.getCategoryById(999))
        .rejects
        .toThrow('Category not found');
    });
  });
});