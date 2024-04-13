const utils = {
	/**
	 * function to send response
	 * @param {Object} res - The response object
	 * @param {number} statusCode - The status code of the response
	 * @param {Object} data - The data to be sent in the response
	 * @param {string} message - The message to be sent in the response
	 * @returns {Object} - The response object
	 */
	sendResponse: (res, statusCode, data, message = '') => {
		const MESSAGES = {
			200: 'Success',
			201: 'Created successfully',
			400: 'Bad request',
			401: 'Unauthorized',
			403: 'Forbidden',
			404: 'Not found',
			409: 'Conflict',
			500: 'Internal server error',
		};

		const response = {
			message: message || MESSAGES[statusCode],
		};

		if (data !== null) {
			response.data = data;
		}

		return res.status(statusCode).json(response);
	},

	/**
	 * function to paginate and sort data
	 * @param {Array} data - The data to be sorted and paginated
	 * @param {{ limit: number, page: number, sortField: string, sortOrder: number }} options - The options to sort and paginate the data
	 * @returns {Promise<{ data: Array, countData: number, limit: number, page: number, totalPage: number }>} - The sorted and paginated data
	 */
	paginate: (data, options) => {
		const limit = parseInt(options.limit, 10) || 10;
		const page = parseInt(options.page, 10) || 1;
		const sortField = options.sortField || 'date';
		const sortOrder = options.sortOrder === 'desc' ? -1 : 1;

		data.sort((a, b) => (sortOrder === 'desc' ? b[sortField] - a[sortField] : a[sortField] - b[sortField]));

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const paginatedData = data.slice(startIndex, endIndex);

		const totalPage = Math.ceil(data.length / limit);

		return {
			reviews: paginatedData,
			pagination: {
				limit,
				page,
				total_page: totalPage,
				count_data: data.length,
			},
		};
	},
};

module.exports = utils;
