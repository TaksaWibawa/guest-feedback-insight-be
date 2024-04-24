const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/configs/configDatabase');
const router = require('./src/routes');
const { accessLogMiddleware } = require('./src/middlewares');
const ServiceAuth = require('./src/services/AuthService');

const service = new ServiceAuth();

const app = express();
app.use(cors());
app.use(accessLogMiddleware.logger);
app.use(express.json());
app.use('/', router);

const startServer = async () => {
  try {
    await connectDB();
    await service.init();
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || '0.0.0.0';
    app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT} or http://localhost:${PORT}`));
  } catch (err) {
    console.error('DB connection failed', err);
    process.exit(1);
  }
};

startServer();
