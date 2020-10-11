const express = require("express");
const router = express.Router();
const File = require("../models/File");
const { upload } = require("../static/src/aws");
const { encode } = require("../static/src/url_shortener");

router.get("/:short_url", async (req, res) => {
	try {
		let file = await File.findOne({ short_url: req.params.short_url });

		if (file) {
			res.status(301).redirect(file.long_url);
		} else {
			res.render("index", { msg: "Link does not exist..." });
		}
	} catch (error) {
		res.render("index", { msg: error });
	}
});

router.post("/upload", async (req, res) => {
	let object_url = "";
	let files = [];

	try {
		if (req.files) {
			console.log(req.files.uploaded_file);
			await upload(req.files.uploaded_file)
				.then((url) => {
					object_url = url;
				})
				.catch((err) => {
					res.render("index", { msg: err, files, host: "" });
				});
		} else {
			res.render("index", {
				msg: "Please select a file first.",
				files,
				host: "",
			});
		}

		let count = (await File.countDocuments()) + 1;
		let short_url = await encode(count, req.get("host"));

		let file = new File({
			long_url: object_url,
			short_url,
		});

		file.save()
			.then(async () => {
				files = await File.find();

				res.render("index", {
					msg: "File successfully uploaded!",
					files,
					host: req.get("host"),
				});
			})
			.catch((err) => {
				res.render("index", { msg: err, files, host: "" });
			});
	} catch (error) {
		res.render("index", { msg: error, files, host: "" });
	}
});

module.exports = router;
