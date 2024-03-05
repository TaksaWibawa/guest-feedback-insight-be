class GuestReviewsMiddleware {
	constructor(service) {
		this.service = service;
	}

	async attachAllReviewsToRequest(req, res, next) {
		try {
			const reviews = await this.service.getAllReviews(req.query);
			req.data = reviews;
			next();
		} catch (error) {
			next(error);
		}
	}
}

module.exports = GuestReviewsMiddleware;
