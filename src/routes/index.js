const express = require('express');

const controllerGuestReviews = require('../controllers/controllerGuestReviews');
const controllerSentimentAnalytics = require('../controllers/controllerSentimentAnalytics');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/guest-reviews', middleware.attachGetAllReviewsToRequest, controllerGuestReviews.getReviewsData);

router.get('/sentiment-analytics', middleware.attachGetSentimentCategoriesToRequest, controllerSentimentAnalytics.getSentimentCategories);
router.get('/sentiment-analytics/:category', middleware.attachGetSentimentCategoryItemsToRequest, controllerSentimentAnalytics.getSentimentCategoryItems);
router.get('/sentiment-statistics', middleware.attachGetSentimentStatisticsToRequest, controllerSentimentAnalytics.getSentimentStatistics);

module.exports = router;
