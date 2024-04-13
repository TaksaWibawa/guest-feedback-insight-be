const { AuthService } = require('../services');
const utils = require('../utils');

const service = new AuthService();

const authController = {
	createUser: async (req, res) => {
		if (!req.body.email || !req.body.password || !req.body.displayName || !req.body.phoneNumber) {
			return utils.sendResponse(res, 400, null);
		}
		try {
			const { email, password, displayName, phoneNumber } = req.body;
			const data = await service.createUserViaEmail({
				email,
				password,
				displayName,
				phoneNumber,
			});
			if (!data) {
				return utils.sendResponse(res, 409, null, 'User already exists');
			}
			return utils.sendResponse(res, 201, data, 'User created successfully');
		} catch (error) {
			return utils.sendResponse(res, 500, null, error.message);
		}
	},
};

module.exports = authController;
