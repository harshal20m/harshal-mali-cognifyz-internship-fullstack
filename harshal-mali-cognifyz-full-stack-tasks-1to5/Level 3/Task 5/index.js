const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Dummy data (replace this with your actual data storage or database)
let users = [
	{ id: 1, name: "John Doe", email: "john@example.com" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com" },
];

// Middleware
app.use(bodyParser.json());

// Routes
// Get all users
app.get("/api/users", (req, res) => {
	res.json(users);
});

// Get a single user by ID
app.get("/api/users/:id", (req, res) => {
	const userId = parseInt(req.params.id);
	const user = users.find((user) => user.id === userId);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json(user);
});

// Create a new user
app.post("/api/users", (req, res) => {
	const { name, email } = req.body;

	// Validate input
	if (!name || !email) {
		return res.status(400).json({ message: "Name and email are required" });
	}

	// Generate a unique ID for the new user
	const userId = users.length + 1;

	const newUser = {
		id: userId,
		name,
		email,
	};

	users.push(newUser);

	res.status(201).json(newUser);
});

// Update an existing user
app.put("/api/users/:id", (req, res) => {
	const userId = parseInt(req.params.id);
	const { name, email } = req.body;

	// Find the index of the user to update
	const index = users.findIndex((user) => user.id === userId);

	if (index === -1) {
		return res.status(404).json({ message: "User not found" });
	}

	// Update user data
	users[index] = {
		...users[index],
		name: name || users[index].name,
		email: email || users[index].email,
	};

	res.json(users[index]);
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
	const userId = parseInt(req.params.id);

	// Find the index of the user to delete
	const index = users.findIndex((user) => user.id === userId);

	if (index === -1) {
		return res.status(404).json({ message: "User not found" });
	}

	// Remove the user from the array
	users.splice(index, 1);

	res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
