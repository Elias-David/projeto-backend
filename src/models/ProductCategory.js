const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductCategory extends Model {
  static init(sequelize) {
    super.init({
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        primaryKey: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        primaryKey: true
      }
    }, {
      sequelize,
      tableName: 'product_categories',
      timestamps: false,
      underscored: true
    });
  }
}

module.exports = ProductCategory;