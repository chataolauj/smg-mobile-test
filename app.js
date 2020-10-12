const express = require("express");
const session = require("express-session");
const db = require("./db/db");
const fileUpload = require("express-fileupload");
const File = require("./models/File");
const path = require("path");

const app = express();

app.use(
	session({ secret: "my_secret", resave: false, saveUninitialized: false })
);
app.use(fileUpload());

app.set("view engine", "ejs");

app.use("/static", express.static(__dirname + "/static"));
app.use("", require("./routes/files"));

app.get("/", async (req, res) => {
	let msg = "";
	let error = false;
	let files = await File.find().sort({ _id: -1 });

	if (req.session.isRedirect) {
		msg = req.session.msg;
		req.session.isRedirect = false;
	}

	if (req.session.error) {
		error = true;
		req.session.error = false;
	}

	res.render("index", { msg, error, files, host: req.get("host") });
});

app.get("*", function (req, res) {
	res.redirect(301, "/");
});

const port = process.env.PORT || 5000;

db.connect();

app.listen(port, () => console.log(`Sever started on port ${port}`));
