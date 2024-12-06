const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para gerenciamento de e-commerce com autenticação JWT',
      license: {
        name: 'ISC',
      },
      contact: {
        name: 'Elias David e Ruth Siqueira',
        url: 'https://github.com/Elias-David/projeto-backend'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'] // arquivos que contêm anotações
};

module.exports = swaggerJsdoc(options);