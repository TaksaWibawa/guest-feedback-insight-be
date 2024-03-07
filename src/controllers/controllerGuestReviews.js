/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const { insertDummyData } = require('../utils/generateDummyData');

const controllerGuestReviews = {
	async getReviewsData(req, res) {
		try {
			insertDummyData();
			if (!req.data || req.data.length === 0) {
				return res.status(404).json({ data: [], message: 'Data not found', status: 404 });
			}
			res.status(200).json({
				data: {
					reviews: req.data.reviews,
					pagination: req.data.pagination,
				},
				status: 200,
				message: 'Data found',
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = controllerGuestReviews;
