async function getAllReviewsController(req, res) {
	try {
		if (!req.data || req.data.length === 0) {
			return res.status(404).json({ data: [], message: "Data not found", status: 404 });
		}
		res.status(200).json({ data: req.data.reviews, pagination: req.data.pagination, status: 200, message: "Data found" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function getReviewById(req, res) {
	try {
		if (!review) {
			return res.status(404).json({ message: "Review not found" });
		}
		res.status(200).json(review);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

module.exports = { getAllReviewsController };
