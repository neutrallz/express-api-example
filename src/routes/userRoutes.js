const Express = require("express");

const {
	show,
	detail,
	create,
	update,
	destroy,
} = require("../controllers/userController");

const router = Express.Router();

router.route("/").get(show).post(create);

router.route("/:id").get(detail).patch(update).delete(destroy);

module.exports = router;
