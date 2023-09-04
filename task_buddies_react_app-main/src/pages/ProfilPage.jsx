import React, { useEffect, useState } from "react";

import TaskListUpdate from "../components/task/TaskListUpdate";
import TaskFormUpdate from "../components/task/TaskFormUpdate";

const ProfilPage = () => {
	const [taskUpdated, setTaskUpdated] = useState(null);
	console.log(taskUpdated);

	return (
		<div className="dashboardPage">
			<div className="columnComponent">
				<TaskListUpdate setTaskUpdated={setTaskUpdated} />
			</div>
			<div className="columnComponent"></div>
			{taskUpdated && <TaskFormUpdate currentTask={taskUpdated} />}
		</div>
	);
};

export default ProfilPage;
