const { AuthService } = require('../services');
const utils = require('../utils');

const service = new AuthService();

const authController = {
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return utils.sendResponse(res, 400, null);
    }

    try {
      const { email, password } = req.body;
      const data = await service.login({ email, password });
      if (!data) {
        return utils.sendResponse(res, 401, null, 'Invalid email or password');
      }
      return utils.sendResponse(res, 200, data, 'Login success');
    } catch (error) {
      return utils.sendResponse(res, 500, null, error.message);
    }
  },

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
      if (data.message === 'User already exists' && !data) {
        return utils.sendResponse(res, 409, null, 'User already exists');
      }
      return utils.sendResponse(res, 201, data, 'User created successfully');
    } catch (error) {
      return utils.sendResponse(res, 500, null, error.message);
    }
  },

  getUserData: async (req, res) => {
    const { uid } = req.user;
    try {
      const data = await service.getUserData(uid);
      if (!data) {
        return utils.sendResponse(res, 404, null, 'User not found');
      }
      return utils.sendResponse(res, 200, data, 'User data retrieved');
    } catch (error) {
      return utils.sendResponse(res, 500, null, error.message);
    }
  },
};

module.exports = authController;
