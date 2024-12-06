const connection = require('./models');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const ProductOption = require('../models/ProductOption');

async function setupDatabase() {
  try {
    // Força a recriação das tabelas
    await connection.sync({ force: true });
    console.log('Database tables created successfully');

    // Cria usuário admin
    const admin = await User.create({
      firstname: 'Admin',
      surname: 'User',
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('Admin user created:', admin.email);

    // Cria algumas categorias
    const categories = await Category.bulkCreate([
      { name: 'Electronics', slug: 'electronics', use_in_menu: true },
      { name: 'Clothing', slug: 'clothing', use_in_menu: true },
      { name: 'Books', slug: 'books', use_in_menu: true }
    ]);
    console.log('Categories created:', categories.length);

    // Cria alguns produtos de exemplo com suas relações
    const product = await Product.create({
      enabled: true,
      name: 'Smartphone XYZ',
      slug: 'smartphone-xyz',
      stock: 10,
      description: 'Latest smartphone model',
      price: 999.99,
      price_with_discount: 899.99
    });

    // Adiciona categorias ao produto
    await product.setCategories([categories[0].id]); // Electronics

    // Adiciona imagens ao produto
    await ProductImage.create({
      product_id: product.id,
      enabled: true,
      path: '/images/smartphone-xyz.jpg'
    });

    // Adiciona opções ao produto
    await ProductOption.create({
      product_id: product.id,
      title: 'Color',
      shape: 'square',
      type: 'color',
      values: 'Black,White,Gold'
    });

    console.log('Sample product created with relations');
    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

// Executa o setup se o arquivo for rodado diretamente
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;