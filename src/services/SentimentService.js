const { reputationManagementModel, sentimentCategoryModel } = require('../models');

const SENTIMENTS = ['positive', 'negative', 'neutral'];

class SentimentService {
	constructor() {
		this.modelCategories = sentimentCategoryModel;
		this.modelSentiment = reputationManagementModel;
	}

	/**
	 * Get all sentiment categories
	 * @returns {Promise<Array>}
	 */
	async getSentimentCategories() {
		try {
			const data = await this.modelCategories.find().exec();

			const result = data.map((item) => ({
				id: item._id,
				name: item.name,
			}));

			return result;
		} catch (error) {
			throw new Error(error);
		}
	}

	// ! will be changed later on
	async getSentimentAnalysis() {
		try {
			const data = await this.modelSentiment
				.aggregate([
					{ $unwind: '$asqe' },
					{
						$group: {
							_id: {
								category: '$asqe.category_id',
								sentiment: '$asqe.sentiment',
							},
							count: { $sum: 1 },
						},
					},
					{
						$lookup: {
							from: 'sentimentCategories',
							localField: '_id.category',
							foreignField: '_id',
							as: 'categoryData',
						},
					},
					{
						$unwind: '$categoryData',
					},
					{
						$group: {
							_id: '$categoryData.name',
							mentions: {
								$push: {
									sentiment: '$_id.sentiment',
									count: '$count',
								},
							},
						},
					},
					{
						$project: {
							_id: 0,
							category: '$_id',
							mentions: 1,
						},
					},
				])
				.exec();

			const result = data.map((item) => {
				const positive = item.mentions.find((e) => e.sentiment === 'positive');
				const negative = item.mentions.find((e) => e.sentiment === 'negative');
				const neutral = item.mentions.find((e) => e.sentiment === 'neutral');

				return {
					category: item.category,
					positive: positive ? positive.count : 0,
					negative: negative ? negative.count : 0,
					neutral: neutral ? neutral.count : 0,
				};
			});

			result.sort((a, b) => {
				if (a.category === 'unknown') return 1;
				if (b.category === 'unknown') return -1;
				return 0;
			});

			return result;
		} catch (error) {
			throw new Error(error);
		}
	}

	async getSentimentStatistics() {
		try {
			const data = await this.modelSentiment
				.aggregate([
					{ $unwind: '$asqe' },
					{
						$group: {
							_id: '$asqe.sentiment',
							count: { $count: {} },
						},
					},
					{
						$project: {
							_id: 0,
							sentiment: '$_id',
							count: 1,
						},
					},
				])
				.exec();

			SENTIMENTS.forEach((sentiment) => {
				if (!data.some((e) => e.sentiment === sentiment)) {
					data.push({ sentiment, count: 0 });
				}
			});

			return data;
		} catch (error) {
			throw new Error(error);
		}
	}

	async getSentimentWordCloud(categoryId) {
		try {
			const data = await this.modelSentiment
				.aggregate([
					{ $unwind: '$asqe' },
					{
						$match: {
							'asqe.category_id': {
								$eq: Number(categoryId),
							},
						},
					},
					{
						$group: {
							_id: {
								opinion: '$asqe.opinion',
								sentiment: '$asqe.sentiment',
							},
							value: { $count: {} },
						},
					},
					{
						$project: {
							_id: 0,
							text: '$_id.opinion',
							value: 1,
							polarity: '$_id.sentiment',
						},
					},
				])
				.exec();

			return data;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = SentimentService;
