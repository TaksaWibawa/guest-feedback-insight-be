const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const { authController, reviewsController, sentimentController } = require('../controllers');
const { authMiddleware } = require('../middlewares');
const ROUTES = require('./routes.json');

const router = express.Router();

const handlers = {
	login: authController.login,
	register: authController.createUser,
	getUserData: authController.getUserData,
	getReviewsByVendor: reviewsController.getReviewsByVendor,
	getReviewDetail: reviewsController.getReviewDetail,
	getSentimentCategories: sentimentController.getSentimentCategories,
	getSentimentAnalytics: sentimentController.getSentimentAnalytics,
	getSentimentStatistics: sentimentController.getSentimentStatistics,
	getSentimentWordCloud: sentimentController.getSentimentWordCloud,
};

// ? Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ? Routes
Object.keys(ROUTES).forEach((route) => {
	const { path, method, handler, isPrivate } = ROUTES[route];
	if (isPrivate) {
		router[method](path, authMiddleware.verifyTokenUser, handlers[handler]);
	} else {
		router[method](path, handlers[handler]);
	}
});

module.exports = router;
