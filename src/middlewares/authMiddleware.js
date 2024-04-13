const { AuthService } = require('../services');

const service = new AuthService();

const authMiddleware = {
	verifyTokenUser: async (req, res, next) => {
		try {
			const { authorization } = req.headers;
			if (!authorization || !authorization.startsWith('Bearer ')) {
				return res.status(401).json({ message: 'Unauthorized' });
			}
			const token = authorization.split(' ')[1];
			const user = await service.verifyToken(token);
			if (!user) {
				return res.status(401).json({ message: 'Unauthorized' });
			}
			req.user = user;
			return next();
		} catch (error) {
			return next(error);
		}
	},
};

module.exports = authMiddleware;
