import React, { useEffect, useState } from "react";

import TaskListUpdate from "../components/task/TaskListUpdate";
import TaskFormUpdate from "../components/task/TaskFormUpdate";
import TagListUpdate from "../components/tag/TagListUpdate";
import TagFormUpdate from "../components/tag/TagFormUpdate";

const ProfilPage = () => {
	const [taskUpdated, setTaskUpdated] = useState(null);
	const [tagUpdated, setTagUpdated] = useState(null);
	console.log(taskUpdated);

	return (
		<div className="dashboardPage">
			<div className="columnComponent">
				<TaskListUpdate setTaskUpdated={setTaskUpdated} />
				<TagListUpdate setTagUpdated={setTagUpdated} />
			</div>
			<div className="columnComponent"></div>
			{taskUpdated && <TaskFormUpdate currentTask={taskUpdated} />}
			{tagUpdated && <TagFormUpdate currentTag={tagUpdated} />}
		</div>
	);
};

export default ProfilPage;
