const mongoose = require('mongoose');
const model = require('../models/modelSentimentAnalytics');

function generateDummyData() {
	const categories = ['Location', 'Service', 'Pricing', 'Room', 'Amenities', 'Atmosphere', 'Food', 'General'];
	const subCategories = ['A', 'B', 'C', 'D', 'E'];
	const data = [];

	categories.forEach((category) => {
		const sentimentScore = Math.random() * 2 - 1;
		const trend = Math.random() < 0.5 ? 'Positive' : 'Negative';
		const mentions = Math.floor(Math.random() * (200 - 50 + 1) + 50);
		let positive;
		let negative;

		if (trend === 'Positive') {
			positive = Math.floor(Math.random() * (mentions - mentions / 2 + 1) + mentions / 2);
			negative = mentions - positive;
		} else {
			negative = Math.floor(Math.random() * (mentions - mentions / 2 + 1) + mentions / 2);
			positive = mentions - negative;
		}

		const subItems = subCategories.map((subCategory) => ({
			category: subCategory,
			sentiment_score: parseFloat(sentimentScore.toFixed(2)),
			trend,
			mentions,
			positive,
			negative,
		}));

		data.push({
			category,
			sentiment_score: parseFloat(sentimentScore.toFixed(2)),
			trend,
			mentions,
			positive,
			negative,
			items: subItems,
		});
	});

	return data;
}

async function insertDummyData() {
	try {
		const db = mongoose.connection;
		const collectionName = 'analyticsSentimentCategories';
		const collection = db.collections[collectionName];

		if (collection) {
			await db.dropCollection(collectionName);
		}

		const dummyData = generateDummyData();
		await model.insertMany(dummyData);
		db.close();
	} catch (error) {
		console.error('Error inserting dummy data:', error);
	}
}

module.exports = { insertDummyData };
