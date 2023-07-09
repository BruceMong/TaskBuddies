import React from "react";
import { isToday } from "date-fns";
import "../../styles/task.scss";
import { taskService } from "../../services/taskService";

const TaskTile = ({ task, fetchTasks, selectedDate }) => {
	const isTodaySelected = isToday(selectedDate);

	const handleValidate = () => {
		if (task.validated) {
			taskService
				.removeTaskUser(task.id)
				.then(() => {
					// Task user removed successfully
					console.log("Task user removed!");
					fetchTasks(); // Fetch tasks again after removal
				})
				.catch((error) => {
					// Handle removal error
					console.error("Failed to remove task user:", error);
				});
		} else {
			taskService
				.addTaskUser(task.id)
				.then(() => {
					// Task user added successfully
					console.log("Task user added!");
					fetchTasks(); // Fetch tasks again after addition
				})
				.catch((error) => {
					// Handle addition error
					console.error("Failed to add task user:", error);
				});
		}
	};

	return (
		<div className={`taskTileContainer ${task.validated ? "validated" : ""}`}>
			<p>{task.title}</p>
			<button
				className="taskTileButton"
				onClick={handleValidate}
				disabled={!isTodaySelected} // Disable the button if the selectedDate is not today
			>
				{task.validated ? "✓" : "✓"}
			</button>
		</div>
	);
};

export default TaskTile;
