/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

const controllerSentimentAnalytics = {
	async getSentimentCategories(req, res) {
		try {
			if (!req.data || req.data.length === 0) {
				return res.status(404).json({ data: [], message: 'Data not found', status: 404 });
			}
			res.status(200).json({
				data: req.data,
				status: 200,
				message: 'Data found',
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async getSentimentCategoryItems(req, res) {
		try {
			if (!req.data || req.data.items.length === 0) {
				return res.status(404).json({ data: [], message: 'Data not found', status: 404 });
			}
			res.status(200).json({
				data: req.data,
				status: 200,
				message: 'Data found',
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async getSentimentStatistics(req, res) {
		try {
			if (!req.data || req.data.length === 0) {
				return res.status(404).json({ data: [], message: 'Data not found', status: 404 });
			}
			res.status(200).json({
				data: req.data,
				status: 200,
				message: 'Data found',
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = controllerSentimentAnalytics;
