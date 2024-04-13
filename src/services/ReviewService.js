const { reputationManagementModel } = require('../models');
const utils = require('../utils');

class ReviewService {
	constructor() {
		this.model = reputationManagementModel;
	}

	//! in mongodb need to add the listing to the query
	async getReviewsByVendor(propertyId, vendor, query) {
		const [data] = await this.model
			.aggregate([{ $match: { property_id: propertyId, vendor } }, { $group: { _id: null, reviews: { $push: { review_id: '$_id', review: '$review', vendor: '$vendor' } } } }])
			.exec();

		const { reviews = [] } = data || {};

		const options = {
			limit: query.limit || 10,
			page: query.page || 1,
			sortField: query.sortField || 'date',
			sortOrder: query.sortOrder === 'desc' ? -1 : 1,
		};

		const result = utils.paginate(reviews, options);

		return result;
	}

	async getReviewDetail(reviewId) {
		const [data] = await this.model
			.aggregate([
				{
					$match: { $expr: { $eq: ['$_id', { $toObjectId: reviewId }] } },
				},
				{
					$project: { _id: 0, review_id: '$_id', review: 1, asqe: 1 },
				},
			])
			.exec();

		return data;
	}
}

module.exports = ReviewService;
