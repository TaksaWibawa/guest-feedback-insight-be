const mongoose = require("mongoose");

// get existing schema from the database
const GUEST_REVIEWS_SCHEMA = new mongoose.Schema({
	_id: String,
	url_property: String,
	name: String,
	summary: String,
	property_name: String,
	price: Number,
	amenities: Array,
	reviews: Array,
});

module.exports = mongoose.model("guest_reviews", GUEST_REVIEWS_SCHEMA, "listingsAndReviews");
