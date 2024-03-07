const mongoose = require('mongoose');

const SENTIMENT_ANALYTICS_SCHEMA = new mongoose.Schema(
	{
		category: String,
		sentiment_score: Number,
		trend: String,
		mentions: Number,
		positive: Number,
		negative: Number,
		items: [
			{
				_id: false,
				category: String,
				sentiment_score: Number,
				trend: String,
				mentions: Number,
				positive: Number,
				negative: Number,
			},
		],
	},
	{ versionKey: false, timestamps: true }
);

module.exports = mongoose.model('analyticsSentimentCategories', SENTIMENT_ANALYTICS_SCHEMA, 'analyticsSentimentCategories');
