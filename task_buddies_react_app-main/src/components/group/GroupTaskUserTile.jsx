import React from "react";

const GroupTaskUserTile = ({ taskUser }) => {
	const doneAt = new Date(taskUser.doneAt);
	return (
		<div>
			{taskUser.user.username} a réalisé {taskUser.task.title} à{" "}
			{doneAt.getHours()}:{doneAt.getMinutes()}
		</div>
	);
};

export default GroupTaskUserTile;
