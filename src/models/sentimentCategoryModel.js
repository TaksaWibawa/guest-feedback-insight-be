require('dotenv').config();
const mongoose = require('mongoose');

const { DB_COLLECTION_3 } = process.env;

const SENTIMENT_CATEGORIES_SCHEMA = new mongoose.Schema(
	{
		_id: { type: Number, required: true },
		name: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{ versionKey: false, timestamps: true },
);

const model = mongoose.model('sentimentCategories', SENTIMENT_CATEGORIES_SCHEMA, DB_COLLECTION_3);

module.exports = model;
