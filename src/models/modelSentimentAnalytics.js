const mongoose = require('mongoose');
require('dotenv').config();

const { DB_COLLECTION_2 } = process.env;

const SENTIMENT_ANALYTICS_SCHEMA = new mongoose.Schema(
	{
		category: String,
		sentimentScore: Number,
		trend: String,
		mentions: Number,
		positive: Number,
		negative: Number,
		neutral: Number,
		items: [
			{
				_id: false,
				category: String,
				sentimentScore: Number,
				trend: String,
				mentions: Number,
				positive: Number,
				negative: Number,
				neutral: Number,
			},
		],
	},
	{ versionKey: false, timestamps: true }
);

module.exports = mongoose.model('analyticsSentimentCategories', SENTIMENT_ANALYTICS_SCHEMA, DB_COLLECTION_2);
