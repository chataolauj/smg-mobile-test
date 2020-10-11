const express = require("express");
const db = require("./db/db");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

app.use(fileUpload());

app.set("view engine", "ejs");

app.use("/static", express.static(__dirname + "/static"));
app.use("", require("./routes/files"));

app.get("/", (req, res) => {
	res.render("index", { msg: "", files: [], host: "" });
});

const port = process.env.PORT || 5000;

db.connect();

app.listen(port, () => console.log(`Sever started on port ${port}`));
