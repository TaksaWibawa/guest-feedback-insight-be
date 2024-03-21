const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/configs/configDatabase');
const router = require('./src/routes');
const middleware = require('./src/middlewares');

const app = express();

const startServer = async () => {
	try {
		await connectDB();

		app.use(cors());

		app.use((err, req, res, _next) => {
			console.error(err.stack);
			res.status(500).send('Something broke!');
		});

		app.use(middleware.logger);

		app.use('/', router);

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (err) {
		console.error('DB connection failed', err);
		process.exit(1);
	}
};

startServer();
