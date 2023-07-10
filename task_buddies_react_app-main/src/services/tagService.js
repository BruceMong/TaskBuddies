const API_BASE_URL = process.env.API_URL;
const token = localStorage.getItem("token");

export const tagService = {
	async addTag(title, icon, color) {
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
};
