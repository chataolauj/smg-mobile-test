const express = require("express");
const router = express.Router();
const File = require("../models/File");
const { upload } = require("../src/aws");
const { encode } = require("../src/url_shortener");

router.get("/:short_url", async (req, res) => {
	try {
		let file = await File.findOne({ short_url: req.params.short_url });

		if (file) {
			res.redirect(301, file.long_url);
		} else {
			req.session.msg = "Link does not exist...";
			req.session.error = true;
			req.session.isRedirect = true;

			res.redirect(301, "/");
		}
	} catch (error) {
		req.session.msg = error;
		req.session.error = true;
		req.session.isRedirect = true;

		res.redirect(301, "/");
	}
});

router.post("/upload", async (req, res) => {
	let object_url = "";

	function checkMimeType(file) {
		let accepted_types = [
			"image/heic",
			"image/heif",
			"image/webp",
			"image/png",
			"image/jpeg",
			"image/svg+xml",
			"image/gif",
			"application/pdf",
		];

		let check = accepted_types.includes(file.mimetype);

		return check;
	}

	function setSession(msg, error) {
		/* these are used when index.ejs is rendered */
		req.session.msg = msg;
		req.session.error = error;
		req.session.isRedirect = true;
	}

	try {
		/* does a check if file was uploaded */
		if (req.files) {
			let file = req.files.uploaded_file;

			/* if uploaded file exceeds 10MB, else the file gets uploaded to S3 */
			if (file.size / 1024 / 1024 > 10) {
				setSession("Your file can't exceed 10MB.", true);

				return res.redirect(301, "/");
			} else {
				if (checkMimeType(file)) {
					await upload(req.files.uploaded_file) //upload() is imported from aws.js
						.then((url) => {
							object_url = url;
						})
						.catch((err) => {
							setSession(err, true);

							return res.redirect(301, "/");
						});
				} else {
					setSession(
						"You can only upload HEIC/HEIF, WEBP, PNG, JPEG, SVG, GIF, & PDF files.",
						true
					);

					return res.redirect(301, "/");
				}
			}
		} else {
			setSession("Please select a file first.", true);

			return res.redirect(301, "/");
		}

		let count = (await File.countDocuments()) + 1; //+1 because of the document we're about to insert
		let short_url = encode(count); //generate shortend of the URI

		let file = new File({
			long_url: object_url,
			short_url,
		});

		await file
			.save()
			.then(() => {
				setSession("File successfully uploaded!", false);

				return res.redirect(301, "/");
			})
			.catch((err) => {
				setSession(err, true);

				return res.redirect(301, "/");
			});
	} catch (error) {
		setSession(error, true);

		return res.redirect(301, "/");
	}
});

module.exports = router;
