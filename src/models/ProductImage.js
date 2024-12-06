const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductImage extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE'
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'product_images',
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.Product, { 
      foreignKey: 'product_id', 
      as: 'product' 
    });
  }
}

module.exports = ProductImage;