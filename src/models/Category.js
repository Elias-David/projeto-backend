const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'categories',
      timestamps: true,
      underscored: true
    });
  }

  static associate(models) {
    this.belongsToMany(models.Product, { 
      through: models.ProductCategory,
      foreignKey: 'category_id',
      otherKey: 'product_id',
      as: 'products'
    });
  }
}

module.exports = Category;