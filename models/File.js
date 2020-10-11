const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
	long_url: {
		type: String,
		required: true,
		unique: true,
	},
	short_url: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("files", FileSchema);
