const model = require('../models/modelGuestReviews');
const countData = require('../utils/countData');
const { paginate } = require('../utils/paginate');

class ServiceGuestReviews {
	constructor() {
		this.model = model;
	}

	async getAllReviews(query) {
		const { limit, page, sortField, sortOrder } = query;
		const dataLength = countData(this.model);

		const options = {
			limit: limit || 10,
			page: page || 1,
			sortField: sortField || '_id',
			sortOrder: sortOrder === 'desc' ? -1 : 1,
		};

		const paginateData = await paginate(options, dataLength);
		const reviews = await this.model
			.find()
			.limit(options.limit)
			.sort({ [options.sortField]: options.sortOrder })
			.skip(options.limit * (options.page - 1))
			.exec();

		return {
			pagination: paginateData,
			reviews,
		};
	}
}

module.exports = ServiceGuestReviews;
