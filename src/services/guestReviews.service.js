const { paginate } = require("../utils/paginate");

class GuestReviewsService {
	constructor(model) {
		this.model = model;
	}

	getAllReviews = async (query) => {
		const { limit, page, sortField, sortOrder } = query;
		const options = {
			limit: limit || 10,
			page: page || 1,
			sortField: sortField || "_id",
			sortOrder: sortOrder === "desc" ? -1 : 1,
		};

		const paginateData = await this.getPaginatedData(options);
		const reviews = await this.fetchReviews(options);

		return {
			pagination: paginateData,
			reviews,
		};
	};

	getPaginatedData = async (options) => {
		const paginateData = await paginate(options, this.model);
		return {
			totalPage: paginateData.totalPage,
			totalData: paginateData.count_data,
			currentPage: paginateData.page,
			limit: paginateData.limit,
		};
	};

	fetchReviews = async (options) => {
		return await this.model
			.find()
			.limit(options.limit)
			.sort({ [options.sortField]: options.sortOrder })
			.skip(options.limit * (options.page - 1))
			.exec();
	};
}

module.exports.GuestReviewsService = GuestReviewsService;
