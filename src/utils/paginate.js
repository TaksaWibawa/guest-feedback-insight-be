async function paginate(options, model) {
	const count_data = await model.countDocuments().exec();
	const limit = parseInt(options.limit) || 10;
	const page = parseInt(options.page) || 1;
	const totalPage = Math.ceil(count_data / limit);

	return {
		count_data: count_data,
		limit: limit,
		page: page,
		totalPage: totalPage,
	};
}

module.exports = { paginate };
