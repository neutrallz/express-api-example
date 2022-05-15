const Mobil = require("../models/mobilModels");
const User = require("../models/userModels");

exports.show = async (req, res) => {
	try {
		const result = await Mobil.find();
		res.json(result);
	} catch (error) {
		res.json({
			message: error,
		});
	}
};

exports.detail = async (req, res) => {
	try {
		const result = await Mobil.findOne({ _id: req.params.id }).populate("user");
		res.json(result);
	} catch (error) {
		res.json({
			message: error,
		});
	}
};

exports.create = async (req, res) => {
	const { nama, tahun, harga, user } = req.body;
	try {
		const mobil = await new Mobil({ nama, tahun, harga, user }).save();
		await User.findByIdAndUpdate(user, {
			$push: { mobil: mobil._id },
		});

		res.json(mobil);
	} catch (error) {
		res.json({
			message: error,
		});
	}
};

exports.update = async (req, res) => {
	const { nama, tahun, harga, user } = req.body;

	try {
		// Mobil.findById(req.params.id, async (err, item) => {
		// 	if (err) res.json(err);
		// 	await User.findByIdAndUpdate(item.user, {
		// 		$pull: { mobil: req.params.id },
		// 	});
		// });

		const mobil = await Mobil.updateOne(
			{ _id: req.params.id },
			{ nama, tahun, harga, user }
		);

		// await User.findByIdAndUpdate(user, {
		// 	$push: { mobil: req.params.id },
		// });

		res.json(mobil);
	} catch (error) {
		res.json({
			message: error,
		});
	}
};

exports.destroy = async (req, res) => {
	try {
		const item = await Mobil.findById(req.params.id);
		console.log(item.user);
		if (item != null) {
			await User.findByIdAndUpdate(item.user, {
				$pull: { mobil: req.params.id },
			});
		}

		const mobil = await Mobil.findByIdAndDelete(req.params.id);
		console.log(mobil._id);
		res.json(mobil);
	} catch (error) {}
};
