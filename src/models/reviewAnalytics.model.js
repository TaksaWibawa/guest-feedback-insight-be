const mongoose = require("mongoose");

const REVIEW_ANALYTICS_SCHEMA = new mongoose.Schema({
	name: String,
});

module.exports.ReviewAnalytics = mongoose.model("review_analytics", REVIEW_ANALYTICS_SCHEMA);
