/* eslint-disable camelcase */
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

	async getSentimentAnalytics(req, res) {
		const { uid: property_id } = req.user;

		try {
			const data = await service.getSentimentAnalysis(property_id);
			if (!data || data.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},

	async getSentimentStatistics(req, res) {
		const { uid: property_id } = req.user;

		try {
			const data = await service.getSentimentStatistics(property_id);
			if (!data || data.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},

	async getSentimentWordCloud(req, res) {
		const { uid: property_id } = req.user;
		const { category_id } = req.params;

		if (!category_id || !category_id.trim()) {
			return utils.sendResponse(res, 400, [], 'Category ID is required');
		}

		try {
			const data = await service.getSentimentWordCloud(property_id, category_id);
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
