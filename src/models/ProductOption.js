const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductOption extends Model {
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
        references: { model: 'products', key: 'id' }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shape: {
        type: DataTypes.ENUM('square', 'circle'),
        defaultValue: 'square'
      },
      radius: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      type: {
        type: DataTypes.ENUM('text', 'color'),
        defaultValue: 'text'
      },
      values: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'product_options',
      timestamps: false,
      underscored: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Product, { 
      foreignKey: 'product_id', 
      as: 'product'
    });
  }
}

module.exports = ProductOption;