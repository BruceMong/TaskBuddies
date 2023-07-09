// src/services/authService.js

const API_URL = process.env.API_URL;

export const authService = {
	async signup(userData) {
		try {
			const response = await fetch(`${API_URL}/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});

			return response.json();
		} catch (error) {
			console.error("Error during signup:", error);
			throw error;
		}
	},

	// src/services/authService.js

	async login({ email, password }) {
		try {
			const response = await fetch(`${API_URL}/auth/signin`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			return response.json();
		} catch (error) {
			console.error("Error during login:", error);
			throw error;
		}
	},

	logout() {
		localStorage.removeItem("token");
		// Redirigez l'utilisateur vers la page de connexion
		window.location.href = "/login";
	},
};
