const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      description: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      price_with_discount: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'products',
      timestamps: true,
      underscored: true
    });
  }

  static associate(models) {
    this.belongsToMany(models.Category, { 
      through: models.ProductCategory,
      foreignKey: 'product_id',
      otherKey: 'category_id',
      as: 'categories'
    });
    this.hasMany(models.ProductImage, { 
      foreignKey: 'product_id', 
      as: 'images' 
    });
    this.hasMany(models.ProductOption, { 
      foreignKey: 'product_id', 
      as: 'options' 
    });
  }
}

module.exports = Product;