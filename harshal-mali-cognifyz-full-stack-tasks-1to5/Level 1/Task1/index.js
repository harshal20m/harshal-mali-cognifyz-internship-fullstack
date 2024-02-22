const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
	const { name, email, mobile, branch, course } = req.body;

	console.log(
		`Received form submission: Name - ${name}, Email - ${email}, Mobile - ${mobile}, Branch - ${branch}, Course - ${course}`
	);
	res.send("Form submitted successfully!");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
