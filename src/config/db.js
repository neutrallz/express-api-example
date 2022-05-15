const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "yoriko";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "akashi0987";
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ekkf7.mongodb.net/myfirstapi`;

module.exports = async () => {
	await mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.catch((err) => {
			console.error(`Database Connection Error! ${err}`);
		});
};
