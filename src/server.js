const app = require('./app');
const connection = require('./config/models');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connection.authenticate();
    console.log('Database connection has been established successfully.');
    
    await connection.sync();
    console.log('Database synchronized successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer();