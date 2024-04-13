const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const { authController, reviewsController, sentimentController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

// ? Swagger Docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// ? Authentication
router.post('/auth/register', authController.createUser);

// ? Guest Reviews
router.get('/reviews/:property_id', authMiddleware.verifyTokenUser, reviewsController.getReviewsByVendor);
router.get('/reviews/detail/:review_id', authMiddleware.verifyTokenUser, reviewsController.getReviewDetail);

// ? Sentiment Analytics
router.get('/sentiment/categories', authMiddleware.verifyTokenUser, sentimentController.getSentimentCategories);
router.get('/sentiment/analytics', authMiddleware.verifyTokenUser, sentimentController.getSentimentAnalytics);
router.get('/sentiment/statistics', authMiddleware.verifyTokenUser, sentimentController.getSentimentStatistics);
router.get('/sentiment/word-cloud/:category_id', authMiddleware.verifyTokenUser, sentimentController.getSentimentWordCloud);

module.exports = router;
