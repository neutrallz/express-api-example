const User = require("../models/userModels");
const Mobil = require("../models/mobilModels");

exports.show = async (req, res) => {
	try {
		const result = await User.find();
		res.json(result);
	} catch (error) {
		res.json({
			message: error,
		});
	}
};

exports.detail = async (req, res) => {
	console.log(req.params.id);
	try {
		const result = await User.findOne({ _id: req.params.id }).populate("mobil");
		console.log(result);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.json({
			message: error,
		});
	}
};

exports.create = async (req, res) => {
	const { nama, alamat } = req.body;
	try {
		const result = await new User({ nama, alamat }).save();
		res.json(result);
	} catch (error) {
		res.json({
			message: error,
		});
	}
};

exports.update = async (req, res) => {
	const { nama, alamat } = req.body;
	try {
		const result = await User.updateOne(
			{ _id: req.params.id },
			{ nama, alamat }
		);
		res.json(result);
	} catch (error) {
		res.json({
			message: error,
		});
	}
};

exports.destroy = async (req, res) => {
	try {
		const item = await User.findById(req.params.id);
		if (item != null) {
			item.mobil.forEach(async (e) => {
				await Mobil.findByIdAndUpdate(e, { $set: { user: null } });
			});
		}

		const result = await User.deleteOne({ _id: req.params.id });
		res.json(result);
	} catch (error) {
		res.json({
			message: error,
		});
	}
};
