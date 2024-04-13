const authMiddleware = require('./authMiddleware');
const accessLogMiddleware = require('./accessLogMiddleware');

module.exports = {
	authMiddleware,
	accessLogMiddleware,
};
