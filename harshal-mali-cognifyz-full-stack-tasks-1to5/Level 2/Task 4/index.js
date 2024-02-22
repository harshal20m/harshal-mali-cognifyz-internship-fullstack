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
	const form_data = req.body;

	var pass = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#\-]).{4,8}$/;

	console.log(form_data.password);
	console.log(form_data.confirmPassword);
	if (form_data.password.trim() !== form_data.confirmPassword.trim()) {
		return res.render("error", { message: "Passwords do not match" });
	}

	if (!pass.test(form_data.password)) {
		return res.render("error", { message: "Passwords do not meet the criteria" });
	}

	res.render("received", { form_data });
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
