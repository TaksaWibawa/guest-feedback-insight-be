const mongoose = require('mongoose');

const GUEST_REVIEWS_SCHEMA = new mongoose.Schema(
	{
		weekly_price: { type: Number },
		monthly_price: { type: Number },
		cleaning_fee: { type: Number },
		extra_people: { type: Number },
		guests_included: { type: Number },
		images: {
			thumbnail_url: { type: String },
			medium_url: { type: String },
			picture_url: { type: String },
			xl_picture_url: { type: String },
		},
		host: {
			host_id: { type: String },
			host_url: { type: String },
			host_name: { type: String },
			host_location: { type: String },
			host_about: { type: String },
			host_thumbnail_url: { type: String },
			host_picture_url: { type: String },
			host_neighbourhood: { type: String },
			host_is_superhost: { type: Boolean },
			host_has_profile_pic: { type: Boolean },
			host_identity_verified: { type: Boolean },
			host_listings_count: { type: Number },
			host_total_listings_count: { type: Number },
			host_verifications: [String],
		},
		address: {
			street: { type: String },
			suburb: { type: String },
			government_area: { type: String },
			market: { type: String },
			country: { type: String },
			country_code: { type: String },
			location: {
				type: { type: String },
				coordinates: [Number],
				is_location_exact: { type: Boolean },
			},
		},
		availability: {
			availability_30: { type: Number },
			availability_60: { type: Number },
			availability_90: { type: Number },
			availability_365: { type: Number },
		},
		review_scores: { type: Object },
		reviews: [Object],
	},
	{ versionKey: false, timestamps: true }
);

module.exports = mongoose.model('guest_reviews', GUEST_REVIEWS_SCHEMA, 'listingsAndReviews');
