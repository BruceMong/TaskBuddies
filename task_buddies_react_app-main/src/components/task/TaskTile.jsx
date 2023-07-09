// TaskTile.jsx
import React from "react";
import { taskService } from "../../services/taskService";
import "../../styles/task.scss";

const TaskTile = ({ task }) => {
	const handleValidate = async () => {
		try {
			const validated = await taskService.hasTaskBeenValidatedToday(task.id);
			if (validated) {
				await taskService.deleteTaskIfValidatedToday(task.id);
			} else {
				await taskService.validateTask(task.id);
			}
			// Handle success
			console.log("Task validated!");
		} catch (error) {
			// Handle error
			console.error("Failed to validate task:", error);
		}
	};

	return (
		<div className={`taskTileContainer ${task.validated ? "validated" : ""}`}>
			<p>{task.title}</p>
			<button className="taskTileButton" onClick={handleValidate}>
				✓
			</button>
		</div>
	);
};

export default TaskTile;
