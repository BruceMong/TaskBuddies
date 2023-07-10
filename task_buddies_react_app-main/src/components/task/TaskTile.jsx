import React from "react";
import { isToday } from "date-fns";
import "../../styles/Dashboard.scss";
import { taskService } from "../../services/taskService";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../store/dashboard/task";

const TaskTile = ({ task, selectedDate }) => {
	const isTodaySelected = isToday(selectedDate);
	const { id, title, validated } = task;

	const dispatch = useDispatch();

	const handleValidate = () => {
		if (validated) {
			taskService
				.removeTaskUser(id)
				.then(() => {
					// Task user removed successfully
					console.log("Task user removed!");
					dispatch(fetchTasks());
				})
				.catch((error) => {
					// Handle removal error
					console.error("Failed to remove task user:", error);
				});
		} else {
			taskService
				.addTaskUser(id)
				.then(() => {
					// Task user added successfully
					console.log("Task user added!");
					dispatch(fetchTasks());
				})
				.catch((error) => {
					// Handle addition error
					console.error("Failed to add task user:", error);
				});
		}
	};

	return (
		<div className={`taskTileContainer ${validated ? "validated" : ""}`}>
			<p>{title}</p>
			<button
				className="taskTileButton"
				onClick={handleValidate}
				disabled={!isTodaySelected} // Disable the button if the selectedDate is not today
			>
				{validated ? "✓" : "✓"}
			</button>
		</div>
	);
};

export default TaskTile;
