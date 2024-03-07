const express = require('express');
const { connectDB } = require('./src/configs/configDatabase');
const router = require('./src/routes');
const middleware = require('./src/middlewares');

const app = express();

connectDB();

app.use(middleware.logger);

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
