const { connectDB } = require("./src/configs/db.config");
const { logger } = require("./src/middlewares/logger.middleware");
const express = require("express");
const guestReviewsRoutes = require("./src/routes/guestReviews.routes");

const app = express();

connectDB();

app.use(logger);

app.use("/", guestReviewsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
