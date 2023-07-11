const API_BASE_URL = process.env.API_URL;
const token = localStorage.getItem("token");

export const taskService = {
  async fetchTasks() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/task`,
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
  async addTaskUser(taskId) {
    try {
      const response = await fetch(`${API_BASE_URL}/task-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: {
            id: taskId,
          },
        }),
      });

      if (response.ok) {
        // Task user added successfully
      } else {
        throw new Error("Failed to add task user");
      }
    } catch (error) {
      throw new Error("Failed to add task user");
    }
  },

  async removeTaskUser(taskId) {
    try {
      const response = await fetch(`${API_BASE_URL}/task-user/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Task user removed successfully
      } else {
        throw new Error("Failed to remove task user");
      }
    } catch (error) {
      throw new Error("Failed to remove task user");
    }
  },
  async hasTaskBeenValidatedOnDate(taskId, onDate) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/task-user/${taskId}/validated-today/${onDate}`,
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
};
