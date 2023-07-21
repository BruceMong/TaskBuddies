const API_BASE_URL = process.env.API_URL;

export const groupService = {
	async createGroup(groupName) {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json", // Ajoutez cette ligne
			},
		};

		const bodyParameters = {
			name: groupName,
		};

		try {
			console.log(bodyParameters);
			const response = await fetch(`${API_BASE_URL}/group`, {
				method: "POST",
				headers: config.headers,
				body: JSON.stringify(bodyParameters),
			});

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("Erreur lors de la création du groupe");
			}
		} catch (error) {
			console.error("Erreur lors de la création du groupe :", error);
			throw error;
		}
	},

	async joinGroup(entryCode) {
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		try {
			const response = await fetch(`${API_BASE_URL}/group/join/${entryCode}`, {
				method: "POST",
				headers: config.headers,
			});

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("Erreur lors de la tentative de rejoindre le groupe");
			}
		} catch (error) {
			console.error(
				"Erreur lors de la tentative de rejoindre le groupe :",
				error
			);
			throw error;
		}
	},
	async fetchGroupsByUser() {
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		try {
			const response = await fetch(`${API_BASE_URL}/group/user`, {
				method: "GET",
				headers: config.headers,
			});

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("Erreur lors de la récupération des groupes");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des groupes :", error);
			throw error;
		}
	},
	async fetchGroupsByCreator() {
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		try {
			const response = await fetch(`${API_BASE_URL}/group/creator`, {
				method: "GET",
				headers: config.headers,
			});

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("Erreur lors de la récupération des groupes");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des groupes :", error);
			throw error;
		}
	},
};
