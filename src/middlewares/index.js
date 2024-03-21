const ServiceGuestReviews = require('../services/ServiceGuestReviews');
const ServiceSentimentAnalytics = require('../services/ServiceSentimentAnalytics');

const middleware = {
	logger: (req, _res, next) => {
		console.log(`${req.method} ${req.url}`);
		next();
	},

	attachGetAllReviewsToRequest: async (req, _res, next) => {
		try {
			const service = new ServiceGuestReviews();

			const reviews = await service.getAllReviews(req.query);
			req.data = reviews;
			next();
		} catch (error) {
			next(error);
		}
	},

	attachGetSentimentCategoriesToRequest: async (req, _res, next) => {
		try {
			const service = new ServiceSentimentAnalytics();

			const categories = await service.getSentimentAnalyticsCategories();
			req.data = categories;
			next();
		} catch (error) {
			next(error);
		}
	},

	attachGetSentimentCategoryItemsToRequest: async (req, _res, next) => {
		try {
			const service = new ServiceSentimentAnalytics();

			const categoryItems = await service.getSentimentAnalyticsCategoryItems(req.params.category, req.query);
			req.data = categoryItems;
			next();
		} catch (error) {
			next(error);
		}
	},

	attachGetSentimentStatisticsToRequest: async (req, _res, next) => {
		try {
			const service = new ServiceSentimentAnalytics();

			const statistics = await service.getSentimentStatistics();
			req.data = statistics;
			next();
		} catch (error) {
			next(error);
		}
	},
};

module.exports = middleware;
