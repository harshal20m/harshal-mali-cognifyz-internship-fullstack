const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up EJS as the view engine
app.set("view engine", "ejs");
//temprorary storage
const users = [
	{ id: 1, name: "John Doe", email: "john@example.com", address: "123 Main St", phoneNumber: "123-456-7890" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", address: "456 Elm St", phoneNumber: "987-654-3210" },
	{ id: 3, name: "Alice Johnson", email: "alice@example.com", address: "789 Oak St", phoneNumber: "555-555-5555" },
];

// Home route to render main.ejs
app.get("/", (req, res) => {
	res.render("main");
});

// Route to render addusers.ejs
app.get("/adduser", (req, res) => {
	res.render("adduser");
});

// Route to handle form submission and render addedusers.ejs
app.post("/adduser", (req, res) => {
	// Assuming you have form fields like 'name', 'emails', 'address', and 'phoneNumber' in your form
	const { name, email, address, phoneNumber } = req.body;

	// Assuming you have a users array to store the added users
	const newUser = {
		id: users.length + 1, // You might need to assign a unique ID to each user
		name,
		email, // Convert single email to an array if needed
		address,
		phoneNumber,
	};

	// Add the new user to your users array or database
	users.push(newUser);

	// Redirect to the page where you want to display the added users
	res.redirect("/addedusers");
});

// Route to render show.ejs to view all added users
app.get("/addedusers", (req, res) => {
	// Fetch all added users from the database
	// For simplicity, let's assume we have a list of users
	const addedUsers = users;

	// Render show.ejs and pass the users data
	res.render("show", { addedUsers });
});

// Route to render view.ejs to view a particular user
app.get("/user/:id", (req, res) => {
	// Fetch the user with the specified ID from the database
	// For simplicity, let's assume we have a function to get a user by ID
	const userId = req.params.id;

	// Function to get a user by their ID
	function getUserById(id) {
		// Find the user with the matching ID in the users array
		return users.find((user) => user.id === parseInt(id));
	}

	const user = getUserById(userId); // Replace this with your actual logic to fetch user by ID

	// Check if user exists
	if (user) {
		// Render view.ejs and pass the user data
		res.render("view", { user: user });
	} else {
		// Handle case where user with specified ID is not found
		res.status(404).send("User not found");
	}
});

// DELETE route to delete a specific user
app.post("/delete/:id", (req, res) => {
	const userId = parseInt(req.params.id);
	// Find the index of the user with the specified ID in the array
	const index = users.findIndex((user) => user.id === userId);
	if (index !== -1) {
		// If user is found, remove it from the array
		users.splice(index, 1);
		res.redirect("/addedusers"); // Redirect back to the page with the updated user list
	} else {
		// If user is not found, send a 404 error
		res.status(404).send("User not found");
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
