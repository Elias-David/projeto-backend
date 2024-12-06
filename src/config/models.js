const Sequelize = require('sequelize');
const config = require('./database');

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const ProductOption = require('../models/ProductOption');
const ProductCategory = require('../models/ProductCategory');

const connection = new Sequelize(config);

// Inicializa os models
const models = [
  User,
  Category,
  Product,
  ProductImage,
  ProductOption,
  ProductCategory
];

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));

module.exports = connection;