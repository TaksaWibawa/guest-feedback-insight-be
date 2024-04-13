const ReviewService = require('../services/ReviewService');
const utils = require('../utils');

const service = new ReviewService();

const reviewsController = {
	async getReviewsByVendor(req, res) {
		// ! will be adding req.params.vendor later
		if (!req.params.property_id) {
			return utils.sendResponse(res, 400, null);
		}
		try {
			const data = await service.getReviewsByVendor(req.params.property_id, req.params.vendor, req.query);
			if (!data.reviews || data.reviews.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},

	async getReviewDetail(req, res) {
		// ! will be adding req.params.vendor later
		if (!req.params.review_id) {
			return utils.sendResponse(res, 400, null);
		}
		try {
			const data = await service.getReviewDetail(req.params.review_id, req.params.vendor);
			if (!data || data.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},
};

module.exports = reviewsController;
