/**
 * function to paginate data
 * @param {{ limit: number, page: number }} options	- The options to paginate the data
 * @param {import('mongoose').Model<import('mongoose').Document>} model	- The mongoose model
 * @returns {Promise<{ countData: number, limit: number, page: number, totalPage: number }>}	- The paginated data
 */
async function paginate(options, dataLength) {
	const limit = parseInt(options.limit, 10) || 10;
	const page = parseInt(options.page, 10) || 1;
	const totalPage = Math.ceil(dataLength / limit);

	return {
		countData: dataLength,
		limit,
		page,
		totalPage,
	};
}

module.exports = { paginate };
