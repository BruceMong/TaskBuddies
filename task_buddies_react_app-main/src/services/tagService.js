import jwtDecode from "jwt-decode";

const API_BASE_URL = process.env.API_URL;

export const tagService = {
	async addTag(title, icon, color) {
const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/tag`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					icon,
					color,
				}),
			});

			if (response.ok) {
				// Tag added successfully
			} else {
				throw new Error("Failed to add tag");
			}
		} catch (error) {
			throw new Error("Failed to add tag");
		}
	},

	async fetchTagsByUser() {
const token = localStorage.getItem("token");

		const userId = jwtDecode(token).id;
		console.log(userId);
		try {
			const response = await fetch(`${API_BASE_URL}/tag/user/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const tags = await response.json();
				return tags;
			}
		} catch (error) {
			throw new Error("Failed to load tags");
		}
	},
};
