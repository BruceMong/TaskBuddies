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
	async fetchGroupById(groupId) {
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		try {
			const response = await fetch(`${API_BASE_URL}/group/${groupId}`, {
				method: "GET",
				headers: config.headers,
			});

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("Erreur lors de la récupération du groupe");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du groupe :", error);
			throw error;
		}
	},
	async createTaskWithGroup(title, recurrences, groupId) {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(`${API_BASE_URL}/task/group/${groupId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					recurrences,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create task");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error:", error);
			throw new Error("Failed to create task");
		}
	},
	async joinGroup(entryCode) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/group/join/${entryCode}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const group = await response.json();
				return group;
			} else {
				throw new Error("Échec de la tentative de rejoindre le groupe");
			}
		} catch (error) {
			throw new Error("Échec de la tentative de rejoindre le groupe");
		}
	},
};
