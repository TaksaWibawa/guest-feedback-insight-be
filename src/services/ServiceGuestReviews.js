/* eslint-disable camelcase */
const model = require('../models/modelGuestReviews');
// const countData = require('../utils/countData');
const { paginate } = require('../utils/paginate');

const VENDORS = {
	airbnb: 'https://www.airbnb.com/rooms',
	booking: 'https://www.booking.com',
	tripadvisor: 'https://www.tripadvisor.com',
	agoda: 'https://www.agoda.com',
};

class ServiceGuestReviews {
	constructor() {
		this.model = model;
	}

	//! Will be used in the future
	// async getAllReviews(query) {
	// 	const { limit, page, sortField, sortOrder } = query;
	// 	const dataLength = await countData(this.model);

	// 	const options = {
	// 		limit: limit || 10,
	// 		page: page || 1,
	// 		sortField: sortField || '_id',
	// 		sortOrder: sortOrder === 'desc' ? -1 : 1,
	// 	};

	// 	const paginateData = await paginate(options, dataLength);
	// 	const reviews = await this.model
	// 		.find()
	// 		.limit(options.limit)
	// 		.sort({ [options.sortField]: options.sortOrder })
	// 		.skip(options.limit * (options.page - 1))
	// 		.exec();

	// 	return {
	// 		pagination: paginateData,
	// 		reviews,
	// 	};
	// }
	//! Will be used in the future

	async getReviewsByVendor(listing_id, vendor, query) {
		const listing_url = `${VENDORS[vendor]}/${listing_id}`;
		const { limit = 10, page = 1, sortField = 'date', sortOrder } = query;

		console.log('listing_url', listing_url);
		const data = await this.model.findOne({ listing_url }).lean();

		if (!data) return null;

		const { reviews } = data;

		const dataLength = reviews.length;

		const options = {
			limit: limit || 10,
			page: page || 1,
			sortField: sortField || 'date',
			sortOrder: sortOrder === 'desc' ? -1 : 1,
		};

		reviews.sort((a, b) => (sortOrder === 'desc' ? b[sortField] - a[sortField] : a[sortField] - b[sortField]));

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const paginatedReviews = reviews.slice(startIndex, endIndex);

		const paginateData = await paginate(options, dataLength);

		return {
			pagination: paginateData,
			reviews: paginatedReviews,
		};
	}

	async getReviewDetails(listing_id, vendor, review_id) {
		const listing_url = `${VENDORS[vendor]}/${listing_id}`;
		const data = await this.model.findOne({ listing_url }).lean();

		if (!data) return null;

		const { reviews } = data;

		const review = reviews.find(({ _id: id }) => id === review_id);

		return review;
	}
}

module.exports = ServiceGuestReviews;
