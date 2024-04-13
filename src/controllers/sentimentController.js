const { SentimentService } = require('../services');
const utils = require('../utils');

const service = new SentimentService();

const sentimentController = {
	async getSentimentCategories(_req, res) {
		try {
			const data = await service.getSentimentCategories();
			if (!data || data.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},

	async getSentimentAnalytics(_req, res) {
		try {
			const data = await service.getSentimentAnalysis();
			if (!data || data.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},

	async getSentimentStatistics(_req, res) {
		try {
			const data = await service.getSentimentStatistics();
			if (!data || data.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},

	async getSentimentWordCloud(req, res) {
		if (!req.params.category_id) {
			return utils.sendResponse(res, 400, null);
		}
		try {
			const data = await service.getSentimentWordCloud(req.params.category_id);
			if (!data || data.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},
};

module.exports = sentimentController;
