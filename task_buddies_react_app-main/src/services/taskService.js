const API_BASE_URL = process.env.API_URL;
const token = localStorage.getItem("token");

export const taskService = {
	async fetchTasksByDate(selectedDate) {
		try {
			const response = await fetch(
				`${API_BASE_URL}/task/date?date=${selectedDate.toISOString()}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const tasks = await response.json();
				return tasks.map((task) => ({
					id: task.id,
					title: task.title,
					// Map other properties as needed
				}));
			} else {
				throw new Error("Failed to load tasks");
			}
		} catch (error) {
			throw new Error("Failed to load tasks");
		}
	},

	async addTask(title, recurrences) {
		try {
			const response = await fetch(`${API_BASE_URL}/task`, {
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

			if (response.ok) {
				// Task added successfully
			} else {
				throw new Error("Failed to add task");
			}
		} catch (error) {
			throw new Error("Failed to add task");
		}
	},

	async validateTask(id) {
		try {
			const token = localStorage.getItem("token");
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};
			const body = {
				task: {
					id: id,
				},
			};

			const response = await fetch(`${API_BASE_URL}/task-user`, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(body),
			});

			if (response.ok) {
				// Task validation successful
			} else {
				throw new Error("Failed to validate task");
			}
		} catch (error) {
			throw new Error("Failed to validate task");
		}
	},
	async hasTaskBeenValidatedToday(taskId) {
		try {
			const response = await fetch(
				`${API_BASE_URL}/task-user/${taskId}/validated-today`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				return result.validated;
			} else {
				throw new Error("Failed to check task validation");
			}
		} catch (error) {
			throw new Error("Failed to check task validation");
		}
	},
	async deleteTaskIfValidatedToday(id) {
		try {
			const response = await fetch(`${API_BASE_URL}/task-user/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				// Task deletion successful
			} else {
				throw new Error("Failed to delete task");
			}
		} catch (error) {
			throw new Error("Failed to delete task");
		}
	},
};
