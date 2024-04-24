/* eslint-disable camelcase */
const ReviewService = require('../services/ReviewService');
const utils = require('../utils');

const service = new ReviewService();

const reviewsController = {
	async getReviewsByVendor(req, res) {
		const { uid: property_id } = req.user;
		const { vendor, ...query } = req.query;

		if (!property_id || !property_id.trim()) {
			return utils.sendResponse(res, 400, [], 'Property ID is required');
		}

		if (!vendor || !vendor.trim()) {
			return utils.sendResponse(res, 400, [], 'Vendor is required');
		}
		try {
			const data = await service.getReviewsByVendor(property_id, vendor, query);
			if (!data.reviews || data.reviews.length === 0) {
				return utils.sendResponse(res, 404, [], 'Data not found');
			}
			return utils.sendResponse(res, 200, data, 'Data found');
		} catch (error) {
			return utils.sendResponse(res, 500, [], error.message);
		}
	},

	async getReviewDetail(req, res) {
		const { review_id } = req.params;

		if (!review_id || !review_id.trim()) {
			return utils.sendResponse(res, 400, [], 'Review ID is required');
		}
		try {
			const data = await service.getReviewDetail(review_id);
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
