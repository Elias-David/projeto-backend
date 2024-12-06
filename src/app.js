const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Registra as rotas
app.use(authRoutes); // Rotas de autenticação
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Rota 404 para endpoints não encontrados
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;