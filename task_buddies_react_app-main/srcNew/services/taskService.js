const API_BASE_URL = process.env.API_URL;
const token = localStorage.getItem("token");

export const taskService = {
    async fetchTasksByDate(selectedDate) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/task/date?date=${selectedDate.toISOString()}`, {
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

    async confirmTask(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/task-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    task: {
                        id: id
                    }
                }),
            });

            if (response.ok) {
                // Task added successfully
            } else {
                throw new Error("Failed to add taskUser");
            }
        } catch (error) {
            throw new Error("Failed to add taskUser");
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
};