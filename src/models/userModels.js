const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
	nama: {
		type: String,
		required: true,
	},
	alamat: {
		type: String,
		required: true,
	},
	mobil: [
		{
			type: Schema.Types.ObjectId,
			ref: "mobil",
		},
	],
});

module.exports = mongoose.model("user", schema);
