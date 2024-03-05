const { getAllReviewsController } = require("../controllers/guestReviews.controller");
const { GuestReviewsService } = require("../services/guestReviews.service");
const GuestReviewsMiddleware = require("../middlewares/guestReview.middleware");

const express = require("express");
const model = require("../models/guestReview.model");
const router = express.Router();
const service = new GuestReviewsService(model);
const middleware = new GuestReviewsMiddleware(service);

router.get("/guest-reviews", middleware.attachAllReviewsToRequest.bind(middleware), getAllReviewsController);

module.exports = router;
