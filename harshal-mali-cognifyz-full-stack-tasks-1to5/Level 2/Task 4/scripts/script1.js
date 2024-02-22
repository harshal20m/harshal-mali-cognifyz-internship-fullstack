function comparePasswords() {
	// Get the values of the password and confirm password fields
	var password = document.getElementById("password");
	var confirmPassword = document.getElementById("password2");
	var errorElement = document.getElementById("passwordError");

	// Compare the passwords
	if (password.value === confirmPassword.value) {
		// Passwords match, remove Bootstrap's is-invalid class and add is-valid class
		password.classList.remove("is-invalid");
		confirmPassword.classList.remove("is-invalid");
		password.classList.add("is-valid");
		confirmPassword.classList.add("is-valid");
		errorElement.innerHTML = ""; // Clear any existing error message
	} else {
		// Passwords do not match, remove Bootstrap's is-valid class and add is-invalid class
		password.classList.remove("is-valid");
		confirmPassword.classList.remove("is-valid");
		password.classList.add("is-invalid");
		confirmPassword.classList.add("is-invalid");
		errorElement.innerHTML = "Passwords do not match"; // Display error message
	}
}
