const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
	nama: {
		type: String,
		required: true,
	},
	tahun: {
		type: String,
		required: true,
	},
	harga: {
		type: Number,
		required: true,
	},
	user: {
		type: Schema.ObjectId,
		ref: "user",
	},
});

module.exports = mongoose.model("mobil", schema);
