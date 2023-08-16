import React from "react";
import { isToday } from "date-fns";
import "../../styles/Dashboard.scss";
import { taskService } from "../../services/taskService";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroupTasks } from "../../store/dashboard/task";

const GroupTaskTile = ({ task, selectedDate, groupId }) => {
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
					dispatch(fetchGroupTasks(groupId));
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
					dispatch(fetchGroupTasks(groupId));
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
				disabled={!isTodaySelected}
			>
				{validated ? "✓" : "✓"}
			</button>
		</div>
	);
};

export default GroupTaskTile;
