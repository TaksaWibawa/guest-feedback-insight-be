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
			const { limit, page, sortField, sortOrder } = query;

			const options = {
				limit: limit || 5,
				page: page || 1,
				sortField: sortField || 'category',
				sortOrder: sortOrder === 'desc' ? -1 : 1,
			};

			const target = await this.model.findOne({ category: findByIgnoreCase(category) }, { items: 1 }).lean();
			if (!target) return false;

			const { items } = target;

			const paginateData = await paginate(options, items.length);

			const startIndex = paginateData.limit * (paginateData.page - 1);
			const endIndex = paginateData.limit * paginateData.page;

			const data = items.slice(startIndex, endIndex).sort((a, b) => {
				const fieldA = a[options.sortField];
				const fieldB = b[options.sortField];

				if (typeof fieldA === 'string') {
					return fieldA.localeCompare(fieldB) * options.sortOrder;
				}

				return (fieldA - fieldB) * options.sortOrder;
			});

			data.map((item) => {
				const newItem = item;
				Object.keys(newItem).forEach((key) => {
					newItem[key] = convertLowercase(newItem[key]);
				});
				return newItem;
			});

			return {
				pagination: paginateData,
				items: data,
			};
		} catch (error) {
			throw new Error(error);
		}
	}

	async getSentimentStatistics() {
		try {
			const data = await this.model.find({}, { items: 0 }).lean();

			const sentimentStatistics = {
				positive: 0,
				negative: 0,
				neutral: 0,
			};

			data.forEach((item) => {
				const { positive, negative, neutral } = item;
				sentimentStatistics.positive += positive;
				sentimentStatistics.negative += negative;
				sentimentStatistics.neutral += neutral;
			});

			const positivePercentage = (sentimentStatistics.positive / (sentimentStatistics.positive + sentimentStatistics.negative)) * 100;
			const negativePercentage = (sentimentStatistics.negative / (sentimentStatistics.positive + sentimentStatistics.negative)) * 100;
			const neutralPercentage = 100 - (positivePercentage + negativePercentage);

			return {
				currPeriodData: {
					positive: {
						name: 'Positive',
						count: sentimentStatistics.positive,
						percentage: positivePercentage,
					},
					negative: {
						name: 'Negative',
						count: sentimentStatistics.negative,
						percentage: negativePercentage,
					},
					neutral: {
						name: 'Neutral',
						count: sentimentStatistics.neutral,
						percentage: neutralPercentage,
					},
				},
				lastPeriodData: {
					positive: {
						name: 'Positive',
						count: 0,
						percentage: 0,
					},
					negative: {
						name: 'Negative',
						count: 0,
						percentage: 0,
					},
					neutral: {
						name: 'Neutral',
						count: 0,
						percentage: 0,
					},
				},
			};
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = ServiceSentimentAnalytics;
