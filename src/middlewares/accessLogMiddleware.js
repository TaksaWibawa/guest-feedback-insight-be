const accessLogMiddleware = {
	logger: async (req, _res, next) => {
		try {
			console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
			next();
		} catch (error) {
			next(error);
		}
	},
};

module.exports = accessLogMiddleware;
