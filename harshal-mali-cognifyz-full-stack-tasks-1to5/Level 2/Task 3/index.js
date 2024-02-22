const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/submit", (req, res) => {
	const { firstname, lastname, username, phoneNumber, city, state } = req.body;
	res.render("received", { firstname, lastname, username, phoneNumber, city, state });
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
