import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { taskService } from "../../services/taskService";
import GroupTaskUserTile from "./GroupTaskUserTile";

const GroupTaskUserList = ({ groupId }) => {
	const [taskUsers, setTaskUsers] = useState([]);
	const selectedDateStr = useSelector((state) => state.task.selectedDate);

	useEffect(() => {
		taskService
			.fetchTaskUsersByGroupAndDate(groupId, selectedDateStr)
			.then((data) => setTaskUsers(data));
	}, [groupId, selectedDateStr]);

	return (
		<div>
			{taskUsers.map((taskUser) => (
				<GroupTaskUserTile key={taskUser.id} taskUser={taskUser} />
			))}
		</div>
	);
};

export default GroupTaskUserList;
