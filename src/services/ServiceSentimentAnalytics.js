const { paginate } = require('../utils/paginate');
const convertLowercase = require('../utils/convertLowercase');
const findByIgnoreCase = require('../utils/findByIgnoreCase');
const model = require('../models/modelSentimentAnalytics');

class ServiceSentimentAnalytics {
	constructor() {
		this.model = model;
	}

	async getSentimentAnalyticsCategories() {
		try {
			const data = await this.model.find({}, { items: 0 }).lean();

			data.map((item) => {
				const newItem = item;
				Object.keys(newItem).forEach((key) => {
					newItem[key] = convertLowercase(newItem[key]);
				});
				return newItem;
			});

			return data;
		} catch (error) {
			throw new Error(error);
		}
	}

	async getSentimentAnalyticsCategoryItems(category, query) {
		try {
			const { limit, page } = query;

			const options = {
				limit: limit || 5,
				page: page || 1,
			};

			const target = await this.model.findOne({ category: findByIgnoreCase(category) }, { items: 1 }).lean();
			if (!target) return false;

			const { items } = target;

			const paginateData = await paginate(options, items.length);
			const data = items.slice(paginateData.limit * (paginateData.page - 1), paginateData.limit * paginateData.page);

			return {
				pagination: paginateData,
				items: data,
			};
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = ServiceSentimentAnalytics;
