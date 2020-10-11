const express = require("express");
const router = express.Router();
const File = require("../models/File");
const { upload } = require("../static/src/aws");

router.get("/:tiny_url", (req, res) => {
	try {
	} catch (error) {}
});

router.post("/upload", async (req, res) => {
	try {
		if (req.files) {
			console.log(req.files.uploaded_file);
			await upload(req.files.uploaded_file)
				.then((url) => {
					let object_url = url;
					res.render("index", { msg: "File successfully uploaded!" });
				})
				.catch((err) => {
					res.render("index", { msg: err });
				});
		} else {
			res.render("index", { msg: "Please select a file first." });
		}
	} catch (error) {
		res.render("index", { msg: error });
	}
});

module.exports = router;
