import React from "react";
import { isToday } from "date-fns";
import "../../styles/Dashboard.scss";
import { taskService } from "../../services/taskService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagIcons } from "../../utils/tagData";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroupTasks } from "../../store/dashboard/task";

const GroupTaskTile = ({ task, selectedDate, groupId }) => {
	const isTodaySelected = isToday(selectedDate);
	const { id, title, validated, tags } = task;
	const tagColor = tags && tags.length > 0 ? tags[0].color : "defaultColor";
	const tagIcon = tags && tags.length > 0 ? tagIcons[tags[0].icon] : null;

	const dispatch = useDispatch();
	const handleValidate = () => {
		if (validated) {
			taskService
				.removeTaskUser(id)
				.then(() => {
					console.log("Task user removed!");
					dispatch(fetchGroupTasks([groupId])).catch((error) => {
						console.error("Failed to fetch group tasks:", error);
					});
				})
				.catch((error) => {
					console.error("Failed to remove task user:", error);
				});
		} else {
			taskService
				.addTaskUser(id)
				.then(() => {
					console.log("Task user added!");
					dispatch(fetchGroupTasks([groupId])).catch((error) => {
						console.error("Failed to fetch group tasks:", error);
					});
				})
				.catch((error) => {
					console.error("Failed to add task user:", error);
				});
		}
	};

	return (
		<div
			className={`taskTileContainer ${validated ? "validated" : ""}`}
			style={
				validated
					? { borderColor: tagColor, borderWidth: "2px", borderStyle: "solid" }
					: {}
			}
		>
			{tagIcon && (
				<FontAwesomeIcon icon={tagIcon} style={{ color: tagColor }} />
			)}
			<p style={{ color: tagColor }}>{title}</p>
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
